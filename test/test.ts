import {describe} from "@jest/globals";
import app from "../app";
import * as request from 'supertest'
import usuarioRepository from "../src/repository/usuario.repository";
import usuarioService from "../src/service/usuario.service";


describe('Testando endpoints de usuários', () => {
    it('Deve inserir um usuário no banco de dados', async () => {
        const usuarioMock = {
            username: "Fulano",
            peso: 20,
            senha: "senha1",
            email: "fulano@outlook.com"
        }

        const response = await request.default(app).post('/api/usuarios').send(usuarioMock);
        const usuarioFinded = await usuarioService.findOne(response.body.id)

        expect(response.status).toEqual(201);
        expect(response.body.id).toBeDefined();
        expect(usuarioMock.username).toBe(usuarioFinded?.username);
        expect(usuarioMock.peso).toBe(usuarioFinded?.peso);
        expect(usuarioMock.senha).toBe(usuarioFinded?.senha);
        expect(usuarioMock.email).toBe(usuarioFinded?.email);
    })

    it('Deve recuperar todos os usuários do bando de dados', async () => {
        const response = await request.default(app).get('/api/usuarios')
        const usuariosOnDatabase = await usuarioService.count();

        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(usuariosOnDatabase);
    })

    it('Deve atualizar um usuário do banco de dados', async () => {



    })
})