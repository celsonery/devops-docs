Apresentação
---
- Apresentação de Docker

- O Início
	- Virtualização
	- Maquina Virtual
	- Container

- Virtual Machine
	- O que são VMS
	- Hypervisor
		- O que é hypervisor
		- Tipos de hypervisor (Tipo 1 / Tipo 2)

- Containers
	- O que são
	- Tipos ( de Serviços e de Aplicação )

- Breve comparação
	- 

- Docker
	- 

- Kubernetes
	- Minikube
	- Openshift

	
===


Prática
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

- Rede no docker
	

- Aplicação no container
	- 12factor app


Kubernetes

-- Testando a bagaça
	- testando com imagens publicas
	- testando com imagens próprias
		- imagem no dockerhub
		
	- criando servidor de imagem local
		- subindo imagem para o servidor

	- criando um container com a imagem criada
	- criando um serviço para acesso externo
	
- Atualizando a app
- Voltando a app

- Escalando a app
	- manualmente
	- automaticamente


