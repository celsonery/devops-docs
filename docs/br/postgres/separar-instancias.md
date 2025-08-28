# Separar Instâncias PostgreSQL

## Objetivo
Executar múltiplas instâncias PostgreSQL no mesmo servidor, atribuindo limites de CPU e memória para cada uma usando `systemd` + `cgroups`.

---

## 1. Criar diretórios para as instâncias
```bash
sudo mkdir -p /var/lib/postgresql/15-banco_b
sudo chown postgres:postgres /var/lib/postgresql/15-banco_*
```

---

## 2. Inicializar os clusters
```bash
sudo -u postgres /usr/lib/postgresql/15/bin/initdb -D /var/lib/postgresql/15-banco_b
```

---

## 3. Configurar portas e parâmetros
Edite `postgresql.conf` de cada instância:
```bash
nano /var/lib/postgresql/15-banco_b/postgresql.conf
```
Ajuste para:
```conf
port = 5433
logging_collector = on
```

---

## 4. Criar serviços `systemd` para cada instância

### Banco B
```bash
sudo nano /etc/systemd/system/postgresql-banco_b.service
```
Conteúdo:
```ini
[Unit]
Description=PostgreSQL Banco A
After=network.target

[Service]
User=postgres
Group=postgres
ExecStart=/usr/lib/postgresql/15/bin/postgres -D /var/lib/postgresql/15-banco_a
ExecReload=/bin/kill -HUP $MAINPID
KillMode=mixed
TimeoutSec=0
Restart=on-failure
Slice=postgresql-banco-a.slice

[Install]
WantedBy=multi-user.target
```

---

## 5. Criar slices `systemd` para limitar CPU e memória

### Banco B
```bash
sudo nano /etc/systemd/system/postgresql-banco-b.slice
```
Conteúdo:
```ini
[Slice]
CPUQuota=25%
MemoryMax=512M
```

> `CPUQuota=25%` significa que o processo pode usar até 25% de um núcleo de CPU disponível (ou equivalente compartilhado).

---

## 6. Ativar e iniciar as instâncias
```bash
sudo systemctl daemon-reexec
sudo systemctl daemon-reload

sudo systemctl enable --now postgresql-banco_b.service
```

---

## 7. Verificar limites ativos
```bash
systemd-cgtop
```
ou
```bash
systemctl status postgresql-banco_b
```

# Migrar Banco entre Instancias

## Opção 1: Usar pg_dump + pg_restore (recomendado para ambientes controláveis)

- Faça o dump do banco atual (rodando na instância original):

```bash
pg_dump -U postgres -h localhost -p 5432 -Fc -d nome_do_banco > banco.dump
```

- Inicie a nova instância separada (portas diferentes, como 5433).

- Crie o banco de destino na nova instância:

```bash
createdb -U postgres -h localhost -p 5433 nome_do_banco
```
- Restaure o dump:

```bash
pg_restore -U postgres -h localhost -p 5433 -d nome_do_banco banco.dump
```

- Teste tudo antes de liberar em produção. Teste os dados, permissões, usuários, índices, funções, etc.

- Ajuste clientes/aplicações para apontar para a nova porta (ex: 5433).