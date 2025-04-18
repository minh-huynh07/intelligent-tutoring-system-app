import React, { useMemo } from 'react'
import { Table, Tag, Avatar, Progress, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import _ from 'lodash'
import relativeTime from 'dayjs/plugin/relativeTime'
import './styles.scss'
import MultiSegmentProgress from '@/components/MultiSegmentProgressBar'
import { HERO_ROLES_COLORS } from '@/const'
import { Hero, HeroesMostPlayProps, RecommendedHero } from '@/types'

dayjs.extend(relativeTime)

const HeroesMostPlayedTable: React.FC<HeroesMostPlayProps> = (props) => {
  const { data, loading = false } = props

  const maxPlayedMatches: number = _.maxBy(data, 'matches', null)?.matches
  console.log(maxPlayedMatches)
  const maxKDA: number = _.maxBy(data, 'kda')?.kda

  const columns = useMemo<ColumnsType<Hero>>(
    () => [
      {
        title: 'Hero',
        dataIndex: 'hero',
        key: 'hero',
        render: (_, record) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar src={record.heroImg} shape='square' />
            <div>
              <div style={{ fontWeight: 500 }}>{record.hero}</div>
              <div style={{ fontSize: 12, color: '#aaa' }}>{dayjs(record.lastPlayed).fromNow()}</div>
            </div>
          </div>
        )
      },
      // {
      //   title: 'Recommended Heroes',
      //   dataIndex: 'recommendedHeroes',
      //   key: 'recommendedHeroes',
      //   render: (rheroes: RecommendedHero[]) =>
      //     rheroes.map((h) => (
      //       <Tooltip title={h.name}>
      //         <Avatar src={h.img} shape='circle' />
      //       </Tooltip>
      //     ))
      // },
      {
        title: 'Matches',
        dataIndex: 'matches',
        key: 'matches',
        render: (value) => (
          <div>
            <div>{value}</div>
            <Progress percent={(value / maxPlayedMatches) * 100} showInfo={false} strokeColor='red' size='small' />
          </div>
        )
      },
      {
        title: 'Win %',
        dataIndex: 'winPercentage',
        key: 'winPercentage',
        render: (value) => (
          <div>
            {value}
            <Progress percent={parseFloat(value)} showInfo={false} strokeColor='green' size='small' />
          </div>
        )
      },
      {
        title: <Tooltip title='(Kills + Assists) / Deaths based on 10 latest matches.'>KDA</Tooltip>,
        dataIndex: 'kda',
        key: 'kda',
        render: (value) => (
          <div>
            {value}
            <Progress percent={(value / maxKDA) * 100} showInfo={false} strokeColor='orange' size='small' />
          </div>
        )
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (roles: Role[]) => {
          const mostPlayedRole = _.maxBy(roles, 'rolePercent')
          const percentages = roles.map((r) => ({
            percent: r.rolePercent,
            color: _.get(HERO_ROLES_COLORS, r.roleName, '#000000')
          }))
          return (
            <div>
              {mostPlayedRole.roleName}
              <MultiSegmentProgress percentages={percentages} />
            </div>
          )
        }
      }
    ],
    [data]
  )

  return (
    <div className='heroes_most_played__root'>
      <p>Most Played Heroes</p>
      <Table dataSource={data} columns={columns} pagination={false} rowKey='hero' bordered />
    </div>
  )
}

export default HeroesMostPlayedTable
