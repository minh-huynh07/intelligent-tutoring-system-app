import React, { useState, useEffect } from 'react'
import { Typography, Spin } from 'antd'
import './styles.scss'
import InstructorListPage from '@/features/admin/components/ListPageLecture'
import { useUser } from '@/contexts/UserContext'
import { getRandomLocalThumbnail } from '@/utils/randomThumbnails'
import { LectureMetadata, VideoLectureMetadata } from '@/types/lectures'
import LectureService from '@/services/LectureService'

const { Title } = Typography

const InstructorLectureHomePage: React.FC = () => {
  const [lectures, setLectures] = useState<LectureMetadata[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const { user } = useUser()
  const userId = user?.id as string

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        // Pass any required request data (e.g., filters or user info) as needed
        const response: VideoLectureMetadata[] = await LectureService.getLecturesByUserID(userId)
        // Assuming the response contains an array of courses, adjust mapping if needed
        const lectures: VideoLectureMetadata[] = response.map((lecture: VideoLectureMetadata) => ({
          title: lecture.title,
          thumbnail: getRandomLocalThumbnail(),
          // instructor: course.user_id || 'N/A',
          video_s3_key: lecture.video_s3_key,
          type: lecture.type,
          visibility: lecture.visibility,
          user_id: lecture.user_id,
          processing_status: lecture.processing_status
        }))

        setLectures(lectures)
      } catch (err) {
        setError('Failed to load courses')
      } finally {
        setLoading(false)
      }
    }

    fetchLectures()
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
        My Lectures
      </Title>
      <InstructorListPage lectures={lectures} />
    </div>
  )
}

export default InstructorLectureHomePage
