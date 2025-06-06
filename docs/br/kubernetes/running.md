# Colocando para funcionar

#### Criando imagem Docker local para o container

> Utilizei neste exemplo uma api rest myapp.war feito em SpringBoot para facil entendimento

Crie o arquivo **Dockerfile**
```
FROM alpine
WORKDIR /opt/app
RUN apk update && apk add vim openjdk11-jre
COPY runapp.sh .
CMD ash runapp.sh
```

Construa a imagem docker
```
docker image build -t oregontecnologia/myapp-api:1.0.0 .
```

Transfira a imagem para o dockerhub ou [Crie um servidor de respositório local](server-registry-local.md)
```
docker login

username:
password:

docker push oregontecnologia/myapp-api:1.0.0
```

Verifique se está rodando
```
kubectl get pods -o wide
kubectl get deploy -o wide
```

Crie um container com a imagem criada
```
kubectl create deploy myapp-deploy --image=oregontecnologia/myapp-api:1.0.0
```

Crie um serviço para acesso externo a aplicação
```
kubectl expose deploy myapp-deploy --type=LoadBalancer --external-ip=10.0.10.100 --port=80
```

Para remover a aplicação
```
kubectl delete deploy myapp-deploy
```

### Atualizando e voltando uma versão da aplicação.

Para atualizar a aplicação
```
kubectl set image deployments/myapp-deploy myapp-api=oregontecnologia/myapp-api:1.0.2 --record
```

Para voltar uma atualização
```
kubectl rollout undo deployments/myapp-deploy

```

### Escalando a aplicação

Escalando manualmente 3 replicas do container
```
kubectl scale deploy myapp-deploy --replicas=3
```

Escalando automaticamente iniciando com 2 replicas até 15 réplicas escalando quando a CPU atingir 75% de utilização.
```
kubectl autoscale deploy myapp-deploy --min=2 --max=10 --cpu-percent=75
```

Para verificar o autoscale
```
kubectl get hpa
```

Para remover o autoscale
```
kubectl delete hpa myapp-deploy
```
