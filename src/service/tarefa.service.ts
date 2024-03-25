import { Tarefa } from '../domain/tarefa';
import tarefaRepository from '../repository/tarefa.repository';

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
}

export default new TarefaService();