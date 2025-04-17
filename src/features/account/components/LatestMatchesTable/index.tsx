import React, { useMemo } from 'react'
import { Table, Avatar, Progress } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import _ from 'lodash'

import './styles.scss'
import MultiSegmentProgress from '@/components/MultiSegmentProgressBar'
import { Match } from '@/types'

const matchResultText = {
  WON: 'Won Match',
  LOST: 'Lost Match'
}

type LatestMatchesTableProps = {
  data: Match[]
  loading: boolean
}

const LatestMatchesTable: React.FC<LatestMatchesTableProps> = (props) => {
  const { data, loading = false } = props

  const maxDurationSeconds: number = _.maxBy(data, 'durationSeconds', null)?.durationSeconds

  const columns = useMemo<ColumnsType<Match>>(
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
              <div style={{ fontSize: 12, color: '#aaa' }}>{record.rank}</div>
            </div>
          </div>
        )
      },
      {
        title: 'Result',
        dataIndex: 'result',
        key: 'result',
        render: (value, record) => {
          const resultText = value === 1 ? matchResultText.WON : matchResultText.LOST
          return (
            <div>
              <div style={{ fontWeight: 500, color: resultText === matchResultText.WON ? '#a9cf54' : '#ea030e' }}>
                {resultText}
              </div>
              <div style={{ fontSize: 12, color: '#aaa' }}>{dayjs(record.playedTime).fromNow()}</div>
            </div>
          )
        }
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (value, record) => (
          <div>
            <div style={{ fontWeight: 500 }}>{value}</div>
            <div style={{ fontSize: 12, color: '#aaa' }}>{record.mode}</div>
          </div>
        )
      },
      {
        title: 'Duration',
        dataIndex: 'durationSeconds',
        key: 'durationSeconds',
        render: (value) => {
          const formattedDuration = dayjs.duration(value, 'seconds').format('HH:mm:ss')
          return (
            <div>
              {formattedDuration}
              <Progress
                percent={(value / maxDurationSeconds) * 100}
                showInfo={false}
                strokeColor='#303030'
                size='small'
              />
            </div>
          )
        }
      },
      {
        title: 'KDA',
        dataIndex: 'kda',
        key: 'kda',
        render: (value: Match['kda']) => {
          const { kills, deaths, assists } = value
          const formattedKDA = `${kills}/${deaths}/${assists}`
          const total = kills + deaths + assists
          const percentages = [
            {
              percent: (kills / total) * 100,
              color: '#ea030e'
            },
            {
              percent: (deaths / total) * 100,
              color: '#979797'
            },
            {
              percent: (assists / total) * 100,
              color: '#a9cf54'
            }
          ]
          return (
            <div>
              {formattedKDA}
              <MultiSegmentProgress percentages={percentages} />
            </div>
          )
        }
      }
    ],
    []
  )

  return <Table dataSource={data} columns={columns} pagination={false} rowKey='hero' bordered loading={loading} />
}

export default LatestMatchesTable
