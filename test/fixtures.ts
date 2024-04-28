import {Usuario} from "../src/domain/usuario";
import {Categoria} from "../src/domain/categoria";
import {Tarefa} from "../src/domain/tarefa";
import {StatusEnum} from "../src/enum/status.enum";

const currentDate = new Date();

export const createUserMock = (): Usuario => {
    return {
        id: 1,
        username: "User Test",
        peso: 76,
        senha: "Password Test",
        email: "emailtest@gmail.com",
        tarefas: []
    };
};

export const createCategoryMock = (): Categoria => {
    return {
        id: 1,
        nome: "Work",
        cor: "Green",
        tarefas: []
    };
};

export const createTaskMock = (): Tarefa => {
    return {
        id: 1,
        titulo: "Title Test",
        descricao: "Description Test",
        dataCriacao: currentDate,
        dataConclusao: currentDate,
        tipo: "Test",
        categoria: createCategoryMock(),
        status: StatusEnum.CONCLUIDA,
        usuarioResponsavel: createUserMock()
    };
};

