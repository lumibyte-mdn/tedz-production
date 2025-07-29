import { PrismaClient } from '../generated/prisma';

const brandSeed = async (db: PrismaClient) => {
  await db.brand.createMany({
    data: Array.from({ length: 10 }, (_, index) => ({
      name: 'Ciptacode Brand ' + (index + 1),
      logo: '/svg/padellogo.svg',
    })),
  });

  console.info('🌱 Brand seeding complete');
};
export default brandSeed;
