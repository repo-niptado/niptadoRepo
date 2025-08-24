// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'superadmin@niptado.com';
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (!existing) {
    const hashedPassword = await bcrypt.hash('SuperSecure123!', 10);

    await prisma.user.create({
      data: {
        name: 'Super Admin',
        email,
        phone: '9999999999',
        location: 'HQ',
        password: hashedPassword,
        role: 'SUPERADMIN',
      },
    });

    console.log('✅ Superadmin seeded.');
  } else {
    console.log('⚠️ Superadmin already exists.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
