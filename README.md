# App

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário autenticado;
- [ ] Deve ser possível obter o numero de check-ins do usuário autenticado;
- [ ] Deve ser possível o usuario obter o seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possivel validar o check-in de um usuário;
- [ ] Deve ser possivel cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não pode se cadastrar com um e-mail já existente;
- [ ] O usuario não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não funcionais)

- [x] A senha do usuário deve ser armazenada criptografada;
- [ ] Os dados da aplicação precisam ser armazenados em um banco de dados PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas (20 itens por página);
- [ ] O usúario deve ser identificado pelo token JWT (JSON Web Token);
