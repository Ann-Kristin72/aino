import { getAllContentMeta } from '@aino/core/content/registry';

interface User {
  roles: string[];
  services: string[];
}

export function getVisibleContentForUser(user: User) {
  const all = getAllContentMeta();
  return all.filter(entry => 
    entry.level.some(role => user.roles.includes(role)) &&
    entry.context.some(ctx => user.services.includes(ctx))
  );
} 