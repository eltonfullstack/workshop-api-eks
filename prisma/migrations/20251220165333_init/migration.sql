-- CreateTable
CREATE TABLE "customers" (
    "customer_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identity" TEXT NOT NULL,
    "person_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "vehicle_id" TEXT NOT NULL,
    "car_plate" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("vehicle_id")
);

-- CreateTable
CREATE TABLE "ServiceOrder" (
    "so_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "open_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "close_date" TIMESTAMP(3),
    "budget" DOUBLE PRECISION NOT NULL,
    "customer_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ServiceOrder_pkey" PRIMARY KEY ("so_id")
);

-- CreateTable
CREATE TABLE "Service" (
    "service_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "SO_Service" (
    "so_service_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_value" DOUBLE PRECISION NOT NULL,
    "so_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "SO_Service_pkey" PRIMARY KEY ("so_service_id")
);

-- CreateTable
CREATE TABLE "Part" (
    "part_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "reserved_stock" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Part_pkey" PRIMARY KEY ("part_id")
);

-- CreateTable
CREATE TABLE "SO_Part" (
    "so_part_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total_value" DOUBLE PRECISION NOT NULL,
    "so_id" TEXT NOT NULL,
    "part_id" TEXT NOT NULL,

    CONSTRAINT "SO_Part_pkey" PRIMARY KEY ("so_part_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_identity_key" ON "customers"("identity");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_car_plate_key" ON "Vehicle"("car_plate");

-- CreateIndex
CREATE UNIQUE INDEX "Part_name_key" ON "Part"("name");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOrder" ADD CONSTRAINT "ServiceOrder_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOrder" ADD CONSTRAINT "ServiceOrder_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("vehicle_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SO_Service" ADD CONSTRAINT "SO_Service_so_id_fkey" FOREIGN KEY ("so_id") REFERENCES "ServiceOrder"("so_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SO_Service" ADD CONSTRAINT "SO_Service_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SO_Part" ADD CONSTRAINT "SO_Part_so_id_fkey" FOREIGN KEY ("so_id") REFERENCES "ServiceOrder"("so_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SO_Part" ADD CONSTRAINT "SO_Part_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "Part"("part_id") ON DELETE RESTRICT ON UPDATE CASCADE;
