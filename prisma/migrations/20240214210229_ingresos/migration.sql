-- CreateTable
CREATE TABLE "TiposIngresos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(30) NOT NULL,
    "descrip" TEXT,
    "imagen" TEXT NOT NULL,

    CONSTRAINT "TiposIngresos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingresos" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "nombre" VARCHAR(30),
    "tipoIngresoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ingresos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TiposIngresos_nombre_key" ON "TiposIngresos"("nombre");

-- AddForeignKey
ALTER TABLE "Ingresos" ADD CONSTRAINT "Ingresos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingresos" ADD CONSTRAINT "Ingresos_tipoIngresoId_fkey" FOREIGN KEY ("tipoIngresoId") REFERENCES "TiposIngresos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
