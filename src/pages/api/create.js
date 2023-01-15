import { prismaClient } from "@/helper/client";
const prisma = prismaClient();

export default async function handler(req, res) {
  if (req?.method !== "POST") {
    res?.status(400).json({ message: "yntkts" });
    return;
  }

  const { brand, model, price } = req.body;

  try {
    const item = await prisma.car.create({
      data: {
        brand,
        model,
        price: parseInt(price),
      },
    });

    console.log(item);
    res?.status(200).json({ message: "car added" });
  } catch (error) {
    res?.send(error);
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
