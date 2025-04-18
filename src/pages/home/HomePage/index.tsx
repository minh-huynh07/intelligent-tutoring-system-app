import React, { useState, useEffect } from 'react'
import ListPage, { Video } from '@/features/home/components'

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Mastering React Hooks',
    thumbnail: '/thumbnails/react-hooks.jpg',
    instructor: 'Jane Doe',
    description: 'Learn how to use React Hooks in your projects.',
    rating: 4.5
  },
  {
    id: '2',
    title: 'TypeScript Deep Dive',
    thumbnail: '/thumbnails/ts-deep-dive.jpg',
    instructor: 'John Smith',
    description: 'Get comfortable with advanced TypeScript features.',
    rating: 4.7
  },
  {
    id: '2',
    title: 'TypeScript Deep Dive',
    thumbnail: '/thumbnails/ts-deep-dive.jpg',
    instructor: 'John Smith',
    description: 'Get comfortable with advanced TypeScript features.',
    rating: 4.7
  },
  {
    id: '2',
    title: 'TypeScript Deep Dive',
    thumbnail: '/thumbnails/ts-deep-dive.jpg',
    instructor: 'John Smith',
    description: 'Get comfortable with advanced TypeScript features.',
    rating: 4.7
  },
  {
    id: '2',
    title: 'TypeScript Deep Dive',
    thumbnail: '/thumbnails/ts-deep-dive.jpg',
    instructor: 'John Smith',
    description: 'Get comfortable with advanced TypeScript features.',
    rating: 4.7
  },
  {
    id: '2',
    title: 'TypeScript Deep Dive',
    thumbnail: '/thumbnails/ts-deep-dive.jpg',
    instructor: 'John Smith',
    description: 'Get comfortable with advanced TypeScript features.',
    rating: 4.7
  }
]

const HomePage: React.FC = () => {
  // if you’re fetching from an API, you might replace this with useEffect + fetch()
  const [videos, setVideos] = useState<Video[]>(mockVideos)

  return (
    <div className='home-page'>
      <ListPage videos={videos} />
    </div>
  )
}

export default HomePage
