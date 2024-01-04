import type { User } from "~/lib/models/user.server";

export type ContextType = { user: User | null };
