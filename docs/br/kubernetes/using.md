# Criando primeiro container

Crie o diretório para o container
```
mkdir nginx
cd nginx
```

Crie o arquivo do container **nginx-deployment**
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.0
        ports:
        - containerPort: 80
``` 

Executando o container
```
kubectl apply -f nginx-deployment.yaml
```

Verficando o container
```
kubectl get deployments
kubectl describe deployment nginx-deployment
```

Agora crie o serviço para o container no arquivo **nginx-service.yaml**
```
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  labels:
    run: nginx-service
spec:
  type: NodePort
  ports:
  - port: 80
    protocol: TCP
  selector:
    app: nginx
```

Crie o serviço
```
kubectl apply -f nginx-service.yaml
```

Verficando o serviço
```
kubectl get service
kubectl describe service nginx-service
```