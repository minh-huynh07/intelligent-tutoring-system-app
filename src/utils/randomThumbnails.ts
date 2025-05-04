import DotaThumb1 from '@/assets/course-thumbnail-1.jpg'
import DotaThumb2 from '@/assets/course-thumbnail-2.jpg'
import DotaThumb3 from '@/assets/course-thumbnail-3.jpg'
import DotaThumb4 from '@/assets/course-thumbnail-4.jpg'
import DotaThumb5 from '@/assets/course-thumbnail-5.jpg'

export const getRandomLocalThumbnail = (): string => {
  const thumbnails = [DotaThumb1, DotaThumb2, DotaThumb3, DotaThumb4, DotaThumb5]

  const index = Math.floor(Math.random() * thumbnails.length)
  return thumbnails[index]
}
