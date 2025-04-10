import React, { useMemo } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'

import { CourseInfo } from '@/types'
import './styles.scss'

const onChange = (key: string) => {
  console.log(key)
}

type CourseInfoTabProps = {
  courseInfo: CourseInfo
}

const CourseInfoTab: React.FC<CourseInfoTabProps> = (props) => {
  const items: TabsProps['items'] = useMemo(
    () => [
      {
        key: 'courseDescription',
        label: 'Description',
        children: 'Content of Tab Pane 1'
      },
      {
        key: 'courses',
        label: 'Courses',
        children: <div>
          <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
        </div>
      },
      {
        key: 'courseReview',
        label: 'Review',
        children: 'Content of Tab Pane 3'
      }
    ],
    []
  )

  return (
    <Tabs
      defaultActiveKey='1'
      items={items}
      onChange={onChange}
      // tabBarStyle={{
      //   borderBottom: 'none'
      // }}
    />
  )
}

export default CourseInfoTab
