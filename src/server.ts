import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/customers", async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/customers", async (req: Request, res: Response) => {
  try {
    const { name, identity, personType } = req.body;
    const customer = await prisma.customer.create({
      data: { name, identity, personType },
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/vehicles", async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: { customer: true },
    });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/vehicles", async (req: Request, res: Response) => {
  try {
    const { car_plate, car, model, year, customerId } = req.body;
    const vehicle = await prisma.vehicle.create({
      data: { car_plate, car, model, year, customerId },
    });
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/services", async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/services", async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const service = await prisma.service.create({
      data: { name, description, price },
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/parts", async (req: Request, res: Response) => {
  try {
    const parts = await prisma.part.findMany();
    res.json(parts);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/parts", async (req: Request, res: Response) => {
  try {
    const { name, description, stock, reserved_stock, price } = req.body;
    const part = await prisma.part.create({
      data: { name, description, stock, reserved_stock, price },
    });
    res.status(201).json(part);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/service-orders", async (req: Request, res: Response) => {
  try {
    const orders = await prisma.serviceOrder.findMany({
      include: {
        customer: true,
        vehicle: true,
        services: { include: { service: true } },
        parts: { include: { part: true } },
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/service-orders", async (req: Request, res: Response) => {
  try {
    const { customerId, vehicle_id, status, budget, services, parts } = req.body;

    const order = await prisma.serviceOrder.create({
      data: {
        customerId,
        vehicle_id,
        status,
        budget,
        deleted: false,
        services: {
          create: services?.map((s: any) => ({
            service_id: s.service_id,
            quantity: s.quantity,
            total_value: s.total_value,
          })),
        },
        parts: {
          create: parts?.map((p: any) => ({
            part_id: p.part_id,
            quantity: p.quantity,
            total_value: p.total_value,
          })),
        },
      },
      include: {
        services: true,
        parts: true,
      },
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
