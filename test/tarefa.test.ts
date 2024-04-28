import tarefaRepository from "../src/repository/tarefa.repository";
import {createCategoryMock, createTaskMock, createUserMock} from "./fixtures";
import * as request from 'supertest'
import app from "../app";
import tarefaService from "../src/service/tarefa.service";
import usuarioRepository from "../src/repository/usuario.repository";
import categoriaRepository from "../src/repository/categoria.repository";
import categoriaController from "../src/controller/categoria.controller";

beforeEach(async () => {
   await usuarioRepository.create(createUserMock());
   await categoriaRepository.create(createCategoryMock());
});

afterEach(async () => {
   await tarefaRepository.deleteAll();
   await usuarioRepository.deleteAll();
   await categoriaRepository.deleteAll();
});

describe('Testando endpoints de tarefas', () => {
    it('Deve inserir uma tarefa no banco de dados', async () => {
        const tarefaMock = createTaskMock();

        const categorias = await categoriaRepository.findAll();
        tarefaMock.categoria.id = categorias[0].id;

        const usuarios = await usuarioRepository.findAll();
        tarefaMock.usuarioResponsavel.id = usuarios[0].id;

        const response =  await request.default(app).post('/api/tarefas').send(tarefaMock);
        const tarefaFinded = await tarefaService.findOne(response.body.id);

        expect(response.status).toEqual(201);
        expect(response.body.id).toBeDefined();
        expect(tarefaMock.titulo).toBe(tarefaFinded?.titulo);
        expect(tarefaMock.descricao).toBe(tarefaFinded?.descricao);
        expect(tarefaMock.dataCriacao).toStrictEqual(tarefaFinded?.data_criacao);
        expect(tarefaMock.dataConclusao).toStrictEqual(tarefaFinded?.data_conclusao);
        expect(tarefaMock.tipo).toBe(tarefaFinded?.tipo);
        expect(tarefaMock.categoria.id).toBe(tarefaFinded?.categoria_id);
        expect(tarefaMock.status).toBe(tarefaFinded?.status);
        expect(tarefaMock.usuarioResponsavel.id).toBe(tarefaFinded?.usuario_id);
    });

    it('Deve buscar todas as tarefas no banco de dados', async() => {
        const tarefaMock = createTaskMock();

        const categorias = await categoriaRepository.findAll();
        tarefaMock.categoria.id = categorias[0].id;

        const usuarios = await usuarioRepository.findAll();
        tarefaMock.usuarioResponsavel.id = usuarios[0].id;

        await request.default(app).post('/api/tarefas').send(tarefaMock);

        const response = await request.default(app).get('/api/tarefas');
        const totalOnDatabase = await tarefaService.count();

        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(totalOnDatabase);
    });

    it('Deve atualizar uma tarefa do banco de dedos', async() => {
        const tarefaMock = createTaskMock();

        const categorias = await categoriaRepository.findAll();
        tarefaMock.categoria.id = categorias[0].id;

        const usuarios = await usuarioRepository.findAll();
        tarefaMock.usuarioResponsavel.id = usuarios[0].id;

        await request.default(app).post('/api/tarefas').send(tarefaMock);

        const responseMock = await request.default(app).get('/api/tarefas');

        tarefaMock.titulo = "Another Title";

        const response = await request.default(app).put(`/api/tarefas/${responseMock.body[0].id}`).send(tarefaMock);
        const tarefaFinded = await tarefaService.findOne(response.body.id);

        expect(response.status).toEqual(200);
        expect(tarefaMock.titulo).toBe(tarefaFinded?.titulo);
    });

    it('Deve excluir uma tarefa do banco de dados', async() => {
        const tarefaMock = createTaskMock();

        const categorias = await categoriaRepository.findAll();
        tarefaMock.categoria.id = categorias[0].id;

        const usuarios = await usuarioRepository.findAll();
        tarefaMock.usuarioResponsavel.id = usuarios[0].id;

        await request.default(app).post('/api/tarefas').send(tarefaMock);

        const responseMock = await request.default(app).get('/api/tarefas');

        const response = await request.default(app).delete(`/api/tarefas/${responseMock.body[0].id}`);
        const totalOnDatabase = await tarefaService.count();

        expect(response.status).toBe(204);
        expect(response.body.length).toEqual(undefined);
    });

    it('Deve buscar uma tarefa pelo id do usuário', async() => {
        const tarefaMock = createTaskMock();

        const categorias = await categoriaRepository.findAll();
        tarefaMock.categoria.id = categorias[0].id;

        const usuarios = await usuarioRepository.findAll();
        tarefaMock.usuarioResponsavel.id = usuarios[0].id;

        await request.default(app).post('/api/tarefas').send(tarefaMock);

        const response = await request.default(app).get(`/api/tarefas/user/${usuarios[0].id}`);
        const tarefaFinded = await tarefaService.findAll();

        expect(response.status).toBe(200);
        expect(tarefaMock.usuarioResponsavel.id).toBe(tarefaFinded[0].usuario_id);
    });

    it('Deve buscar quantidade de tarefas de um usuário', async () => {
        const tarefaMock = createTaskMock();

        const categorias = await categoriaRepository.findAll();
        tarefaMock.categoria.id = categorias[0].id;

        const usuarios = await usuarioRepository.findAll();
        tarefaMock.usuarioResponsavel.id = usuarios[0].id;

        await request.default(app).post('/api/tarefas').send(tarefaMock);

        const response = await request.default(app).get(`/api/tarefas/user/count/${usuarios[0].id}`);

        expect(response.status).toBe(200);
        expect(response.body).toBe(1);
    });

    it('Deve encontrar tarefas pelo id da categoria', async () => {
        const tarefaMock = createTaskMock();

        const categorias = await categoriaRepository.findAll();
        tarefaMock.categoria.id = categorias[0].id;

        const usuarios = await usuarioRepository.findAll();
        tarefaMock.usuarioResponsavel.id = usuarios[0].id;

        await request.default(app).post('/api/tarefas').send(tarefaMock);

        const response = await request.default(app).get(`/api/tarefas/categoria/${categorias[0].id}`);
        const tarefaFinded = await tarefaService.findAll();

        expect(response.status).toBe(200);
        expect(tarefaMock.categoria.id).toBe(tarefaFinded[0].categoria_id);
    });

    it('Deve encontrar tarefas pelo status', async() => {
        const tarefaMock = createTaskMock();

        const categorias = await categoriaRepository.findAll();
        tarefaMock.categoria.id = categorias[0].id;

        const usuarios = await usuarioRepository.findAll();
        tarefaMock.usuarioResponsavel.id = usuarios[0].id;

        await request.default(app).post('/api/tarefas').send(tarefaMock);

        const responseMock = await request.default(app).get('/api/tarefas');

        const response = await request.default(app).get(`/api/tarefas/status?description=${tarefaMock.status.toString()}`);
        const tarefaFinded = await tarefaService.findAll();

        expect(response.status).toBe(200);
        expect(responseMock.body[0].id).toBe(tarefaFinded[0].id);
    });

    it('Deve buscar tarefa entre data início e data fim', async() => {
        const tarefaMock = createTaskMock();
        const tarefaMock2 = createTaskMock();

        const categorias = await categoriaRepository.findAll();
        tarefaMock.categoria.id = categorias[0].id;

        const usuarios = await usuarioRepository.findAll();
        tarefaMock.usuarioResponsavel.id = usuarios[0].id;

        await request.default(app).post('/api/tarefas').send(tarefaMock);

        tarefaMock2.titulo = "Past Task";
        tarefaMock2.dataConclusao = new Date(1990, 3 ,10);
        tarefaMock2.usuarioResponsavel.id = usuarios[0].id;
        tarefaMock2.categoria.id = categorias[0].id;

        await request.default(app).post('/api/tarefas').send(tarefaMock2);

        const responseMock = await request.default(app).get('/api/tarefas');

        const response = await request.default(app).get('/api/tarefas/data/periodo?inicio=1989-1-1T00:00:00.000Z&final=1992-1-1T00:00:00.000Z');

        expect(response.status).toBe(200);
        expect(response.body[0].id).toBe(responseMock.body[1].id)
    });

    it('Deve buscar a tarefa com data de criacao mais recente', async () => {
        const tarefaMock = createTaskMock();
        const tarefaMock2 = createTaskMock();

        const categorias = await categoriaRepository.findAll();
        tarefaMock.categoria.id = categorias[0].id;

        const usuarios = await usuarioRepository.findAll();
        tarefaMock.usuarioResponsavel.id = usuarios[0].id;

        await request.default(app).post('/api/tarefas').send(tarefaMock);

        tarefaMock2.titulo = "Past Task";
        tarefaMock2.dataCriacao = new Date(1990, 3 ,10);
        tarefaMock2.usuarioResponsavel.id = usuarios[0].id;
        tarefaMock2.categoria.id = categorias[0].id;

        await request.default(app).post('/api/tarefas').send(tarefaMock2);

        const responseMock = await request.default(app).get('/api/tarefas');

        const response = await request.default(app).get('/api/tarefas/data/recente');

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(responseMock.body[0].id)
    });

    it('Deve buscar a tarefa com data de criação mais antiga', async() => {
        const tarefaMock = createTaskMock();
        const tarefaMock2 = createTaskMock();

        const categorias = await categoriaRepository.findAll();
        tarefaMock.categoria.id = categorias[0].id;

        const usuarios = await usuarioRepository.findAll();
        tarefaMock.usuarioResponsavel.id = usuarios[0].id;

        await request.default(app).post('/api/tarefas').send(tarefaMock);

        tarefaMock2.titulo = "Past Task";
        tarefaMock2.dataCriacao = new Date(1990, 3 ,10);
        tarefaMock2.usuarioResponsavel.id = usuarios[0].id;
        tarefaMock2.categoria.id = categorias[0].id;

        await request.default(app).post('/api/tarefas').send(tarefaMock2);

        const responseMock = await request.default(app).get('/api/tarefas');

        const response = await request.default(app).get('/api/tarefas/data/antiga');

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(responseMock.body[1].id)
    });

    it('Deve retornar tarefa com maior descrição', async () => {
        const tarefaMock = createTaskMock();
        const tarefaMock2 = createTaskMock();

        const categorias = await categoriaRepository.findAll();
        tarefaMock.categoria.id = categorias[0].id;

        const usuarios = await usuarioRepository.findAll();
        tarefaMock.usuarioResponsavel.id = usuarios[0].id;

        await request.default(app).post('/api/tarefas').send(tarefaMock);

        tarefaMock2.descricao = "Biggest Description Biggest Description Biggest Description Biggest Description";
        tarefaMock2.usuarioResponsavel.id = usuarios[0].id;
        tarefaMock2.categoria.id = categorias[0].id;

        await request.default(app).post('/api/tarefas').send(tarefaMock2);

        const responseMock = await request.default(app).get('/api/tarefas');

        const response = await request.default(app).get('/api/tarefas/descricao/tamanho');

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(responseMock.body[1].id);
    });

    it('Deve retornar a média de conclusão das tarefas', async() => {
        const tarefaMock = createTaskMock();
        const tarefaMock2 = createTaskMock();

        const categorias = await categoriaRepository.findAll();
        tarefaMock.categoria.id = categorias[0].id;

        const usuarios = await usuarioRepository.findAll();
        tarefaMock.usuarioResponsavel.id = usuarios[0].id;

        tarefaMock.dataCriacao = new Date(2024, 3, 10, 8, 0, 0);
        tarefaMock.dataConclusao = new Date(2024, 3, 10, 18, 0, 0);


        await request.default(app).post('/api/tarefas').send(tarefaMock);

        tarefaMock2.usuarioResponsavel.id = usuarios[0].id;
        tarefaMock2.categoria.id = categorias[0].id;
        tarefaMock2.dataCriacao = new Date(2024, 3, 11, 18, 0, 0);
        tarefaMock2.dataConclusao = new Date(2024, 3, 11, 23, 0, 0);

        await request.default(app).post('/api/tarefas').send(tarefaMock2);

        const response = await request.default(app).get('/api/tarefas/media/conclusao');

        expect(response.status).toBe(200);
        expect(response.body).toBe("7.50");
    });
});