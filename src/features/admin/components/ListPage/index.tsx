import React from 'react'
import { Card, Row, Col, Typography, Rate } from 'antd'
import './styles.scss'
import { Course } from '@/types'

const { Title, Paragraph } = Typography

type InstructorListProps = {
  courses: Course[]
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <Card
    hoverable
    cover={<img alt={course.title} src={course.thumbnail} style={{ objectFit: 'cover', height: 180 }} />}
    style={{ borderRadius: 8, overflow: 'hidden' }}
  >
    <Card.Meta
      title={
        <Title level={4} style={{ margin: 0 }}>
          {course.title}
        </Title>
      }
    />
    {course.description && (
      <Paragraph style={{ margin: '0.5rem 0' }} ellipsis={{ rows: 2 }}>
        {course.description}
      </Paragraph>
    )}
    {typeof course.rating === 'number' && <Rate disabled allowHalf defaultValue={course.rating} />}
  </Card>
)

const InstructorList: React.FC<InstructorListProps> = ({ courses }) => (
  <div className='instructor-list'>
    <Row gutter={[16, 16]}>
      {courses.map((course) => (
        <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
          <CourseCard course={course} />
        </Col>
      ))}
    </Row>
  </div>
)

export default InstructorList
