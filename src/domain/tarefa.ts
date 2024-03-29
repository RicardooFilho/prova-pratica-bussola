import { StatusEnum } from './../enum/status.enum';
import { Categoria } from "./categoria";
import { Usuario } from './usuario';

export interface Tarefa {
  id: Number;
  titulo: String;
  descricao: String;
  dataCriacao: Date;
  dataConclusao: Date;
  tipo: String;
  categoria: Categoria;
  status: StatusEnum;
  usuarioResponsavel: Usuario;
}