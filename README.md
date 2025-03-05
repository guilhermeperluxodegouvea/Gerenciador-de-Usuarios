### **Visão Geral do Projeto:**

Essa API é um sistema de **gestão de usuários** com autenticação segura, usando **Express.js** para o servidor e **Prisma** como ORM para interagir com o banco de dados **MongoDB**. Ele permite realizar o **cadastro** de novos usuários, autenticação por **login**, e oferece **segurança** nas rotas privadas usando **JWT**.

---

### **Tecnologias Usadas:**

-   **Express.js**: Framework para o servidor, responsável por gerenciar as rotas e requisições HTTP.
-   **Prisma**: ORM utilizado para interagir com o **MongoDB**.
-   **MongoDB**: Banco de dados NoSQL usado para armazenar as informações dos usuários; e-mail, nome e senha criptografada.
-   **JWT (JSON Web Token)**: Usado para autenticação e proteção das rotas privadas, garantindo que apenas usuários autenticados possam acessar certos recursos.

---

### **Funcionalidades implementadas:**

1. **Cadastro de usuários:**

    - A senha é **criptografada** usando o pacote **bcrypt**, garantindo que ela nunca seja armazenada em texto claro no banco de dados.
    - A validação é feita no servidor, e os dados são inseridos no banco de dados MongoDB através do **Prisma**.

2. **Login de usuários:**

    - A rota de login faça login fornecendo **e-mail** e **senha**.
    - O sistema busca o usuário no banco de dados, verifica se a senha fornecida corresponde à armazenada usando **bcrypt** e se as credenciais forem válidas um **token JWT** é criado.Esse token é retornado ao cliente, e pode ser usado para autenticar futuras requisições nas rotas privadas.

3. **Autenticação com JWT:**

    - O sistema utiliza **JWT (JSON Web Token)** para proteger as rotas privadas, como a de listagem de usuários.
    - Esse token tem validade de 7 dias.
    - Nas rotas privadas, o token é enviado pelo cliente no cabeçalho da requisição, e o **middleware de autenticação** verifica sua validade, permitindo ou negando o acesso.

4. **Listagem de usuários:**
    - A rota listar-usuarios é uma rota **privada**, ou seja, só pode ser acessada por usuários que possuam um **token JWT válido**.
    - Esta rota lista todos os usuários cadastrados no sistema, excluindo as senhas de cada um, para garantir a segurança.

---

### **Detalhes de Implementação:**

-   **Middleware de Autenticação (auth.js)**: Um middleware que verifica se o **token JWT** está presente e é válido. Se não for, ele retorna um erro de autenticação e impede o acesso a rotas privadas.
-   **Banco de Dados (schema.prisma)**: O banco de dados MongoDB armazena as informações do usuário de forma segura e eficiente. A tabela `User` é configurada para garantir a unicidade do **e-mail** e a segurança das **senhas**.
-   **Servidor (server.js)**: O servidor **Express** está configurado para rodar na porta 3000, servindo arquivos estáticos do front-end e gerenciando as rotas de cadastro, login e listagem de usuários. As rotas privadas são protegidas pelo middleware de autenticação.
