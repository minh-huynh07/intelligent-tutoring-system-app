import React, { useMemo } from 'react'
import { Table, Tag, Avatar, Progress } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import _ from 'lodash'

import './styles.scss'
import MultiSegmentProgress from '@/components/MultiSegmentProgressBar'
import { HERO_ROLES_COLORS } from '@/const'

dayjs.extend(relativeTime)

type Role = {
  roleName: string
  rolePercent: number
}

type Lane = {
  laneName: string
  lanePercent: number
}

type Hero = {
  hero: string
  heroImg: string
  lastPlayed: string
  matches: number
  winPercentage: string
  kda: number
  role: Role[]
  lane: Lane[]
}

type HeroesMostPlayProps = {
  data: Hero[]
}

const HeroesMostPlayedTable: React.FC<HeroesMostPlayProps> = (props) => {
  const { data } = props

  const maxPlayedMatches: number = _.maxBy(data, 'matches', null)?.matches
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
        title: 'KDA',
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
      },
      {
        title: 'Lane',
        dataIndex: 'lane',
        key: 'lane',
        render: (lanes: Lane[]) => {
          const mostPlayedLane = _.maxBy(lanes, 'lanePercent')
          const percentages = lanes.map((l) => ({
            percent: l.lanePercent,
            color: _.get(HERO_ROLES_COLORS, l.laneName, '#000000')
          }))
          return (
            <div>
              {mostPlayedLane.laneName}
              <MultiSegmentProgress percentages={percentages} />
            </div>
          )
        }
      }
    ],
    []
  )

  return <Table dataSource={data} columns={columns} pagination={false} rowKey='hero' bordered />
}

export default HeroesMostPlayedTable
