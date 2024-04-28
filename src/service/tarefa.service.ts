import { Tarefa } from '../domain/tarefa';
import tarefaRepository from '../repository/tarefa.repository';
import tarefaController from "../controller/tarefa.controller";

class TarefaService {
  async createOne(tarefa: Tarefa) {
    return tarefaRepository.create(tarefa);
  }

  async findAll() {
    return tarefaRepository.findAll();
  }

  async updateOne(id: number, tarefa: Tarefa) {
    return tarefaRepository.update(id, tarefa);
  }

  async deleteOne(id: number) {
    await tarefaRepository.delete(id);
  }

  async findOne(id: number) {
    const tarefas = await tarefaRepository.findAll();

    const tarefa = tarefas.find(tarefa => tarefa.id === id);
    return tarefa;
  }

  async findAllOfUser(userId: number) {
    const tarefas = await tarefaRepository.findAll();

    const tarefasOfUser = tarefas.filter(tarefa => tarefa.usuario_id === userId);
    return tarefasOfUser;
  }

  async countOfUserTarefas(userId: number) {
    const tarefas = await tarefaRepository.findAll();

    const countTarefas = tarefas.reduce((soma, tarefa) => {
      if (tarefa.usuario_id === userId) {
        return soma + 1;
      } 
      return soma;      
    }, 0);

    return countTarefas;
  }

  async findTarefasOfCategoria(categoriaId: number) {
    const tarefas = await tarefaRepository.findAll();

    const tarefasOfCategoria = tarefas.filter(tarefa => tarefa.categoria_id === categoriaId);

    return tarefasOfCategoria;
  }

  async findTarefasByStatus(statusDescription: string) {
    const tarefas = await tarefaRepository.findAll();

    const tarefasByStatus = tarefas.filter(tarefa => tarefa.status == statusDescription.toUpperCase());

    return tarefasByStatus;
  }

  async findTarefasByPeriodo(dataInicio: string, dataFinal: string) {
    const tarefas = await tarefaRepository.findAll();

    const tarefasByPeriodo = tarefas.filter(tarefa => tarefa.data_conclusao.toISOString() >= dataInicio && tarefa.data_conclusao.toISOString() <= dataFinal);

    return tarefasByPeriodo;
  }

  async findMostRecentTarefa() {
    const tarefas = await tarefaRepository.findAll();

    const mostRecentTarefa = tarefas.reduce((mostRecent, current) => {
      return current.data_criacao > mostRecent.data_criacao ? current : mostRecent;
    });

    return mostRecentTarefa;
  }

  async findOldestTarefa() {
    const tarefas = await tarefaRepository.findAll();

    const oldestTarefa = tarefas.reduce((oldest, current) => {
      return  oldest.data_criacao > current.data_criacao  ? current : oldest;
    });

    return oldestTarefa;
  }

  async findBiggestDescription() {
    const tarefas = await tarefaRepository.findAll();

    const biggestDescription = tarefas.reduce((biggestDescription, current) => {
      return current.descricao.length > biggestDescription.descricao.length ? current : biggestDescription
    }, { descricao: '' });

    return biggestDescription;
  }

  async findMediaConclusaoTarefas() {
    const tarefas = await tarefaRepository.findAll();

    const conclusaoMinusCriacao = tarefas.reduce((total, current) => {
      const difference = current.data_conclusao.getTime() - current.data_criacao.getTime();

      return total + difference;
    }, 0);

    const milissegundosPorHora = 1000 * 60 * 60;

    const mediaConclusaoMilissegundos = conclusaoMinusCriacao / tarefas.length;

    const mediaConclusaoHoras = mediaConclusaoMilissegundos / milissegundosPorHora;

    return mediaConclusaoHoras.toFixed(2);
  }

  async count() {
    return tarefaRepository.count();
  }
}

export default new TarefaService();