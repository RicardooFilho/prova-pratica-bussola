import { StatusEnum } from './../enum/status.enum';
import { Categoria } from "./categoria";
import { Usuario } from './usuario';

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  dataCriacao: Date;
  dataConclusao: Date;
  tipo: string;
  categoria: Categoria;
  status: StatusEnum;
  usuarioResponsavel: Usuario;
}