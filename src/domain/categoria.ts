import { Tarefa } from "./tarefa";

export interface Categoria {
  id: number;
  nome: string;
  cor: string;
  tarefas: Tarefa[]
}