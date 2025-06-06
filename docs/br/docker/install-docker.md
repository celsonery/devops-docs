# Instalação docker no Debian 9 / 10

Atualize o sistema

> Utilize o "sudo" antes dos comandos caso esteja fazendo como usuário comum.
```bash
# apt update
# apt upgrade
```

Instale pacotes necessários para a instalação.
```bash
# apt install curl gnupg2 apt-transport-https software-properties-common ca-certificates
```

Adicione repositório do Docker no Debian
```bash
# curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/trusted.gpg.d/docker.gpg
```

Crie o arquivo: **/etc/apt/sources.list.d/docker.list**

Debian 12 - Bookwarm
```bash
deb [arch=amd64 signed-by=/etc/apt/trusted.gpg.d/docker.gpg] https://download.docker.com/linux/debian bookworm stable
```

## Caso for usar o gerenciamento de containers via docker runtime:
> Se preferir usar o **containerd** como gerenciador de containers continue para [kubernetes instalação](../kubernetes/install-kubernetes.md).


instale o docker
> Caso tenha problemas ao executar um container instale a versão anterior [18.06.0]
```bash
# apt update
# apt install docker-ce

ou 

# apt install docker-ce=18.06.0~ce~3-0~debian
```

Configure o daemon
Crie o arquivo **/etc/docker/daemon.json**
```json
{
    "exec-opts": ["native.cgroupdriver=systemd"],
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "100m"
        },
    "storage-driver": "overlay2"
}
```

Crie o diretorio **/etc/systemd/system/docker.service.d**
```bash
# mkdir -p /etc/systemd/system/docker.service.d
```

Reinicie o serviço Docker Daemon
```bash
systemctl daemon-reload
systemctl restart docker
```

De permissão para usuário comum usar containers
```bash
# usermod -aG docker $USER
```

Verifique se o docker está funcionando.
```bash
$ docker version
```

Deve aparecer algo parecido com:
```bash
Client:
 Version:           18.06.0-ce
 API version:       1.38
 Go version:        go1.10.3
 Git commit:        0ffa825
 Built:             Wed Jul 18 19:09:33 2018
 OS/Arch:           linux/amd64
 Experimental:      false

Server:
 Engine:
  Version:          18.06.0-ce
  API version:      1.38 (minimum version 1.12)
  Go version:       go1.10.3
  Git commit:       0ffa825
  Built:            Wed Jul 18 19:07:38 2018
  OS/Arch:          linux/amd64
  Experimental:     false
```

Executando o primeiro docker
```bash
$ docker run hello-world
```

ou imagem melhor para teste httpd

```bash
$ docker run --rm -p 80:80 httpd
```

Para verificar se a imagem funcionou basta acessar via browser o ip da maquina host.
```bash
http://127.0.0.1
```
