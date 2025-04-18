// src/services/lectureService.ts

import { Lecture } from "@/types";
import { HttpService } from "@/utils/httpClient";

class LectureService extends HttpService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  // Fetch lectures for a given course
  getByCourse(courseId: string): Promise<Lecture[]> {
    return this.get<Lecture[]>(`/courses/${courseId}/lectures`);
  }

  // Fetch one lecture by ID
  getById(id: string): Promise<Lecture> {
    return this.get<Lecture>(`/lectures/${id}`);
  }
}

export default new LectureService();
