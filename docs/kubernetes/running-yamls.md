# Using .yaml files

The essentials you need.
```yaml
apiVersion
kind
metadata
spec
```

- apiVersion: Api version will be used to create objects.
- kind: The type of object will be created.
- metadata: Metadata related to the object.
- spec: Object specification, "In this case of container".


How to know the apiVersion:
```
$ kubectl api-resources
```

- Inserir imagem do resultado do comando acima

File to create a **Pod**
> PBS: Indentation is very important, always use 2 spaces for tabs.

## Pod
```yaml
apiVersion: v1
kind: Pod
metadata:
	- name: mypod
		labels: 
			app: mypod-label
spec:
	containers:
		- name: myapp-api
			image: oregontecnologia/myapp-api:1.0.2
```

Creating objeto with **create** or **apply**
> The **create** command only create an object. If it already exists, you will get an error.
> The **apply** command create or update an object.
```
$ kubectl apply -f arquivo.yaml
```

Checking if it's running.
```
$ kubectl get pods
```
> The **-o wide** option shows more information about running a pod.

This command below shows all information about the pod or deploy.
```
$ kubectl describe pod myapp-api
```
or
```
$ kubectl describe deploy ou deployments
```

## ReplicaSet
```yaml
apiVersion: apps/v1
kind: Replicaset
metadata:
	- name: myreplicaset
spec:
	replicas: 5
	selector:
		matchLabels:
			app: mypod-label
		template:
			metadata:
				labels: 
					app: mypod-label
			spec:
				containers:
					- name: myapp-api
						image: oregontecnologia/myapp-api:1.0.2
	
```

Checking if it's running.
```
$ kubectl get replicaset
```

## Deployment ou Deploy
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
	- name: mydeploy
spec:
	replicas: 5
	selector:
		matchLabels:
			app: mypod-label
		template:
			metadata:
				labels: 
					app: mypod-label
			spec:
				containers:
					- name: myapp-api
						image: oregontecnologia/myapp-api:1.0.2
	
```

Checking if it's running.
```
$ kubectl get deploy
```

## Service
```yaml
apiVersion: v1
kind: Service
metadata:
	- name: myservice
spec:
	selector:
		app: mypod-label
	ports:
		- port: 80
	type: LoadBalancer <- ClusterIP | NodePort | LoadBalancer
```

Checking if it's running.
```
$ kubectl get services
```