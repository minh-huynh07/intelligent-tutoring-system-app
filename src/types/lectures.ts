// src/types/lectures.ts

/** Common fields cho cả Video và Text lecture */
export interface LectureMetadata {
  title: string
  type: string
  visibility: string
  user_id: string
  thumbnail?: string
  processing_status: string
}

/** Payload gửi từ client để tạo VideoLecture */
export interface VideoLectureMetadata extends LectureMetadata {
  video_s3_key?: string
}

/** Payload gửi từ client để tạo TextLecture */
export interface TextLectureMetadata extends LectureMetadata {
  content: string
}

/** Response của API sau khi tạo VideoLecture */
export interface VideoLectureReadMetadata extends VideoLectureMetadata {
  id: string
  processing_status: string
  created_at: string // ISO datetime
  updated_at: string // ISO datetime
}

/** Response của API sau khi tạo TextLecture */
export interface TextLectureReadMetadata extends TextLectureMetadata {
  id: string
  created_at: string // ISO datetime
  updated_at: string // ISO datetime
}

/** Dữ liệu lecture chung khi đọc */
export interface LectureReadData extends LectureMetadata {
  id: string
  created_at: string // ISO datetime
  updated_at: string // ISO datetime
}

export interface Lecture {
  id: string
  title: string
  duration: number // in seconds
  // …other fields
}
