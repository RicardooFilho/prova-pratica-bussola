import { Tarefa } from "./tarefa";

export interface Usuario {
  id: Number;
  username: String;
  peso: Number;
  senha: String;
  email: String;
  tarefas: Tarefa[];
}