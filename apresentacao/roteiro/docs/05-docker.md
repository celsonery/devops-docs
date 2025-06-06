# Docker

- Imagens: 
	Uma imagem docker, nada mais é que um template (read-only) que contém todas as informações que o container carregará em sua execução como por exemplo o SO. "Classe"

- Container: 
	São espaços que permitem a execução de aplicações de forma encapsulada, num mesmo SO, as bibliotecas da aplicação e a própria aplicação.
	"Instancia"

- Registries: 
	São repositórios de imagens que podem ser públicos ou privados.

- Dockerfile: 
	É um aquivo texto que possui uma série de comandos necessários para criação de uma imagem seguindo uma estrutura pré-definida.

- Dockerhub
	É o repositório publico e principal das imagens de Dockers.
	
#### Dockerfile exemplo

```
FROM centos:latest
MAINTAINER Celso Nery
RUN yum -y install httpd
CMD ["/usr/sbin/httpd","-D","FOREGROUND"]
EXPOSE 80
```

## Prática
- Instalar docker
- Rodar um container exemplo
- Criar uma imagem com uma aplicação [ Commit e Dockerfile ]
- Rodar um container com a imagem criada.
- Entrar no container para alterar algo.
- Atualizar a imagem.

---
- instalação ( linux / windows / Mac )
- comandos básicos
	- gerenciando imagens
		- docker image ls / list
		- docker image inspect <image>
		- docker image rm <image> / rmi <image>

	- gerenciando containers
		- docker container ps "Lista os em execução"
		- docker container ls <param>
			- a "Lista todos, inclusive os desligados"
			- l "Lista os ultimos, inclusive os desligados"
			- n "Lista os N containers, inclusive os desligados"
			- q "Lista somente os ids"
		- docker container stop <container>
		- docker container start <container>
		- docker container prune "Remove todos os containers"
		- docker image prune "Remove todas as imagens"
		- docker volume prune "Remove todos os volumes"
		- docker ps -f "Mostra containers parados"
		- docker exec -it <container> bash "Acessar o terminal do container"
		
		- docker <container> run <param> <image> <cmd> <args>
			- d "Execução em background"
			- i "Modo interativo"
			- t "Aloca um pseudo TTY"
			- rm "Remova automaticamente o container ao final"
			- name "Nomeia o container"
			- v "Mapeia volume"
			- p "Mapeia a porta"
			- m "Limita a memória"
			- c "Balanceia a CPU"


- Criando imagens
	- criando com commit
	- criando com dockerfiles
	- subindo para o dockerhub

- Armazenamento no docker
	- criando volumes
	- anexando volumes ao container

