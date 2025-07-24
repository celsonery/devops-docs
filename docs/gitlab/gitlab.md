# Gitlab - CE

### Instalação

#### Reset Root Password

```bash
docker exec -it gitlab bash
```

```bash
gitlab-rails console -e production
```

```bash
user = User.where(id: 1).first
user.password = 'your secret'
user.password_confirmation = 'your secret'
user.save
exit
```

### Backup
```crontab
00 20 * * * docker exec -t gitlab gitlab-backup create SKIP=registry CRON=1
```

### Restore
- Stop the processes that are connected to the database
```bash
docker exec -it <name of container> gitlab-ctl stop puma
docker exec -it <name of container> gitlab-ctl stop sidekiq
```

- Verify that the processes are all down before continuing
```bash
docker exec -it <name of container> gitlab-ctl status
```

- Run the restore. NOTE: "_gitlab_backup.tar" is omitted from the name
```bash
docker exec -it <name of container> gitlab-backup restore BACKUP=16759806511_2023_02_09_14.10.5
```

- Restart the GitLab container
```bash
docker restart <name of container>
```

- Check GitLab
```bash
docker exec -it <name of container> gitlab-rake gitlab:check SANITIZE=true
```

### Update Gitlab
- Realizar o update somente após os backups estiverem terminados

- Conectar na maquina com o usuário Bagarote
- Altere o arquivo docker-compose.yml e adicione a nova versao na imagem docker

```bash
$ docker-compose pull
$ docker-compose up -d
```

- Aguardar o container gitlab ficar em **Healthy**
```bash
$ watch -n2 docker ps
```

Entrar no container gitlab
```bash
$ docker exec -it 
```

### Migração
- Transferir os aquivos abaixo todos com permissao 600

Gitlab
```bash
/opt/gitlab/data/config/gitlab.rb
/opt/gitlab/data/config/gitlab-secrets.json
```

Runner
```bash
/opt/gitlab/runners/shared/config/config.toml
```

### Ativação **SSL**
```
```

### Ativação **Envio de e-mail**
- Editar o arquivo /opt/gitlab/config/gitlab.rb

```bash
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.server"
gitlab_rails['smtp_port'] = 465
# gitlab_rails['smtp_user_name'] = "smtp user"
# gitlab_rails['smtp_password'] = "smtp password"
gitlab_rails['smtp_domain'] = "example.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_openssl_verify_mode'] = 'peer'
```

- Entrar no container gitlab
```bash
$ docker exec -it gitlab bash
```

- Criar as credenciais do email
```bash
# gitlab-rake gitlab:smtp:secret:edit
```

- Apos o editor abrir insira as credenciais
```bash
user_name: 'smtp user'
password: 'smtp password'
```

- Após as configurações feitas, reinicie as configurações do gitlab
```bash
$ gitlab-ctl reconfigure

```

- Documentação oficial
```bash
https://docs.gitlab.com/omnibus/settings/smtp.html
```


### Ativação **Container Registry**
```bash
```

### Ativação **Gitlab-runner**
```bash
```


### Liberar espaço

- Entrar em cada aplicação e remover imagens antigas - Docker

- Script para remover imagens antigas e liberar espaço em disco
```bash
for i in `docker image ls | grep etotem/front | awk '{print $2}' | egrep -v '(dev|hml|latest|v1391|v1601|v1639)'`;do docker image rm "registry.bagarote.com.br/karyon/etotem/front:"$i;done
```

- Script 2 para remover imagens antigas e liberar espaço em disco

- Liberar espaço nos registry - Gitlab

- Limpar artefatos, registros e cache

```bash
sudo gitlab-rake gitlab:cleanup:orphan_job_artifact_files
sudo gitlab-rake gitlab:cleanup:project_uploads
sudo gitlab-rake cache:clear
```

- Remover artefatos antigos de pipelines
```bash
sudo gitlab-rake gitlab:artifacts:cleanup
```

ou rodar sem simulacao
```bash
sudo gitlab-rake gitlab:artifacts:cleanup DRY_RUN=false
```

- Compactar ou rotacionar logs
```bash
sudo gitlab-ctl cleanse
```

- Limpar registros antigos de containers
```bash
docker exec -it gitlab gitlab-ctl registry-garbage-collect
```

- Verificar repositórios grandes
```bash
du -sh /var/opt/gitlab/git-data/repositories/*
```

- Limpar Docker (se estiver usando GitLab Runner com Docker)
```bash
docker system prune
```

- USE COM CUIDADO **este comando limpa tudo**
```bash
docker system prune -a
```
