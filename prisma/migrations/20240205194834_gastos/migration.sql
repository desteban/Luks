-- CreateTable
CREATE TABLE "Actividades" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Actividades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TiposGastos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,

    CONSTRAINT "TiposGastos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gastos" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "tipoGastoId" INTEGER NOT NULL,
    "actividadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gastos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TiposGastos_nombre_key" ON "TiposGastos"("nombre");

-- AddForeignKey
ALTER TABLE "Actividades" ADD CONSTRAINT "Actividades_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gastos" ADD CONSTRAINT "Gastos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gastos" ADD CONSTRAINT "Gastos_tipoGastoId_fkey" FOREIGN KEY ("tipoGastoId") REFERENCES "TiposGastos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gastos" ADD CONSTRAINT "Gastos_actividadId_fkey" FOREIGN KEY ("actividadId") REFERENCES "Actividades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
