import { PrismaClient } from '@/db/prisma-client';
import subscribePlanSeeder from './seeders/subscribePlanSeeder';

const db = new PrismaClient();

async function main() {
  console.info('🌱 Seeding database');

  // Seed your database here
  await subscribePlanSeeder(db);

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
