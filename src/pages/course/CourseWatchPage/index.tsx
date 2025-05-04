import './styles.scss'
import VideoPlayer from '@/components/VideoPlayer'
import { useLocation } from 'react-router-dom';
import { VideoLectureMetadata } from '@/types/lectures';

const CourseWatchPage = () => {
  const { state: lectureData } = useLocation() as { state: VideoLectureMetadata };

  const { title, video_s3_key } = lectureData
  const videoUrl = `https://game-lecture-processed-videos.s3.ap-southeast-1.amazonaws.com/${video_s3_key}/manifest.mpd`
  return (
    <div className='course-watch-page'>
      <div className='course-info'>
        <div className='course-info__title'>{title}</div>
        <div className='course-info__sub-info'>
        </div>
      </div>

      <div className='course-video'>
        <VideoPlayer mpdUrl={videoUrl} />
        {/* <ReactPlayer url={videoUrl} width='100%' height='100%' controls /> */}
      </div>
    </div>
  )
}

export default CourseWatchPage
