import { Router } from 'express';

import categoriaController from './src/controller/categoria.controller';
import usuarioController from './src/controller/usuario.controller';
import tarefaController from './src/controller/tarefa.controller';

const routes = Router();

routes.post('/api/usuarios', usuarioController.createOne);
routes.get('/api/usuarios', usuarioController.findAll);
routes.put('/api/usuarios/:id', usuarioController.updateOne);
routes.delete('/api/usuarios/:id', usuarioController.deleteOne);

routes.post('/api/categorias', categoriaController.createOne);
routes.get('/api/categorias', categoriaController.findAll);
routes.put('/api/categorias/:id', categoriaController.updateOne);
routes.delete('/api/categorias/:id', categoriaController.deleteOne);

routes.post('/api/tarefas', tarefaController.createOne);
routes.get('/api/tarefas', tarefaController.findAll);
routes.get('/api/tarefas/:id', tarefaController.findOne);
routes.get('/api/tarefas/user/:id', tarefaController.findTarefasOfUser);
routes.get('/api/tarefas/user/count/:id', tarefaController.countOfUserTarefas);
routes.put('/api/tarefas/:id', tarefaController.updateOne);
routes.delete('/api/tarefas/:id', tarefaController.deleteOne);


export { routes };