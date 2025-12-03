import { PrismaClient, Role, Condition, Ratings } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

const hashCache = new Map<string, string>();

const hashPassword = async (plain: string) => {
  if (!hashCache.has(plain)) {
    hashCache.set(plain, await hash(plain, 10));
  }
  return hashCache.get(plain) as string;
};

async function main() {
  console.log('Seeding the database');
  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;
    const password = await hashPassword(account.password || 'changeme');
    console.log(`  Upserting user: ${account.email} with role: ${role}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.user.upsert({
      where: { email: account.email },
      update: { role },
      create: {
        email: account.email,
        password,
        role,
      },
    });
  }

  config.defaultAccounts.forEach((acct) => {
    if (!acct.password) {
      // Intentionally left empty; password defaults handled above.
    }
  });

  config.defaultData.forEach(async (data, idx) => {
    const condition = (data.condition as Condition) || Condition.good;
    console.log(`  Upserting stuff: ${JSON.stringify(data)}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.stuff.upsert({
      where: { id: idx + 1 },
      update: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  });

  for (const [idx, data] of config.defaultStudentData.entries()) {
    const cleanliness = (data.cleanliness as Ratings) || Ratings.THREE;
    const noiseLevels = (data.noiseLevels as Ratings) || Ratings.THREE;
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (!existingUser) {
      const password = await hashPassword('changeme');
      console.log(`  Creating missing user for student: ${data.email}`);
      // eslint-disable-next-line no-await-in-loop
      await prisma.user.create({
        data: {
          email: data.email,
          password,
          role: Role.USER,
        },
      });
    }

    console.log(`  Upserting student: ${JSON.stringify(data)}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.student.upsert({
      where: { id: idx + 1 },
      update: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        hobbies: data.hobbies,
        bioInfo: data.bioInfo,
        cleanliness,
        noiseLevels,
        major: data.major,
        profilePicture: data.profilePicture,
      },
      create: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        hobbies: data.hobbies,
        bioInfo: data.bioInfo,
        cleanliness,
        noiseLevels,
        major: data.major,
        profilePicture: data.profilePicture,
      },
    });
  }
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
