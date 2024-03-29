import {Request, Response} from 'express'
import tarefaService from '../service/tarefa.service';
import {StatusCode} from "../enum/statuscode.enum";

class TarefaController {
  async createOne(req: Request, res: Response) {
    try {
      const tarefa = req.body;
      const newTarefa = await tarefaService.createOne(tarefa);
      return res.status(StatusCode.CREATED).json(newTarefa);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.NOT_AUTHORIZED).send();
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const tarefas = await tarefaService.findAll();
      return res.status(StatusCode.SUCCESS).json(tarefas);
    } catch (error) {
      console.error(error);
        return res.status(StatusCode.NO_CONTENT).send();
    }
  }

  async updateOne(req: Request, res: Response) {
    try {
      const tarefaId = parseInt(req.params.id);
      const tarefaUpdated = await tarefaService.updateOne(tarefaId, req.body);
      return res.status(StatusCode.SUCCESS).json(tarefaUpdated);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.NOT_AUTHORIZED).send();
    }
  }

  async deleteOne(req: Request, res: Response) {
    try {
      const tarefaId = parseInt(req.params.id);
      await tarefaService.deleteOne(tarefaId);
      res.status(StatusCode.NO_CONTENT).send();
    } catch (error) {
      console.error(error);
      res.status(StatusCode.NOT_FOUND).send();
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const tarefaId = parseInt(req.params.id);
      const tarefa = await tarefaService.findOne(tarefaId);
      return res.status(StatusCode.SUCCESS).json(tarefa);
    } catch (error) {
      console.error(error);
      res.status(StatusCode.NO_CONTENT).send();
    }
  }

  async findTarefasOfUser(req: Request, res: Response) {
    try {
      const usuarioId = parseInt(req.params.id);
      const tarefas = await tarefaService.findAllOfUser(usuarioId);
      return res.status(StatusCode.SUCCESS).json(tarefas);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.NO_CONTENT).send();
    }
  }

  async countOfUserTarefas(req: Request, res: Response) {
    try {
      const usuarioId = parseInt(req.params.id);
      const count = await tarefaService.countOfUserTarefas(usuarioId);
      return res.status(StatusCode.SUCCESS).json(count);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.NO_CONTENT).send();
    }
  }
}

export default new TarefaController();