import { Tarefa } from "./tarefa";

export interface Usuario {
  id: number;
  username: string;
  peso: number;
  senha: string;
  email: string;
  tarefas: Tarefa[];
}