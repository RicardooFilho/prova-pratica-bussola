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

  async findTarefasOfCategoria(req: Request, res: Response) {
    try {
      const categoriaId = parseInt(req.params.id);
      const tarefas = await tarefaService.findTarefasOfCategoria(categoriaId);
      return res.status(StatusCode.SUCCESS).json(tarefas);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.NO_CONTENT).send();
    }
  }

  async findTarefasByStatus(req: Request, res: Response) {
    try {
      const statusDescription = req.query.description as string;
      const tarefas = await tarefaService.findTarefasByStatus(statusDescription);
      return res.status(StatusCode.SUCCESS).json(tarefas);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.NO_CONTENT).send();
    }
  }

  async findTarefasByPeriodo(req: Request, res:Response) {
    try {
      const dataInicio = req.query.inicio as string;
      const dataFinal = req.query.final as string;
      const tarefas = await tarefaService.findTarefasByPeriodo(dataInicio, dataFinal);
      return res.status(StatusCode.SUCCESS).json(tarefas);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.NO_CONTENT).send();
    }
  }

  async findMostRecentTarefa(req: Request, res:Response) {
    try {
      const tarefa = await tarefaService.findMostRecentTarefa();
      return res.status(StatusCode.SUCCESS).json(tarefa);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.NO_CONTENT).send();
    }
  }

  async findOldestTarefa(req: Request, res:Response) {
    try {
      const tarefa = await tarefaService.findOldestTarefa();
      return res.status(StatusCode.SUCCESS).json(tarefa);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.NO_CONTENT).send();
    }
  }

  async findBiggestDescriptionTarefa(req: Request, res:Response) {
   try {
     const tarefa = await tarefaService.findBiggestDescription();
     return res.status(StatusCode.SUCCESS).json(tarefa);
   }  catch (error) {
     console.error(error);
     return res.status(StatusCode.NO_CONTENT).send();
   }
  }

  async findMediaConclusaoTarefas(req: Request, res:Response) {
    try {
      const mediaConclusao = await tarefaService.findMediaConclusaoTarefas();
      return res.status(StatusCode.SUCCESS).json(mediaConclusao);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.NO_CONTENT).send();
    }
  }
}

export default new TarefaController();