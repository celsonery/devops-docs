# Commandos

minkube manual

Iniciando cluster kubernetes - minikube
=======================================
```bash
minikube version
minikube start

kubectl version
kubectl cluster-info
kubectl get nodes
```

Deploy de uma aplicacao - minikube
=======================================
```bash
kubectl run kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1 --port=8080

kubectl get deployments

kubectl proxy

export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')
echo Name of the Pod: $POD_NAME

curl http://localhost:8001/api/v1/namespaces/default/pods/$POD_NAME/proxy/
```

Visualizando pods e nos
=======================================
```bash
kubectl get - listar recursos
kubectl describe - mostra informações detalhadas sobre um recurso
kubectl logs - imprima os logs de um contêiner em um pod
kubectl exec - executa um comando em um container em um pod
```


```bash
kubectl get pods
kubectl describe pods
kubectl logs $POD_NAME
```
---
```bash
kubectl exec $POD_NAME env
kubectl exec -ti $POD_NAME -- bash
```

Expondo a aplicacao
=======================================
1 - Criando novo servico

```bash
kubectl get pods
kubectl get services

kubectl expose deployment/kubernetes-bootcamp --type="NodePort" --port 8080

kubectl get services

kubectl describe services/kubernetes-bootcamp

export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')

echo NODE_PORT=$NODE_PORT

curl $(minikube ip):$NODE_PORT

kubectl describe deployment
kubectl get pods -l run=kubernetes-bootcamp
kubectl get services -l run=kubernetes-bootcamp
```


2 - Usando labels
```bash
kubectl describe deployment

kubectl get pods -l run=kubernetes-bootcamp

kubectl get services -l run=kubernetes-bootcamp

export POD_NAME=$(kubectl get pods -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}')

echo name of the pod: $POD_NAME

kubectl label pod $POD_NAME app=v1

kubectl describe pods $POD_NAME

kubectl get pods -l app=v1
```

3 - Deletando um service
```bash
kubectl delete service -l run=kubernetes-bootcamp

kubectl get services

curl $(minikube ip):$NODE_PORT

kubectl exec -ti $POD_NAME curl localhost:8080
```

Escalando a aplicacao
=======================================
1 - Escalando um deployment
```bash
kubectl get deployments

kubectl scale deployments/kubernetes-bootcamp --replicas=4

kubectl get deployments

kubectl get pods -o wide
kubectl describe deployments/kubernetes-bootcamp
```

2 - Load Balancing
```bash
kubectl describe services/kubernetes-bootcamp

export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')

echo NODE_PORT=$NODE_PORT

curl 4(minikube ip):$NODE_PORT
```

3 - Diminuindo a Escala
```bash
kubectl scale deployments/kubernetes-bootcamp --replicas=2

kubectl get deployments

kubectl get pods -o wide
```


Atualizacao continua
=======================================
1 - Atualizando a versao do app
```bash
kubectl get deployments

kubectl get pods

kubectl describe pods

kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2

kubectl get pods
```

2 - Verificando uma atualizacao
```bash
kubectl describe services/kubernetes-bootcamp

export NODE_PORT=$(kubectl get services/kubernetes-bootcamp -o go-template='{{(index .spec.ports 0).nodePort}}')

echo $NODE_PORT

curl $(minikube ip):$NODE_PORT

kubectl rollout status
deployments/kubernetes-bootcamp

kubectl describe pods
```

3 - Voltando uma atualizacao
```bash
kubectl set image deployments/kubernetes=bootcamp kubernetes-bootcamp=gcr.io/google-samples/kubernetes-bootcamp:v10

kubectl get deployments

kubectl get pods

kubectl describe pods

kubectl rollout undo deployments/kubernetes-bootcamp

kubectl get pods

kubectl describe pods
```