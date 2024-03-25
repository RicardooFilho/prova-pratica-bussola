import prisma from "../../prisma";
import { Categoria } from "../domain/categoria";

class CategoriaRepository{
  async findAll() {
    return prisma.categoria.findMany();
  }

  async create(categoria: Categoria) {
    return prisma.categoria.create({
      data: {
        nome: categoria.nome,
        cor: categoria.cor
      }
    });
  }

  async update(id: number, categoria: Categoria) {
    return prisma.categoria.update({
      where: {id: id},
      data: {
        nome: categoria.nome,
        cor: categoria.cor
      }
    });
  }

  async delete(id: number) {
    await prisma.categoria.delete({
      where: {id: id}
    });
  }
}

export default new CategoriaRepository();