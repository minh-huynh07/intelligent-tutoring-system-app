/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import ListPage, { Video } from '@/features/home/components'
import RecommendationService from '@/services/RecommendationService'
import { RecommendedCoursesResponse } from '@/types'
import { getRandomLocalThumbnail } from '@/utils/randomThumbnails'
import { useUser } from '@/contexts/UserContext'
import { uniq } from 'lodash'
import { Spin } from 'antd'

const LIMIT_MATCH_NUMBER = 100

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const { user } = useUser()
  const account_id = user?.profile?.account_id

  useEffect(() => {
    // Fetch recommended courses on component mount
    const fetchRecommendedCourses = async () => {
      try {
        // 1. Fetch recent matches from OpenDota
        const matchesRes = await fetch(
          `https://api.opendota.com/api/players/${account_id}/matches?limit=${LIMIT_MATCH_NUMBER}`
        )
        const matches = await matchesRes.json()

        const latestHeroMatches: number[] = uniq(
          matches
            .sort((a: any, b: any) => b.start_time - a.start_time)
            .map((match: any) => {
              return match.hero_id
            })
        )

        // Pass any required request data (e.g., filters or user info) as needed
        const response: RecommendedCoursesResponse = await RecommendationService.recommendedCourses({
          heroIds: latestHeroMatches
        })

        // Assuming the response contains an array of courses, adjust mapping if needed
        const recommendedVideos: Video[] = response.results.map((course) => ({
          id: course.id,
          title: course.title,
          thumbnail: course.thumbnail || getRandomLocalThumbnail(),
          // instructor: course.user_id || 'N/A',
          description: course.description || 'No description available.',
          heroes: course.heroes
        }))

        console.log(recommendedVideos)

        setVideos(recommendedVideos)
      } catch (err) {
        setError('Failed to load courses')
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendedCourses()
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Spin size="large" tip="Fetching recommended courses..." />
      </div>
    )
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className='home-page'>
      <ListPage videos={videos} />
    </div>
  )
}

export default HomePage
