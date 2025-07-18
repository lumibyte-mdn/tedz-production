import { PrismaClient } from '../generated/prisma';

const categorySeed = async (db: PrismaClient) => {
  await db.category.createMany({
    data: [
      {
        name: 'Video Commercial',
      },
      {
        name: 'Social Media',
      },
      {
        name: 'Tiktok / Reels',
      },
    ],
  });

  console.info('🌱 Category seeding complete');
};
export default categorySeed;
