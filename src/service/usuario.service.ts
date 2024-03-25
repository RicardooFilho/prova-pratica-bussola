import usuarioRepository from '../repository/usuario.repository';
import { Usuario } from './../domain/usuario';

class UsuarioService {
  async createOne(usuario: Usuario) {
     return usuarioRepository.create(usuario);
  }

  async findAll() {
     return usuarioRepository.findAll();
  }

  async updateOne(id: number, usuario: Usuario) {
    return usuarioRepository.update(id, usuario);
  }

  async deleteOne(id: number) {
    await usuarioRepository.delete(id);
  }
}

export default new UsuarioService();