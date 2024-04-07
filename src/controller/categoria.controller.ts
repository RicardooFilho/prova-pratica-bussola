import {Request, Response} from 'express'
import categoriaService from '../service/categoria.service';
import {StatusCode} from "../enum/statuscode.enum";

class CategoriaController {
  async createOne(req: Request, res: Response) {
    try {
      const newCategoria = req.body;
      const categoriaCreated = await categoriaService.createOne(newCategoria);
      return res.status(StatusCode.CREATED).json(categoriaCreated);
    } catch (error) {
      console.error(error)
      return res.status(StatusCode.NOT_AUTHORIZED)
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const categorias = await categoriaService.findAll();
      return res.status(StatusCode.SUCCESS).json(categorias);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.NO_CONTENT).send();
    }
  }

  async updateOne(req: Request, res: Response) {
    try {
      const categoriaId = parseInt(req.params.id);
      const newCategoria = req.body;
      const categoriaUpdated = await categoriaService.updateOne(categoriaId, newCategoria);
      return res.status(StatusCode.SUCCESS).json(categoriaUpdated);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.NOT_AUTHORIZED).send();
    }

  }

  async deleteOne(req: Request, res: Response) {
    try {
      const categoriaId = parseInt(req.params.id);
      await categoriaService.deleteOne(categoriaId);
      res.status(StatusCode.NO_CONTENT).send();
    } catch (error) {
      console.error(error);
      res.status(StatusCode.NOT_FOUND).send();
    }
  }
} 

export default new CategoriaController();