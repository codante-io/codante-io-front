import type { User } from "~/models/user.server";

export type ContextType = { user: User | null };
