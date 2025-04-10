import React from 'react'
import { Card, Progress, Collapse, Typography, Button, Tag, List, Divider } from 'antd'
import { PlayCircleOutlined, CheckCircleOutlined, LockOutlined, VideoCameraOutlined } from '@ant-design/icons'

import CourseInfoTab from '@/features/course/components/CourseInfoTab'

const { Title, Text } = Typography
const { Panel } = Collapse

// const CourseWatchPage: React.FC = () => {
//   return (
//     <div className='p-6 bg-black min-h-screen text-white'>
//       <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
//         <div className='md:col-span-2'>
//           <Card
//             cover={<img alt='Course' src='/course-cover.jpg' className='object-cover h-64' />}
//             bordered={false}
//             className='bg-black text-white'
//           >
//             <Title level={3} className='text-white'>
//               Chapter 2: Curriculum
//             </Title>
//             <Text className='text-gray-400'>6 Lectures • 12% completed</Text>
//             <Divider className='bg-white' />
//             <List
//               itemLayout='horizontal'
//               dataSource={courseData[1].videos}
//               renderItem={(item) => (
//                 <List.Item>
//                   <List.Item.Meta
//                     avatar={
//                       item.completed ? (
//                         <CheckCircleOutlined style={{ color: '#52c41a' }} />
//                       ) : (
//                         <PlayCircleOutlined style={{ color: '#f5222d' }} />
//                       )
//                     }
//                     title={<Text className='text-white'>{item.title}</Text>}
//                     description={<Text className='text-gray-400'>{item.duration}</Text>}
//                   />
//                 </List.Item>
//               )}
//             />
//           </Card>
//         </div>
//
//         <div>
//           <Card bordered={false} className='bg-green-900 text-white h-full'>
//             <Tag color='red'>WEBINAR</Tag>
//             <Title level={4} className='text-white'>
//               Ana Kursova
//             </Title>
//             <Text>Masterclass in Design Thinking, Innovation & Creativity</Text>
//             <div className='mt-4'>
//               <Button type='primary'>Learn More</Button>
//             </div>
//           </Card>
//         </div>
//       </div>
//
//       <div className='mt-10'>
//         <Collapse defaultActiveKey={['1']} ghost>
//           {courseData.map((chapter, idx) => (
//             <Panel
//               header={
//                 <div className='flex justify-between'>
//                   <Text className='text-white'>{chapter.title}</Text>
//                   <Text className='text-gray-400'>{chapter.duration}</Text>
//                 </div>
//               }
//               key={idx.toString()}
//             >
//               {chapter.videos.map((video, vIdx) => (
//                 <div key={vIdx} className='flex justify-between border-b border-gray-700 py-2'>
//                   <span className='flex items-center gap-2'>
//                     {video.completed ? (
//                       <CheckCircleOutlined style={{ color: '#52c41a' }} />
//                     ) : (
//                       <VideoCameraOutlined style={{ color: '#f5222d' }} />
//                     )}
//                     <Text className='text-white'>{video.title}</Text>
//                   </span>
//                   <Text className='text-gray-400'>{video.duration}</Text>
//                 </div>
//               ))}
//             </Panel>
//           ))}
//         </Collapse>
//       </div>
//     </div>
//   )
// }

const CourseWatchPage: React.FC = () => {
  return (
    <div>
      <CourseInfoTab />
    </div>
  )
}

export default CourseWatchPage
