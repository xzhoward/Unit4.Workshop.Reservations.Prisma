const express = require("express");
const morgan = require("morgan");
const prisma = require("./prisma");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/customers", async (req, res) => {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  });

app.get("/api/restaurants", async (req, res) => {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  });

app.get("/api/reservations", async (req, res) => {
    const reservations = await prisma.reservation.findMany();
    res.json(reservations);
  });
  
app.post("/api/customers/:id/reservations", async (req, res) => {
    const customerId = parseInt(req.params.id);
    const { restaurantId, date, partyCount } = req.body;
    const reservation = await prisma.reservation.create({
      data: {
        date: new Date(date),
        partyCount,
        customerId,
        restaurantId,
      },
    });
    res.status(201).json(reservation);
  });

app.delete("/api/customers/:customerId/reservations/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.reservation.delete({ where: { id } });
    res.sendStatus(204);
  });
  
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
