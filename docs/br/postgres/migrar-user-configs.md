# Migração de Configs no PostgreSQL

## Objetivo
Reproduzir os **mesmos usuários, senhas e permissões** da instância PostgreSQL antiga em uma nova instância.

---

## Método 1 — Usar `pg_dumpall` para Exportar Apenas Objetos Globais

### 1. Gerar o dump global da instância antiga
No servidor original, execute:
```bash
pg_dumpall -U postgres --globals-only > globals.sql
```
Esse comando exporta:
- Usuários (roles)
- Senhas
- Permissões
- Tablespaces
- Configurações específicas (`ALTER ROLE`, `ALTER DATABASE`)

---

### 2. Importar no novo servidor/instância
No servidor novo, execute (ajustando porta conforme necessário):
```bash
psql -U postgres -h localhost -p 5433 -f globals.sql
```

---

### Cuidados
- Se o usuário `postgres` já existir na nova instância, remova a linha correspondente no `globals.sql` antes de importar.
- O `pg_dumpall` inclui as senhas já criptografadas, preservando-as desde que o método de autenticação (`md5` ou `scram-sha-256`) esteja configurado.

---

## Método 2 — Copiar o cluster inteiro com `rsync`

Se **as versões do PostgreSQL forem iguais** e houver possibilidade de downtime, você pode copiar todo o cluster, preservando usuários, bancos e configurações.

```bash
sudo systemctl stop postgresql
sudo rsync -av /var/lib/postgresql/15/main/ /var/lib/postgresql/15-banco_a/
sudo chown -R postgres:postgres /var/lib/postgresql/15-banco_a
```

Após a cópia, ajuste o `postgresql.conf` e reinicie apenas a nova instância.

---

## Verificação Pós-Migração
Na nova instância, conecte-se como superusuário e liste os usuários:
```sql
\du
```

Teste o login de usuários antigos:
```bash
psql -U usuario_teste -h localhost -p 5433 -d nome_do_banco
```

---
**Dica:** Sempre faça backup antes de qualquer migração e teste em ambiente de homologação antes de aplicar em produção.
