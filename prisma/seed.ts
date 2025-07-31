import { PrismaClient } from './generated/prisma';
import brandSeed from './seeders/brandSeed';
import categorySeed from './seeders/categorySeed';

const db = new PrismaClient();

async function main() {
  console.info('🌱 Seeding database');

  // Seed your database here
  await categorySeed(db);
  // await brandSeed(db);

  console.info('🌱 Database seeding complete');
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
