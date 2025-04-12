const prisma = require("./index");

const seed = async () => {
  await prisma.reservation.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.restaurant.deleteMany();

  const customers = await Promise.all([
    prisma.customer.create({ data: { name: "Alice" } }),
    prisma.customer.create({ data: { name: "Bob" } }),
    prisma.customer.create({ data: { name: "Charlie" } }),
    prisma.customer.create({ data: { name: "Diana" } }),
  ]);

  const restaurants = await Promise.all([
    prisma.restaurant.create({ data: { name: "Pizza Palace" } }),
    prisma.restaurant.create({ data: { name: "Sushi Spot" } }),
    prisma.restaurant.create({ data: { name: "Burger Barn" } }),
  ]);

  await prisma.reservation.create({
    data: {
      date: new Date(),
      partyCount: 2,
      customerId: customers[0].id,
      restaurantId: restaurants[0].id,
    },
  });

  await prisma.reservation.create({
    data: {
      date: new Date(),
      partyCount: 4,
      customerId: customers[1].id,
      restaurantId: restaurants[1].id,
    },
  });

  await prisma.reservation.create({
    data: {
      date: new Date(),
      partyCount: 3,
      customerId: customers[2].id,
      restaurantId: restaurants[2].id,
    },
  });

  console.log("🌱 Database has been seeded!");
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
