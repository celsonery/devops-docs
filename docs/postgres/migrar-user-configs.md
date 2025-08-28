# Migrate Configs in the PostgreSQL

## Goal
Migrate the same **users, passwords and permissions** of postgresql previews instance to new instance.

---

## Method 1 — Use `pg_dumpall`  to export only globals objects

### 1. Generate global dump of preview instance
In the original server, performe:
```bash
pg_dumpall -U postgres --globals-only > globals.sql
```
This comand export:
- Users (roles)
- Passwords
- Permissions
- Tablespaces
- Configs (`ALTER ROLE`, `ALTER DATABASE`)

---

### 2. Import into new the server/instance
In the new server, run (Adjust to your environment):
```bash
psql -U postgres -h localhost -p 5433 -f globals.sql
```

---

### Be careful
- If user `postgres`  already exists int the new instance, remove the corresponding line in the `globals.sql` before import.
- The `pg_dumpall` include passwords already cyphers,  preserving them as long as the same authentication method (`md5` or `scram-sha-256`) is configured.

---

## Method 2 — Copy the whole cluster with `rsync`

If **the PostgreSQL versions was the same** and there is the possibility of downtime, you can copy the whole cluster, preserving user, databases and configs.

```bash
sudo systemctl stop postgresql
sudo rsync -av /var/lib/postgresql/15/main/ /var/lib/postgresql/15-db_a/
sudo chown -R postgres:postgres /var/lib/postgresql/15-dba_a
```

After the copy, adjust the `postgresql.conf` file and restart the new instance.

---

## Verifing After Migration
In the new instance, connect as superuser and list users:
```sql
\du
```

Test the login with preview user:
```bash
psql -U usuario_test -h localhost -p 5433 -d name_of_database
```

---
**Tip:** Always make backup before any migration and test in the homolog environment before apply to production.
