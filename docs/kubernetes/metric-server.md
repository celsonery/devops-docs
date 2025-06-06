# Metric server

kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

Rodando:
```bash
kubectl get pods --all-namespaces
```

Conferindo se está funcionando:
```bash
kubectl top nodes

ou

kubectl top pods --all-namespaces
```

Caso não funcione:

faça o download 
```bash
wget https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

edit o arquivo:
```
vim components.yaml
```

acrescente:
```bash
125   strategy:
126     rollingUpdate:
127       maxUnavailable: 0
128   template:
129     metadata:
130       labels:
131         k8s-app: metrics-server
132     spec:
133       containers:
134       - args:
135         - --cert-dir=/tmp
136         - --secure-port=10250
137         - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
138         - --kubelet-use-node-status-port
139         - --metric-resolution=15s
140         - --kubelet-insecure-tls
141         image: registry.k8s.io/metrics-server/metrics-server:v0.7.2
142         imagePullPolicy: IfNotPresent
143         livenessProbe:

```
