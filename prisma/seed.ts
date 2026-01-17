import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  await prisma.sO_Part.deleteMany({});
  await prisma.sO_Service.deleteMany({});
  await prisma.serviceOrder.deleteMany({});
  await prisma.vehicle.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.part.deleteMany({});

  console.log("✅ Cleaned existing data");

  const hashedPassword = await bcrypt.hash("password123", 10);

  const user1 = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@autorepair.com",
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Manager User",
      email: "manager@autorepair.com",
      password: hashedPassword,
    },
  });

  console.log("✅ Created 2 users");

  const customer1 = await prisma.customer.create({
    data: {
      name: "João Silva",
      identity: "11144477735",
      personType: "FISICA",
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: "Maria Santos",
      identity: "52998224725",
      personType: "FISICA",
    },
  });

  const customer3 = await prisma.customer.create({
    data: {
      name: "Empresa ABC LTDA",
      identity: "11222333000181",
      personType: "JURIDICA",
    },
  });

  console.log("✅ Created 3 customers");

  const vehicle1 = await prisma.vehicle.create({
    data: {
      car_plate: "ABC-1234",
      car: "Toyota",
      model: "Corolla",
      year: 2020,
      customerId: customer1.id,
    },
  });

  const vehicle2 = await prisma.vehicle.create({
    data: {
      car_plate: "XYZ-5678",
      car: "Honda",
      model: "Civic",
      year: 2021,
      customerId: customer1.id,
    },
  });

  const vehicle3 = await prisma.vehicle.create({
    data: {
      car_plate: "DEF-9012",
      car: "Ford",
      model: "Fusion",
      year: 2019,
      customerId: customer2.id,
    },
  });

  const vehicle4 = await prisma.vehicle.create({
    data: {
      car_plate: "GHI-3456",
      car: "Volkswagen",
      model: "Jetta",
      year: 2022,
      customerId: customer3.id,
    },
  });

  console.log("✅ Created 4 vehicles");

  const service1 = await prisma.service.create({
    data: {
      name: "Troca de óleo",
      description: "Troca completa de óleo do motor",
      price: 150.0,
    },
  });

  const service2 = await prisma.service.create({
    data: {
      name: "Alinhamento e balanceamento",
      description: "Alinhamento e balanceamento das 4 rodas",
      price: 120.0,
    },
  });

  const service3 = await prisma.service.create({
    data: {
      name: "Revisão completa",
      description:
        "Revisão completa do veículo com check-up de todos os sistemas",
      price: 450.0,
    },
  });

  const service4 = await prisma.service.create({
    data: {
      name: "Troca de pastilhas de freio",
      description: "Substituição das pastilhas de freio dianteiras",
      price: 200.0,
    },
  });

  console.log("✅ Created 4 services");

  const part1 = await prisma.part.create({
    data: {
      name: "Filtro de óleo",
      description: "Filtro de óleo original",
      stock: 50,
      reserved_stock: 0,
      price: 35.0,
    },
  });

  const part2 = await prisma.part.create({
    data: {
      name: "Pastilha de freio",
      description: "Jogo de pastilhas de freio dianteiras",
      stock: 30,
      reserved_stock: 0,
      price: 180.0,
    },
  });

  const part3 = await prisma.part.create({
    data: {
      name: "Óleo lubrificante 5W30",
      description: "Óleo sintético 5W30 - 1 litro",
      stock: 100,
      reserved_stock: 0,
      price: 45.0,
    },
  });

  const part4 = await prisma.part.create({
    data: {
      name: "Vela de ignição",
      description: "Vela de ignição original",
      stock: 80,
      reserved_stock: 0,
      price: 25.0,
    },
  });

  const part5 = await prisma.part.create({
    data: {
      name: "Filtro de ar",
      description: "Filtro de ar original",
      stock: 40,
      reserved_stock: 0,
      price: 55.0,
    },
  });

  console.log("✅ Created 5 parts");

  const serviceOrder1 = await prisma.serviceOrder.create({
    data: {
      status: "RECEIVED",
      budget: 515.0,
      customerId: customer1.id,
      vehicle_id: vehicle1.vehicle_id,
      deleted: false,
      services: {
        create: [
          {
            service_id: service1.service_id,
            quantity: 1,
            total_value: 150.0,
          },
        ],
      },
      parts: {
        create: [
          {
            part_id: part1.part_id,
            quantity: 1,
            total_value: 35.0,
          },
          {
            part_id: part3.part_id,
            quantity: 4,
            total_value: 180.0,
          },
        ],
      },
    },
  });

  const serviceOrder2 = await prisma.serviceOrder.create({
    data: {
      status: "IN_PROGRESS",
      budget: 380.0,
      customerId: customer1.id,
      vehicle_id: vehicle2.vehicle_id,
      deleted: false,
      services: {
        create: [
          {
            service_id: service4.service_id,
            quantity: 1,
            total_value: 200.0,
          },
        ],
      },
      parts: {
        create: [
          {
            part_id: part2.part_id,
            quantity: 1,
            total_value: 180.0,
          },
        ],
      },
    },
  });

  const serviceOrder3 = await prisma.serviceOrder.create({
    data: {
      status: "IN_PROGRESS",
      budget: 570.0,
      customerId: customer2.id,
      vehicle_id: vehicle3.vehicle_id,
      deleted: false,
      services: {
        create: [
          {
            service_id: service2.service_id,
            quantity: 1,
            total_value: 120.0,
          },
          {
            service_id: service3.service_id,
            quantity: 1,
            total_value: 450.0,
          },
        ],
      },
      parts: {
        create: [],
      },
    },
  });

  const serviceOrder4 = await prisma.serviceOrder.create({
    data: {
      status: "IN_DIAGNOSIS",
      budget: 705.0,
      customerId: customer3.id,
      vehicle_id: vehicle4.vehicle_id,
      deleted: false,
      services: {
        create: [
          {
            service_id: service3.service_id,
            quantity: 1,
            total_value: 450.0,
          },
        ],
      },
      parts: {
        create: [
          {
            part_id: part4.part_id,
            quantity: 4,
            total_value: 100.0,
          },
          {
            part_id: part5.part_id,
            quantity: 1,
            total_value: 55.0,
          },
        ],
      },
    },
  });

  const serviceOrder5 = await prisma.serviceOrder.create({
    data: {
      status: "COMPLETED",
      budget: 705.0,
      customerId: customer3.id,
      vehicle_id: vehicle4.vehicle_id,
      deleted: true,
      services: {
        create: [
          {
            service_id: service3.service_id,
            quantity: 1,
            total_value: 450.0,
          },
        ],
      },
      parts: {
        create: [
          {
            part_id: part4.part_id,
            quantity: 4,
            total_value: 100.0,
          },
          {
            part_id: part5.part_id,
            quantity: 1,
            total_value: 55.0,
          },
        ],
      },
    },
  });

  const serviceOrder6 = await prisma.serviceOrder.create({
    data: {
      status: "DELIVERED",
      budget: 515.0,
      customerId: customer1.id,
      vehicle_id: vehicle1.vehicle_id,
      deleted: true,
      services: {
        create: [
          {
            service_id: service1.service_id,
            quantity: 1,
            total_value: 150.0,
          },
        ],
      },
      parts: {
        create: [
          {
            part_id: part1.part_id,
            quantity: 1,
            total_value: 35.0,
          },
          {
            part_id: part3.part_id,
            quantity: 4,
            total_value: 180.0,
          },
        ],
      },
    },
  });

  console.log("✅ Created 4 service orders");

  console.log("\n🎉 Seeding completed successfully!\n");
  console.log("📊 Summary:");
  console.log("   - Users: 2");
  console.log("   - Customers: 3 (2 FISICA, 1 JURIDICA)");
  console.log("   - Vehicles: 4");
  console.log("   - Services: 4");
  console.log("   - Parts: 5");
  console.log(
    "   - Service Orders: 4 (RECEIVED, IN_PROGRESS, COMPLETED, IN_DIAGNOSIS)"
  );
  console.log("\n📝 Test credentials:");
  console.log("   Email: admin@autorepair.com");
  console.log("   Password: password123");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });