import { Tarefa } from "./tarefa";

export interface Categoria {
  id: Number;
  nome: String;
  cor: String;
  tarefas: Tarefa[]
}