import {status} from '@prisma/client';
import prisma from "../../prisma";
import {Tarefa} from "../domain/tarefa";

class TarefaRepository {
  async findAll() {
    return prisma.tarefa.findMany();
  }

  async create(tarefa: Tarefa) {
    return prisma.tarefa.create({
      data: {
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        data_criacao: tarefa.dataCriacao,
        data_conclusao: tarefa.dataConclusao,
        tipo: tarefa.tipo,
        categoria: tarefa.categoria? { connect: { id: tarefa.categoria.id}}: undefined,
        status: tarefa.status as unknown as status,
        usuario: { connect: { id: tarefa.usuarioResponsavel.id}}
      }
    });
  }

  async update(id: number, tarefa: Tarefa) {
    return prisma.tarefa.update({
      where: {id: id},
      data: {
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        data_criacao: tarefa.dataCriacao,
        data_conclusao: tarefa.dataConclusao,
        tipo: tarefa.tipo,
        categoria: tarefa.categoria? { connect: { id: tarefa.categoria.id}}: undefined,
        status: tarefa.status as unknown as status,
        usuario: { connect: { id: tarefa.usuarioResponsavel.id}}  
      }
    });
  }

  async delete(id: number) {
    await prisma.tarefa.delete({
      where: {id: id}
    });
  }
}

export default new TarefaRepository();
