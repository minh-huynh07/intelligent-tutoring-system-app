export type CourseInfo = {
  courseTitle: string
  description: string
  chapters: CourseChapter[]
}

export type CourseChapter = {
  chapterTitle: string
  lectures: CourseLecture[]
}

export type CourseLecture = {
  lectureTitle: string
  videoUrl: string
  durationSec: number
}

