# Kubernetes

## O que é?

Desenvolvido pelo Google, tem ganhado bastante espaço na comunidade, o Kubernetes ou simplesmente (K8S) é um poderoso **ORQUESTRADOR** de containers que permite abstrair dos usuários toda complexidade de gerenciar múltiplos containers e mantê-los online.

O Kubernetes é um sistema distribuído e, por isso, roda em um cluster onde os hosts ficam disponíveis para executar os containers. Ou seja, o Kubernetes realiza todo o gerenciamento dos containers realizando o melhor esforço para mantê-los operacionais. Caso haja alguma perturbação no cenário, o Kubernetes se encarrega de realizar as operações necessárias de forma a manter a aplicação online.

Normalmente, o Kubernetes é utilizado junto com um serviço de cloud. O Google Cloud Platform, AWS e Azure são exemplos de serviços de cloud compatíveis com Kubernetes. No entanto, o Kubernetes pode ser instalado em seu cluster próprio.

---

## Preparacao

	- entendendo 
        - master
        - nodes
        - pods
        - deployment
        - services
        - etcd
        - registry

	- montagem cluster

- instalação
- iniciação no mestre
- ingressão no slaves

- Vantagens:
    - Atualização
    - Rollback
    - Escalonamento
    - Escalonamento automático

## Pratica
- Instalar docker
- Instalar kubernetes

- testando com imagens publicas do dockerhub
- criando um serviço para acesso externo

- criando servidor de imagem local
- subindo imagem para o servidor
- testando com imagens próprias

- criando um container com a imagem criada
- criando um serviço para acesso externo

- Atualizando a imagem criada
- Atualizando o container com a imagem nova [ on-the-fly ]

- Rollback do container on-the-fly

- Escalonando manualmente
- Escalonando automaticamente
