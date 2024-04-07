Projeto que representa a prova prática do professor Bussola

check-list: 
[x] - Entender a atividade, isso envolve ler a atividade 
[x] - Instalar as dependencias 
[] - Opcional - Criar um dockerfile e um docker-compose.yml pra criar o container do banco escolhido 
[x] - Da um check se o servidor está funcionando 
[x] - Criar a service para a entidade escolhida, e fazer o CRUD 
[x] - Fazer a controller
[x] - Criar as rotas no arquivo de rotas 
[] - Testar as rotas 
[] - Partir para as rotas com regra de negócio

Entidades:

[x] Usuário: Atributos: ID, username, peso, senha, e-mail.

[x] Categoria: Atributos: ID, nome, cor (para identificação visual).

[x] Tarefa: Atributos: ID, título, descrição, data de criação, data de conclusão, tipo, categoria (opcional), status (pendente, em andamento, concluída), e usuário associado.

[] Requisitos das Rotas (OPICIONAL - FAÇA POR ÚLTIMO):

Autenticação:

[] Rota de registro de usuário. Rota de login de usuário.

[x] Tarefas:

[x] Rota para criação de uma nova tarefa.
[x] Rota para listar todas as tarefas de um usuário. 
[x] Rota para obter detalhes de uma tarefa específica. 
[x] Rota para atualizar uma tarefa existente. 
[x] Rota para excluir uma tarefa.

[x] Categorias:

[x] Rota para criação de uma nova categoria. 
[x] Rota para listar todas as categorias de um usuário. 
[x] Rota para obter detalhes de uma categoria específica. 
[x] Rota para atualizar uma categoria existente. 
[x] Rota para excluir uma categoria.

[] Funcionalidades Adicionais utilizando Métodos de Array:

[x] Rota para filtrar tarefas por categoria.
[x] Rota para listar tarefas concluídas / pendentes.
[x] Rota para listar tarefas que vencem em um determinado período.
[x] Rota para contar o número total de tarefas de um usuário.
[x] Rota para encontrar a tarefa mais recente de um usuário.

[x] Rota para encontrar a tarefa com a descrição mais longa.
[x] Rota para encontrar a tarefa mais antiga de um usuário.
[x] Rota para calcular a média de conclusão das tarefas.
[] Rota para agrupar tarefas por categoria.

Observação: Estas rotas podem ser implementadas utilizando os métodos: 
[x] .map, 
[x] .filter,
[x] .reduce,
[] .resume, 
[] .some 
[] e outros métodos de manipulação de array 

[] Certifique-se de implementar as devidas verificações de segurança e validação dos dados em cada rota.
