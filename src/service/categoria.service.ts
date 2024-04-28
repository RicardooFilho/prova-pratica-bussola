import { Categoria } from "../domain/categoria";
import categoriaRepository from "../repository/categoria.repository";

class CategoriaService {
  async createOne(categoria: Categoria) {
    return categoriaRepository.create(categoria);
  }

  async findAll() {
    return categoriaRepository.findAll();
  }

  async updateOne(id: number, categoria: Categoria) {
    return categoriaRepository.update(id, categoria);
  }

  async deleteOne(id: number) {
    await categoriaRepository.delete(id);
  }

  async count() {
    return categoriaRepository.count();
  }
}

export default new CategoriaService();