import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import province from './seed/province.json';
import city from './seed/city.json';

const main = async () => {
  try {
    for (let i = 0; i < province.results.length; i++) {
      await prisma.province.upsert({
        where: { province_id: province.results[i].province_id },
        create: {
          province_id: province.results[i].province_id,
          province: province.results[i].province,
        },
        update: {},
      });
    }

    for (let i = 0; i < city.city.length; i++) {
      await prisma.city.upsert({
        where: { city_id: city.city[i].city_id },
        create: {
          city_id: city.city[i].city_id,
          province_id: city.city[i].province_id,
          province: city.city[i].province,
          type: city.city[i].type,
          city_name: city.city[i].city_name,
          postal_code: city.city[i].postal_code,
        },
        update: {},
      });
    }
  } catch (error) {
    throw error;
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
