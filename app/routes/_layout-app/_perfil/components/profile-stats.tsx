import { BsFillHeartFill, BsTools } from "react-icons/bs";
import { FaMedal } from "react-icons/fa";
import type { UserProfile } from "~/lib/models/user.server";

export default function ProfileStats({
  stats,
}: {
  stats: UserProfile["stats"];
}) {
  return (
    <section className="grid grid-cols-3 gap-4 mt-8">
      <StatCard
        icon={<BsTools className="w-5 h-5 text-brand-500" />}
        value={stats.completed_challenge_count}
        label="mini-projetos concluídos"
      />
      <StatCard
        icon={<BsFillHeartFill className="w-5 h-5 text-brand-500" />}
        value={stats.received_reaction_count}
        label="reações recebidas"
      />
      <StatCard
        icon={<FaMedal className="w-5 h-5 text-brand-500" />}
        value={stats.points}
        label="pontos"
      />
    </section>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-background-200 dark:border-background-600 bg-background-50 dark:bg-background-800 p-6">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-2xl font-bold dark:text-white">{value}</span>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
        {label}
      </span>
    </div>
  );
}
