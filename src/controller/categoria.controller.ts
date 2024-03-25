import { Request, Response } from 'express'
import categoriaService from '../service/categoria.service';

class CategoriaController {
  async createOne(req: Request, res: Response) {
    const categoriaCreated = await categoriaService.createOne(req.body);
    return res.status(201).json(categoriaCreated);
  }

  async findAll(req: Request, res: Response) {
    const categorias = await categoriaService.findAll();
    return res.status(200).json(categorias);
  }

  async updateOne(req: Request, res: Response) {
    const categoriaUpdated = await categoriaService.updateOne(parseInt(req.params.id), req.body);
    return res.status(200).json(categoriaUpdated);
  }

  async deleteOne(req: Request, res: Response) {
    try {
      await categoriaService.deleteOne(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(400).send();
    }
  }
} 

export default new CategoriaController();