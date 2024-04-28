import {describe} from "@jest/globals";
import app from "../app";
import * as request from 'supertest'
import usuarioRepository from "../src/repository/usuario.repository";
import usuarioService from "../src/service/usuario.service";
import {createUserMock} from "./fixtures";

afterEach(async () => {
   await usuarioRepository.deleteAll();
});

describe('Testando endpoints de usuários', () => {
    it('Deve inserir um usuário no banco de dados', async () => {
        const usuarioMock = createUserMock();

        const response = await request.default(app).post('/api/usuarios').send(usuarioMock);
        const usuarioFinded = await usuarioService.findOne(response.body.id)

        expect(response.status).toEqual(201);
        expect(response.body.id).toBeDefined();
        expect(usuarioMock.username).toBe(usuarioFinded?.username);
        expect(usuarioMock.peso).toBe(usuarioFinded?.peso);
        expect(usuarioMock.senha).toBe(usuarioFinded?.senha);
        expect(usuarioMock.email).toBe(usuarioFinded?.email);
    });

    it('Deve recuperar todos os usuários do banco de dados', async () => {
        const usuarioMock = createUserMock();

        await request.default(app).post('/api/usuarios').send(usuarioMock);

        const response = await request.default(app).get('/api/usuarios');
        const usuariosOnDatabase = await usuarioService.count();

        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(usuariosOnDatabase);
    })

    it('Deve atualizar um usuário do banco de dados', async () => {
        const usuarioMock = createUserMock();

        await request.default(app).post('/api/usuarios').send(usuarioMock);

        usuarioMock.username = "Another Name";

        const responseMock = await request.default(app).get('/api/usuarios');

        const response = await request.default(app).put(`/api/usuarios/${responseMock.body[0].id}`).send(usuarioMock);
        const usuarioFinded = await usuarioService.findOne(response.body.id);

        expect(response.status).toEqual(200);
        expect(usuarioMock.username).toBe(usuarioFinded?.username);
    })

    it('Deve excluir um usuário do banco de dados', async() => {
        const usuarioMock = createUserMock();

        await request.default(app).post('/api/usuarios').send(usuarioMock);

        const responseMock = await request.default(app).get('/api/usuarios');

        const response = await request.default(app).delete(`/api/usuarios/${responseMock.body[0].id}`);
        const totalOnDataBase = await usuarioService.count();

        expect(response.status).toBe(204);
        expect(response.body.length).toEqual(undefined);
    })
})