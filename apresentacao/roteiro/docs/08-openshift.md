# Openshift

O Openshift é uma ferramenta de orquestração e gerenciamento de containers baseada no kubernetes (“por baixo dos panos” temos o kubernetes) que facilita e adiciona ainda mais inteligência ao seu ambiente. Permitindo que rapidamente você coloque sua aplicação para “rodar” sem muita complexidade. Além de trazer uma série de funções adicionais que o kubernetes por si só, não oferece.


## Procedimento para usar o Openshift

#### Instalação do docker

- Adicionar a chave gpg do docker
```
# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
```

- Adicionar o repositório do docker em **/etc/apt/sources.list.d/docker.list**
```
deb [arch=amd64] https://download.docker.com/linux/debian stretch stable
```

- Atualizar e instalar o docker
```
# apt update 
# apt install docker-ce
```

- Verificar se o docker está instalado
```
docker version
```

- Habilitar o serviço do docker e iniciar
```
# systemctl enable docker
# systemctl start docker
```

#### Instalação do Openshift

- Download do Openshift
```
# wget https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz
```

- Descompactar
```
# tar xvf openshift-origin-client-tools*.tar.gz
```

- Mover o openshift para o **/usr/local/bin/**
```
# mv oc kubectl /usr/local/bin/
```

- Verficando a instalação e versão
```
oc version
```

- Configuração para o Openshift, criar o arquivo **/etc/docker/daemon.json** com o seguinte conteúdo.
```json
{
    "insecure-registries" : [ "127.30.0.0/16" ]
}
```

- Reiniciar o serviço **docker**
```
# systemctl restart docker
```

#### Criando o cluster
```
# oc cluster up --public-hostname=192.168.239.175
```

#### Acessando o console

- Abrir o browser com o IP do servidor:
```
https://192.168.239.175:8443/console
```
# Openshift