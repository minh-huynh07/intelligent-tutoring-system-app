import React, { useState, useEffect } from 'react'
import { Typography } from 'antd'
import './styles.scss'
import { Course, CourseType } from '@/types'
import InstructorListPage from '@/features/admin/components/ListPage'

const { Title } = Typography

const mockCourses: Course[] = [
  {
    id: 'c1',
    title: 'Building Advanced Dota Strategies',
    thumbnail: '/thumbnails/dota-strategies.jpg',
    description: 'Deep dive into hero combinations and itemization.',
    rating: 4.8,
    type: CourseType.ORDINARY,
    heroes: []
  },
  {
    id: 'c2',
    title: 'Mastering Last-Hitting',
    thumbnail: '/thumbnails/last-hitting.jpg',
    description: 'Improve your CS in every phase of the game.',
    rating: 4.6,
    type: CourseType.ORDINARY,
    heroes: []
  }
]

const InstructorHomePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    // replace with real API call
    setCourses(mockCourses)
  }, [])

  return (
    <div className='instructor-home-page'>
      <Title level={2} className='instructor-title'>
        My Courses
      </Title>
      <InstructorListPage courses={courses} />
    </div>
  )
}

export default InstructorHomePage
