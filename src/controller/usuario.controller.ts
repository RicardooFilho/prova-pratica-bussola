import { Request, Response } from 'express'
import usuarioService from '../service/usuario.service'

class UsuarioController {
  async createOne(req: Request, res: Response) {
    try {
      const usuarioCreated = await usuarioService.createOne(req.body);
      return res.status(201).json(usuarioCreated);
    } catch (error) {
      console.error(error);
      return res.status(400).send();
    }
  }

  async findAll(req: Request, res: Response) {
    const usuarios = await usuarioService.findAll();
    return res.status(200).json(usuarios);  
  }

  async updateOne(req: Request, res: Response) {
    const usuarioUpdated = await usuarioService.updateOne(parseInt(req.params.id), req.body);
    return res.status(200).json(usuarioUpdated);
  }

  async deleteOne(req: Request, res: Response) {
    try {
      await usuarioService.deleteOne(parseInt(req.params.id));
      res.status(204).send(); 
    } catch (error) {
      console.error(error);
      res.status(400).send();
    }
  }
}

export default new UsuarioController();