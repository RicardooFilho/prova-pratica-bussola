-- DropForeignKey
ALTER TABLE "tarefa" DROP CONSTRAINT "tarefa_categoria_id_fkey";

-- AlterTable
ALTER TABLE "tarefa" ALTER COLUMN "categoria_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
