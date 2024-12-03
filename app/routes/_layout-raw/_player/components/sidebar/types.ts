export type SidebarSection = {
  name: string;
  lesson_ids: string[];
};

export type SidebarLesson = {
  id: string;
  name: string;
  slug: string;
  url: string;
  user_completed: boolean;
  thumbnail_url: string;
  open: boolean;
};
