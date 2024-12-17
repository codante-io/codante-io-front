import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { registerPlugin } from "react-filepond";
import JoinChallengeSection from "~/routes/_layout-app/_mini-projetos/mini-projetos_.$slug_/_tabs/_overview/components/steps/join-challenge-section";
import "filepond/dist/filepond.min.css";
import "./filepond-style.css";

registerPlugin(FilePondPluginFileValidateType);

export default function LessonSubmitSolution() {
  return (
    <div className="max-w-prose pt-10">
      <JoinChallengeSection
        githubRepoUrl="http://uol.com.br"
        slug="tatoo-shop-website-com-next-js"
        steps={[
          { id: "connect-github", status: "completed" },
          { id: "join-challenge", status: "completed" },
          { id: "join-discord", status: "current" },
          { id: "submit-challenge", status: "upcoming" },
        ]}
      />
    </div>
  );
}
