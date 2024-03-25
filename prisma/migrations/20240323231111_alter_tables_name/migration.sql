/*
  Warnings:

  - You are about to drop the `Categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tarefa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA');

-- DropForeignKey
ALTER TABLE "Tarefa" DROP CONSTRAINT "Tarefa_categoria_id_fkey";

-- DropForeignKey
ALTER TABLE "Tarefa" DROP CONSTRAINT "Tarefa_usuario_id_fkey";

-- DropTable
DROP TABLE "Categoria";

-- DropTable
DROP TABLE "Tarefa";

-- DropTable
DROP TABLE "Usuario";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "peso" INTEGER NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" TEXT NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarefa" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL,
    "data_conclusao" TIMESTAMP(3) NOT NULL,
    "tipo" TEXT NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "status" "status" NOT NULL DEFAULT 'PENDENTE',
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
