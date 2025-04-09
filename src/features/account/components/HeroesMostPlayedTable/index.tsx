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

const data: Hero[] = [
  {
    hero: 'Oracle',
    heroImg:
      'https://images.unsplash.com/photo-1655824251467-d25618d53767?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    lastPlayed: '2025-04-09T05:00:00.000Z',
    matches: 768,
    winPercentage: '55.60%',
    kda: 3.47,
    role: [{ roleName: 'Support', rolePercent: 100 }],
    lane: [{ laneName: 'Safe Lane', lanePercent: 100 }]
  }
  // ... Add the rest of the data entries here
]

const HeroesMostPlayedTable: React.FC = () => {
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
            <Progress percent={(value / 768) * 100} showInfo={false} strokeColor='red' size='small' />
          </div>
        )
      },
      {
        title: 'Win %',
        dataIndex: 'winPercentage',
        key: 'winPercentage',
        render: (value) => (
          <div style={{ color: 'lightgreen' }}>
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
            <Progress percent={(value / 5.2) * 100} showInfo={false} strokeColor='orange' size='small' />
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
              {/* {lanes.map((lane, i) => ( */}
              {/*   <Tag key={i} color='cyan'> */}
              {/*     {lane.laneName} */}
              {/*   </Tag> */}
              {/* ))} */}
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
              {/* {lanes.map((lane, i) => ( */}
              {/*   <Tag key={i} color='cyan'> */}
              {/*     {lane.laneName} */}
              {/*   </Tag> */}
              {/* ))} */}
            </div>
          )
        }
      }
    ],
    []
  )

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={false}
      rowKey='hero'
      bordered
      style={{ backgroundColor: '#1e1e2f', color: '#fff' }}
    />
  )
}

export default HeroesMostPlayedTable
