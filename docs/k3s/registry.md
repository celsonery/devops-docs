# Rodar um Registry Privado no cluster K3s com:

- HTTPS via **cert-manager** e **Let's Encrypt**
- Autenticação HTTP com múltiplos usuários (`htpasswd`)
- Deploy interno via **Deployment + Service**
- Exposição via **Ingress com TLS**
- Armazenamento persistente com **PVC**

---

## 1. Criar `htpasswd` com múltiplos usuários

```bash
htpasswd -Bc htpasswd admin
htpasswd -b htpasswd dev1 senha123
htpasswd -b htpasswd dev2 senha456
```


## 2. Criar Secret no Kubernetes

```bash
kubectl create namespace registry

kubectl create secret generic registry-auth-secret \
  --from-file=htpasswd=./htpasswd \
  -n registry
```

## 3. Criar PVC para armazenamento persistente

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: registry-storage
  namespace: registry
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
  storageClassName: local-path
```

## 4. Criar Deployment + Service para o Registry

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: registry
  namespace: registry
spec:
  replicas: 1
  selector:
    matchLabels:
      app: registry
  template:
    metadata:
      labels:
        app: registry
    spec:
      containers:
        - name: registry
          image: registry:2
          ports:
            - containerPort: 5000
          env:
            - name: REGISTRY_AUTH
              value: htpasswd
            - name: REGISTRY_AUTH_HTPASSWD_REALM
              value: "Registry Realm"
            - name: REGISTRY_AUTH_HTPASSWD_PATH
              value: /auth/htpasswd
            - name: REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY
              value: /var/lib/registry
          volumeMounts:
            - name: auth-volume
              mountPath: /auth
            - name: storage
              mountPath: /var/lib/registry
      volumes:
        - name: auth-volume
          secret:
            secretName: registry-auth-secret
        - name: storage
          persistentVolumeClaim:
            claimName: registry-storage
---
apiVersion: v1
kind: Service
metadata:
  name: registry
  namespace: registry
spec:
  selector:
    app: registry
  ports:
    - protocol: TCP
      port: 5000
      targetPort: 5000
```

## 5. Criar Ingress com TLS via cert-manager

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: registry-ingress
  namespace: registry
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/proxy-body-size: "0"
    nginx.ingress.kubernetes.io/backend-protocol: "HTTP"
spec:
  ingressClassName: "traefik"
  tls:
    - hosts:
        - registry.oregon.net.br
      secretName: registry-tls
  rules:
    - host: registry.oregon.net.br
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: registry
                port:
                  number: 5000
```

## 6. Testar acesso com Docker

```bash
docker login registry.oregon.net.br
docker build -t registry.oregon.net.br/minha-imagem:1.0 .
docker push registry.oregon.net.br/minha-imagem:1.0
```

## 7. Configuração no K3s (registries.yaml)

```yaml
mirrors:
  "registry.oregon.net.br":
    endpoint:
      - "https://registry.oregon.net.br"

configs:
  "registry.oregon.net.br":
    auth:
      username: admin
      password: senha
```

## 8. imagePullSecrets para CI/CD
```bash
kubectl create secret docker-registry regcred \
  --docker-server=registry.oregon.net.br \
  --docker-username=admin \
  --docker-password=senha \
  --namespace=default
```

Exemplo dentro do Deployment:
```yaml
spec:
  imagePullSecrets:
    - name: regcred
```

