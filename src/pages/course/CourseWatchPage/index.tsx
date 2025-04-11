import React from 'react'
import { FaStar } from 'react-icons/fa'
import ReactPlayer from 'react-player'

import './styles.scss'

const courseData = {
  title: 'Make Uber Clone App',
  author: 'Steven Arnatouvic',
  ratingPoint: 4.8,
  ratingCounts: 1812,
  videoUrl: 'https://youtu.be/IPxbJ7AoIdI'
}
const CourseWatchPage = () => {
  const { title, author, ratingPoint, ratingCounts, videoUrl } = courseData
  return (
    <div className='course-watch-page'>
      <div className='course-info'>
        <div className='course-info__title'>{title}</div>
        <div className='course-info__sub-info'>
          <div className='course-info__author'>{author}</div>
          <div className='course-info__rating'>
            <div className='course-info__rating-points'>
              <FaStar color='gold' size={16} />
              <span>{ratingPoint}</span>
            </div>
            <div className='course-info__rating-counts'>({ratingCounts} ratings)</div>
          </div>
        </div>
      </div>

      <div className='course-video'>
        <ReactPlayer url={videoUrl} width="100%" height="100%" />
      </div>
    </div>
  )
}

export default CourseWatchPage
