export type Lesson = {
  id: string;
  workshop_id: string;
  name: string;
  description?: string;
  content?: string;
  slug: string;
  duration_in_seconds: number;
  created_at: string;
  updated_at: string;
};
