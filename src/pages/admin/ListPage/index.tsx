import React, { useState, useEffect } from 'react'
import { Typography, Spin } from 'antd'
import './styles.scss'
import { Course, CourseList, CourseType } from '@/types'
import InstructorListPage from '@/features/admin/components/ListPage'
import CourseService from '@/services/CourseService'
import { useUser } from '@/contexts/UserContext'
import { getRandomLocalThumbnail } from '@/utils/randomThumbnails'

const { Title } = Typography

const InstructorHomePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const { user } = useUser()
  const userId = user?.id || '6379aaf9-2c94-4432-927f-5aca48e1c746'

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Pass any required request data (e.g., filters or user info) as needed
        const response: CourseList = await CourseService.getCourses(userId)

        // Assuming the response contains an array of courses, adjust mapping if needed
        const courses: Course[] = response.results.map((course) => ({
          id: course.id,
          title: course.title,
          thumbnail: course.thumbnail || getRandomLocalThumbnail(),
          // instructor: course.user_id || 'N/A',
          description: course.description || 'No description available.',
          heroes: course.heroes,
          type: course.type
        }))

        setCourses(courses)
      } catch (err) {
        setError('Failed to load courses')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Spin size='large' tip='Fetching recommended courses...' />
      </div>
    )
  }

  if (error) {
    return <div>{error}</div>
  }

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
