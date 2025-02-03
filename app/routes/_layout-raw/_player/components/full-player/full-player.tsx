import { useFetcher, useNavigate } from "@remix-run/react";
import MainArea from "../main-area/main-area";
import MainContent from "../main-content";
import Nav from "../nav/nav";
import PlayerGrid from "../player-grid";
import Sidebar from "../sidebar/sidebar";
import SidebarItem from "../sidebar/sidebar-item";
import SidebarSectionTitle from "../sidebar/sidebar-section-title";
import { SidebarLesson, SidebarSection, Title } from "../sidebar/types";
import { User } from "~/lib/models/user.server";
import { useState, useEffect, useRef } from "react";
import { Lesson } from "~/lib/models/lesson.server";

type FullPlayerProps = {
  lesson: Lesson;
  lessons: SidebarLesson[];
  lessonSections: SidebarSection[] | undefined;
  user: User | null;
  titles: Title[];
};

export default function FullPlayer({
  lesson,
  lessons,
  lessonSections,
  user,
  titles,
}: FullPlayerProps) {
  const fetcher = useFetcher();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [nextLesson, setNextLesson] = useState<SidebarLesson | null>(null);
  const mobileNavSidebarButtonRef = useRef(null);

  useEffect(() => {
    const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
    if (currentIndex !== -1 && currentIndex < lessons.length - 1) {
      setNextLesson(lessons[currentIndex + 1]);
    } else {
      setNextLesson(null);
    }
    setIsSidebarOpen(false);
  }, [lesson, lessons]);

  async function handleVideoEnded(lessonId: number) {
    if (user) {
      fetcher.submit(
        { lessonId, markCompleted: "true" },
        { method: "post", action: "/api/set-watched?index" },
      );
    }
    if (nextLesson) {
      const relativePath = nextLesson.url.replace(/^.*\/\/[^/]+/, "");
      navigate(relativePath);
    }
  }

  return (
    <PlayerGrid>
      <Nav
        mobileNavSidebarButtonRef={mobileNavSidebarButtonRef}
        user={user}
        titles={titles}
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />
      <MainArea>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          mobileNavSidebarButtonRef={mobileNavSidebarButtonRef}
        >
          {lessonSections &&
            lessonSections.map((section) => {
              const sectionLessons = section.lesson_ids.map((id) =>
                lessons.find((l) => l.id === id),
              );
              return (
                <div key={section.name} className="">
                  <SidebarSectionTitle className="pl-4 mb-4 border-b dark:border-b-background-800">
                    {section.name}
                  </SidebarSectionTitle>
                  {sectionLessons &&
                    sectionLessons.map((sectionLesson, index) => {
                      if (!sectionLesson) return null;
                      return (
                        <SidebarItem
                          id={sectionLesson.id}
                          key={sectionLesson.id}
                          name={sectionLesson.name}
                          url={sectionLesson.url}
                          completed={sectionLesson.user_completed}
                          userCanView={sectionLesson.user_can_view}
                          isFirst={index === 0}
                          current={lesson.id === sectionLesson.id}
                          isLast={index === sectionLessons.length - 1}
                        />
                      );
                    })}
                </div>
              );
            })}
        </Sidebar>

        <MainContent
          handleVideoEnded={handleVideoEnded}
          lesson={lesson}
          isSidebarOpen={isSidebarOpen}
        />
      </MainArea>
    </PlayerGrid>
  );
}
