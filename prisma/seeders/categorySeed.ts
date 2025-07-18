import { CategoryLayout, PrismaClient } from '../generated/prisma';

const categorySeed = async (db: PrismaClient) => {
  await db.category.createMany({
    data: [
      {
        name: 'Video Commercial',
        layout: CategoryLayout.GRID,
      },
      {
        name: 'Social Media',
        layout: CategoryLayout.CARD,
      },
      {
        name: 'Tiktok / Reels',
        layout: CategoryLayout.PORTRAIT,
      },
    ],
  });

  console.info('🌱 Category seeding complete');
};
export default categorySeed;
