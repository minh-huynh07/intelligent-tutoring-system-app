import React from 'react'
import { Card, Row, Col, Typography } from 'antd'
import './styles.scss'
import { VideoLectureMetadata } from '@/types/lectures'
import { NavigateFunction, useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography

type InstructorListProps = {
  lectures: VideoLectureMetadata[]
}

const CourseCard: React.FC<{ lecture: VideoLectureMetadata, navigate: NavigateFunction }> = ({ lecture, navigate }) => (
  <Card
    hoverable={lecture.processing_status === 'COMPLETED'}
    onClick={() => {
      if (lecture.processing_status !== 'COMPLETED') return
      navigate('/lectures/watch', { state: lecture })
    }}
    cover={<img alt={lecture.title} src={lecture.thumbnail} style={{ objectFit: 'cover', height: 180 }} />}
    style={{ borderRadius: 8, overflow: 'hidden' }}
  >
    <Card.Meta
      title={
        <Title level={4} style={{ margin: 0 }}>
          {lecture.title}
        </Title>
      }
    />
    {lecture.type && (
      <Paragraph style={{ margin: '0.5rem 0' }} ellipsis={{ rows: 2 }}>
        Mode: {lecture.type}
      </Paragraph>
    )}
    {/* {course.heroes &&
      course.heroes.length &&
      course.heroes.map((h) => (
        <Tooltip title={h.name}>
          <Avatar src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${h.name.toLocaleLowerCase()}_full.png`} shape='circle' />
        </Tooltip>
      ))} */}
  </Card>
)

const InstructorList: React.FC<InstructorListProps> = ({ lectures }) => {
  const navigate = useNavigate()
  return (
    <div className='instructor-list'>
      <Row gutter={[16, 16]}>
        {lectures.map((lecture, i) => (
          <Col key={i} xs={24} sm={12} md={8} lg={6}>
            <CourseCard lecture={lecture} navigate={navigate} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default InstructorList
