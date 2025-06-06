# Utilizando arquivos .yaml

O minimo que o arquivo precisa
```yaml
apiVersion
kind
metadata
spec
```

- apiVersion: Versão da api que será utilizada na criação do objeto.
- kind: Tipo de objeto que será criado.
- metadata: Metadados referente ao objeto.
- spec: O que terá no objeto, "No caso containers".


Como saber a apiVersion:
```
$ kubectl api-resources
```
- Inserir imagem do resultado do comando acima

Arquivo para criação de um **Pod** final
> OBS: A identação é muito importante, utilize sempre 2 espaços para a tabulação.

## Pod
```yaml
apiVersion: v1
kind: Pod
metadata:
	- name: meupod
		labels: 
			app: meupod-label
spec:
	containers:
		- name: myapp-api
			image: oregontecnologia/myapp-api:1.0.2
```

Criando o objeto com **create** ou **apply**
> O comando **create** somente cria o objeto se o objeto já estiver sido criado apresenta erro.
> O comando **apply** cria ou atualiza o objeto se caso houver alguma mudança e o objeto já estiver sido criado anteriormente.
```
$ kubectl apply -f arquivo.yaml
```

Verficando se está sendo executado a criação
```
$ kubectl get pods
```
> A flag **-o wide** mostra mais detalhes sobre o pod em execução.

Saber toda a informação do pod ou do deploy
```
$ kubectl describe pod myapp-api
```
ou
```
$ kubectl describe deploy ou deployments
```

## ReplicaSet
```yaml
apiVersion: apps/v1
kind: Replicaset
metadata:
	- name: meureplicaset
spec:
	replicas: 5
	selector:
		matchLabels:
			app: meupod-label
		template:
			metadata:
				labels: 
					app: meupod-label
			spec:
				containers:
					- name: myapp-api
						image: oregontecnologia/myapp-api:1.0.2
	
```

Verficando se está sendo executado a criação
```
$ kubectl get replicaset
```

## Deployment ou Deploy
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
	- name: meudeploy
spec:
	replicas: 5
	selector:
		matchLabels:
			app: meupod-label
		template:
			metadata:
				labels: 
					app: meupod-label
			spec:
				containers:
					- name: myapp-api
						image: oregontecnologia/myapp-api:1.0.2
	
```

Verficando se está sendo executado a criação
```
$ kubectl get deploy
```

## Service
```yaml
apiVersion: v1
kind: Service
metadata:
	- name: meudservice
spec:
	selector:
		app: meupod-label
	ports:
		- port: 80
	type: LoadBalancer <- ClusterIP | NodePort | LoadBalancer
```

Verficando se está sendo executado a criação
```
$ kubectl get services
```