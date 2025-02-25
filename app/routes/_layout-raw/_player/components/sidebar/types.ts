export type SidebarSection = {
  name: string;
  lesson_ids: number[];
};

export type SidebarLesson = {
  id: number;
  name: string;
  slug: string;
  url: string;
  user_completed: boolean;
  thumbnail_url: string;
  duration_in_seconds: number;
  user_can_view: boolean;
};

export type Title = {
  type: string;
  title: string;
  subTitle: string;
  url: string;
};
