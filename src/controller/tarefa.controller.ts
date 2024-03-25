import { Tarefa } from './../domain/tarefa';
import { Categoria } from './../domain/categoria';
import { Request, Response } from 'express'
import tarefaService from '../service/tarefa.service';

class TarefaController {
  async createOne(req: Request, res: Response) {
    try {
      const tarefaCreated = await tarefaService.createOne(req.body);
      return res.status(201).json(tarefaCreated);
    } catch (error) {
      console.error(error);
      return res.status(400).send();
    }
  }

  async findAll(req: Request, res: Response) {
    const tarefas = await tarefaService.findAll();
    return res.status(200).json(tarefas);
  }

  async updateOne(req: Request, res: Response) {
    const tarefaUpdated = await tarefaService.updateOne(parseInt(req.params.id), req.body);
    return res.status(200).json(tarefaUpdated); 
  }

  async deleteOne(req: Request, res: Response) {
    try {
      await tarefaService.deleteOne(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(400).send();
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const tarefa = await tarefaService.findOne(parseInt(req.params.id));
      return res.status(200).json(tarefa);
    } catch (error) {
      console.error(error);
      res.status(400).send();
    }
  }

  async findTarefasOfUser(req: Request, res: Response) {
    try {
      const tarefas = await tarefaService.findAllOfUser(parseInt(req.params.id));
      return res.status(200).json(tarefas);
    } catch (error) {
      console.error(error);
      return res.status(400).send();
    }
  }

  async countOfUserTarefas(req: Request, res: Response) {
    try {
      const count = await tarefaService.countOfUserTarefas(parseInt(req.params.id));
      return res.status(200).json(count);
    } catch (error) {
      console.error(error);
      return res.status(400).send();
    }
  }
}

export default new TarefaController();