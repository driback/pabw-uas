import { prismaClient } from "@/helper/client";
const prisma = prismaClient();

export default async function handler(req, res) {
  if (req?.method !== "GET") {
    res?.send({ msg: "something went wrong" });
    return;
  }

  try {
    const cars = await prisma.car.findMany();
    res?.send({ data: cars });
  } catch (error) {
    console.log({ error });
    res?.send({ error });
  }
}

handler()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
