import usuarioRepository from '../repository/usuario.repository';
import { Usuario } from './../domain/usuario';

class UsuarioService {
  async createOne(usuario: Usuario) {
     return usuarioRepository.create(usuario);
  }

  async findAll() {
     return usuarioRepository.findAll();
  }

  async findOne(id: number) {
    const usuarios = await usuarioRepository.findAll();

    const usuario = usuarios.find(usuario => usuario.id === id);

    return usuario;
  }

  async updateOne(id: number, usuario: Usuario) {
    return usuarioRepository.update(id, usuario);
  }

  async deleteOne(id: number) {
    await usuarioRepository.delete(id);
  }

  async deleteAll() {
    await usuarioRepository.deleteAll();
  }

  async count() {
    return usuarioRepository.count();
  }
}

export default new UsuarioService();