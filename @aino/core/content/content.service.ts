import { getAllContentMeta } from "./registry";
import { UserProfile } from "@aino/core/types/UserProfile";
import { ContentMeta } from "@aino/core/types/ContentMeta";

export function getVisibleContentForUser(user: UserProfile): ContentMeta[] {
  const all = getAllContentMeta();
  return all.filter(entry =>
    entry.level.some(role => user.roles.includes(role)) &&
    entry.context.some(ctx => user.services.includes(ctx))
  );
} 