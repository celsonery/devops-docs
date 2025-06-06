# Postgres no Zabbix

#### Configuração no Postgres

Crie um usuário para o zabbix no postgres
```
CREATE USER zbx_monitor WITH PASSWORD 'xxxxx' INHERIT;
GRANT pg_monitor TO zbx_monitor;

Edite o arquivo **pg_hba.conf**
```
vim /var/lib/pgsql/data/pg_hba.conf
```

Acrescente as linhas abaixo
```
host all zbx_monitor 	127.0.0.1/32 	trust
host all zbx_monitor 	0.0.0.0/0 		md5
host all zbx_monitor 	::0/0 			md5

...
local all
```


Restart o servidor postgresql
```
systemctl restart postgresql.service
```

Teste a conexão com o novo usuário
```
sudo -u postgres --username=zbx_monitor postgres
```

> O sistema não deve pedir senha

> Finalizada a configuração por parte do Postgres


#### Configuração no zabbix_agent

