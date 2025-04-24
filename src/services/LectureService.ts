// src/services/lectureService.ts

import axios from 'axios'
import { VideoLectureReadMetadata, VideoLectureMetadata, LectureMetadata } from '@/types/lectures'
import { HttpService } from '@/utils/httpClient'

class LectureService extends HttpService {
  constructor() {
    super(import.meta.env.VITE_API_URL)
  }

  // Fetch lectures for a given course
  getByCourse(courseId: string): Promise<LectureMetadata[]> {
    return this.get<LectureMetadata[]>(`/courses/${courseId}/lectures`)
  }

  // Fetch one lecture by ID
  getById(id: string): Promise<LectureMetadata> {
    return this.get<LectureMetadata>(`/api/lectures/${id}`)
  }

  // Get pre-signed S3 upload URL and video ID
  getPresignedUrl(): Promise<{ url: string; video_id: string }> {
    return this.get<{ url: string; video_id: string }>(`/api/lectures/url`, {
      withCredentials: true
    })
  }

  // Upload file directly to S3 using pre-signed URL
  uploadToS3(url: string, file: File): Promise<void> {
    return axios
      .put(url, file, {
        headers: {
          'Content-Type': 'video/mp4'
        }
      })
      .then(() => {})
  }

  // Create lecture metadata record in backend
  createVideoLecture(metadata: VideoLectureMetadata): Promise<VideoLectureReadMetadata> {
    return this.post<VideoLectureReadMetadata>(`api/lectures/metadata`, metadata)
  }

  getLecturesByUserID(id: string): Promise<VideoLectureMetadata[]> {
    return this.get<VideoLectureMetadata[]>(`/api/lectures/user`, {
      withCredentials: true,
      params: {
        user_id: id
      }
    })
  }
}

export default new LectureService()
