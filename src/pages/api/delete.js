import { prismaClient } from "@/helper/client";
const prisma = prismaClient();

export default async function handler(req, res) {
  if (req?.method !== "DELETE") {
    res?.status(400).json({ message: "yntkts" });
    return;
  }

  const { id } = req.body;

  try {
    const item = await prisma.car.delete({
      where: { id: id },
    });

    console.log(item);
    res?.status(200).json({ message: "car deleted" });
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
    return;
  });
