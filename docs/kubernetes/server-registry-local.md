# Criando um repositórios local

## Configurações iniciais
> Realize a configuração no servidor e em todos os nós. 
> OBS.: Configuração somente para teste, usar certificado o conexão TLS para produção.

> Acrescente no arquivo **/etc/docker/daemon.json** host: ip ou nome da maquina onde está o registry e port: a porta :P
```
{
    "insecure-registries": [ "host:port" ]
}
```
> Reinicie o serviço docker
```
# systemctl restart docker
```

## Criar o servidor
> Para criar um servidor local precisamos criar um container com a imagem registry com o nome que desejarmos.

```
$ docker run -d -p 5000:5000 --restart=always --name=repositorio registry

-d                  <- rodar como daemon
-p 5000:5000        <- porta
--restart=always    <- auto reiniciar se falhar
--name=repositorio  <- nome do repositorio
registry            <- imagem docker para o servidor 
```

## Testando se o registry está funcionando
> Aceese via browser
```
http://registry.zion.local:5000/v2/
```

## Tageando uma imagem
Listando as imagens
```
$ docker image ls
```

Tageando a imagem **oregontecnologia/myapp-api**

```
$ docker tag oregontecnologia/myapp-api registry.zion.local:5000/myapp-api
```

Subir a imagem
```
$ docker push registry.zion.local:5000/myapp-api
```

Rodando um container kubernetes com a imagem do servidor local
```
$ kubectl create deploy myapp-api --image=registry.zion.local:5000/myapp-api
```

Verifique se está rodando
```
$ kubectl get pods -o wide
```

# Servidor remoto

### Criando autenticação com htpasswd

Instalando apache2-utils para utilizar htpasswd
```
$ sudo apt install apache2-utils
```
Crie uma pasta auth na pasta home do usuário e entrar nela
```
$ mkdir ~/home-user/auth && cd $_
```

Crie o arquivo registry.password com a flag '-c' adicionando o usuario 'nome_usuario' criptotagrafando com -B
```
$ htpasswd -Bc registry.password nome_usuário
```

Caso queira criar mais usuários não utilizar o '-c'
```
$ htpasswd -B registry.password nome_do_novo_usuário
```

### Autenticando e verificando se está funcionando
```
http://nome-ou-ip-do-servidor:5000/v2
```

## Usando docker-compose.yaml
```
$ vim docker-compose.yml
```

```yaml
version: '3'

services:
  registry:
    image: registry:2
    ports:
    - "5000:5000"
    environment:
      REGISTRY_AUTH: htpasswd
      REGISTRY_AUTH_HTPASSWD_REALM: Registry
      REGISTRY_AUTH_HTPASSWD_PATH: /auth/registry.password
      REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY: /data
    volumes:
      - ./auth:/auth
      - ./data:/data
    restart: always
```

Subindo o serviço registry
```
$ docker-compose up
```