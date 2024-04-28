import { Tarefa } from './../domain/tarefa';
import prisma from '../../prisma';
import { Usuario } from '../domain/usuario';

class UsuarioRepository{
  async findAll() {
    return prisma.usuario.findMany();
  }

  async create(usuario: Usuario) {
    return prisma.usuario.create({
      data: {
        username: usuario.username,
        peso: usuario.peso,
        senha: usuario.senha,
        email: usuario.email
      }
    });
  }

  async update(id: number, usuario: Usuario) {
    return prisma.usuario.update({
      where: {id: id},
      data: {
        username: usuario.username,
        peso: usuario.peso,
        senha: usuario.senha,
        email: usuario.email,
      }
    });
  }

  async delete(id: number) {
    await prisma.usuario.delete({
      where: {id: id}
    });
  }

  async deleteAll() {
    await prisma.usuario.deleteMany()
  }

  async count() {
    return prisma.usuario.count();
  }
}

export default new UsuarioRepository();
