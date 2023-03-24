import axios from "axios";

type Course = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  slug: string;
};

export async function getCourses(): Promise<Array<Course>> {

  const courses = await axios.get('http://127.0.0.1:8000/api/courses').then(res => res.data)
  return courses
}

export async function getCourse(slug: string) {
  const course = await axios.get(`http://127.0.0.1:8000/api/courses/${slug}`).then(res => res.data)
  return course
}
