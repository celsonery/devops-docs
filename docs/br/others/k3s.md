# K3s

## Instalar o k3s (como servidor único - master)

Execute este comando para instalar o k3s com suporte a containerd (runtime padrão):

```bash
curl -sfL https://get.k3s.io | sh -
```

Este comando instala:

- k3s (servidor)
- kubelet
- containerd
- flannel (rede)
- coredns, servicelb, traefik, etc. (se não desabilitados)

> Se quiser instalar sem o traefik ou servicelb, pode usar:

```bash
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable traefik --disable servicelb" sh -
```

## Verificar se k3s está rodando
```bash
sudo systemctl status k3s
```
Verifique se aparece como active (running).


## Acessar o Kubernetes com kubectl
```bash
sudo kubectl get nodes
```
Você verá o nó como Ready.


Para usar kubectl sem sudo:
```bash
mkdir -p $HOME/.kube
sudo cp /etc/rancher/k3s/k3s.yaml $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```


## Converter containers Podman para Kubernetes

Se você já tem containers rodando com Podman, você pode:

➤ Migrar de forma manual:

Identifique o que cada container faz.

Recrie como Deployment + Service YAMLs no Kubernetes.

Ou, use kompose se tem um docker-compose.yml.

Exemplo docker-compose.yml convertido:

Instale o kompose:
```bash
curl -L https://github.com/kubernetes/kompose/releases/download/v1.31.0/kompose-linux-amd64 -o kompose
chmod +x kompose
sudo mv kompose /usr/local/bin/
```

Converta:
```bash
kompose convert -f docker-compose.yml
kubectl apply -f .
```

## Expor serviços (Ingress opcional)

k3s já vem com o Traefik Ingress Controller (a menos que tenha desabilitado). Você pode criar regras Ingress para expor serviços na porta 80/443.

Exemplo de um Ingress:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: meu-app
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: web
spec:
  rules:
  - host: app.seudominio.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nome-do-servico
            port:
              number: 80
```

## (Opcional) Habilitar acesso remoto via Kubeconfig

Copie o /etc/rancher/k3s/k3s.yaml para sua máquina local, edite o IP 127.0.0.1 para o IP público do servidor, e use com kubectl.
