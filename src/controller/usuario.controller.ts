import { Request, Response } from 'express'
import usuarioService from '../service/usuario.service'
import {StatusCode} from "../enum/statuscode.enum";

class UsuarioController {
  async createOne(req: Request, res: Response) {
    try {
      const newUsuario = req.body;
      const usuarioCreated = await usuarioService.createOne(newUsuario);
      return res.status(StatusCode.CREATED).json(usuarioCreated);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.NOT_AUTHORIZED).send();
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const usuarios = await usuarioService.findAll();
      return res.status(StatusCode.SUCCESS).json(usuarios);
    } catch(error) {
      console.error(error);
      return res.status(StatusCode.NOT_FOUND).send();
    }
  }

  async updateOne(req: Request, res: Response) {
    try {
      const usuarioId = parseInt(req.params.id);
      const newUsuario = req.body;
      const usuarioUpdated = await usuarioService.updateOne(usuarioId, newUsuario);
      return res.status(StatusCode.SUCCESS).json(usuarioUpdated);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.NOT_AUTHORIZED);
    }
  }

  async deleteOne(req: Request, res: Response) {
    try {
      const usuarioId = parseInt(req.params.id);
      await usuarioService.deleteOne(usuarioId);
      res.status(StatusCode.NO_CONTENT).send();
    } catch (error) {
      console.error(error);
      res.status(StatusCode.NOT_FOUND).send();
    }
  }
}

export default new UsuarioController();