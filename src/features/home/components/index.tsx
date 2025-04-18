import React from 'react'
import { Card, Row, Col, Typography, Rate } from 'antd'

const { Title, Text, Paragraph } = Typography

// Video type definition
export interface Video {
  id: string
  title: string
  thumbnail: string
  instructor: string
  description?: string
  rating?: number
}

// Props for ListPage component
export interface ListPageProps {
  videos: Video[]
}

// Single video card using Ant Design Card
interface VideoCardProps {
  video: Video
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => (
  <Card
    hoverable
    cover={<img alt={video.title} src={video.thumbnail} style={{ objectFit: 'cover', height: 180 }} />}
    style={{ borderRadius: 8, overflow: 'hidden' }}
  >
    <Card.Meta
      title={
        <Title level={4} style={{ margin: 0 }}>
          {video.title}
        </Title>
      }
      description={<Text type='secondary'>By {video.instructor}</Text>}
    />
    {video.description && (
      <Paragraph style={{ margin: '0.5rem 0' }} ellipsis={{ rows: 2 }}>
        {video.description}
      </Paragraph>
    )}
    {typeof video.rating === 'number' && <Rate disabled allowHalf defaultValue={video.rating} />}
  </Card>
)

// ListPage component
const ListPage: React.FC<ListPageProps> = ({ videos }) => (
  <div style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
    <Title level={2}>Recommended for You</Title>
    <Row gutter={[16, 16]}>
      {videos.map((video) => (
        <Col key={video.id} xs={24} sm={12} md={8} lg={6}>
          <VideoCard video={video} />
        </Col>
      ))}
    </Row>
  </div>
)

export default ListPage
