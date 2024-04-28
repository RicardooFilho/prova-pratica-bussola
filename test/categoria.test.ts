import categoriaRepository from "../src/repository/categoria.repository";
import {describe} from "@jest/globals";
import {createCategoryMock} from "./fixtures";
import * as request from "supertest";
import app from "../app";
import categoriaService from "../src/service/categoria.service";

afterEach(async () => {
    await categoriaRepository.deleteAll();
});

describe('Testando endpoints de categorias', () => {
    it('Deve inserir uma categoria no banco de dados', async () => {
       const categoriaMock = createCategoryMock();

        const response = await request.default(app).post('/api/categorias').send(categoriaMock);
        const categoriaFinded = await categoriaService.findAll();

        expect(response.status).toEqual(201);
        expect(response.body.id).toBeDefined();
        expect(categoriaMock.nome).toBe(categoriaFinded[0]?.nome);
        expect(categoriaMock.cor).toBe(categoriaFinded[0]?.cor);
    });

    it('Deve buscar todas as categorias do banco de dados', async () => {
        const categoriaMock = createCategoryMock();

        await request.default(app).post('/api/categorias').send(categoriaMock);

        const response = await request.default(app).get('/api/categorias');
        const categoriasOnDatabase = await categoriaService.count();

        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(categoriasOnDatabase);
    });

    it('Deve atualizar uma catetoria do banco de dados', async () => {
        const categoriaMock = createCategoryMock();

        await request.default(app).post('/api/categorias').send(categoriaMock);

        categoriaMock.nome = "Another name";

        const responseMock = await request.default(app).get('/api/categorias');

        const response = await request.default(app).put(`/api/categorias/${responseMock.body[0].id}`).send(categoriaMock);
        const categoriaFinded = await categoriaService.findAll();

        expect(response.status).toEqual(200);
        expect(categoriaMock.nome).toEqual(categoriaFinded[0].nome);
    });

    it('Deve excluir uma categoria do banco de dados', async () => {
       const categoriaMock = createCategoryMock();

        await request.default(app).post('/api/categorias').send(categoriaMock);

        const responseMock = await request.default(app).get('/api/categorias');

        const response = await request.default(app).delete(`/api/categorias/${responseMock.body[0].id}`);
        const totalOnDatabase = await categoriaService.count();

        expect(response.status).toBe(204);
        expect(response.body.length).toEqual(undefined);
    });
})