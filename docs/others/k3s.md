# K3s

## Install the k3s (like as unique master server)

Run this command to install k3s with containerd default runtime support:

```bash
curl -sfL https://get.k3s.io | sh -
```

This command will install:

- k3s (server)
- kubelet
- containerd
- flannel (network)
- coredns, servicelb, traefik, etc. (if not disabled)

> If you want to install without the traefik or servicelb, you can use:

```bash
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable traefik --disable servicelb" sh -
```

## Check if k3s is running
```bash
sudo systemctl status k3s
```
Check if you can see active (running).


## Connect the Kubernetes with kubectl
```bash
sudo kubectl get nodes
```
You will see node in Ready.

Or to use without sudo command:
```bash
mkdir -p $HOME/.kube
sudo cp /etc/rancher/k3s/k3s.yaml $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

## Convert containers Podman to Kubernetes

If you already have containers running with Podman, you can:

➤ Migrate with manual form:

Identify what eath container work.
Recriate with Deployment + Service YAMLs in the Kubernetes.
Or, use kompose if you already have a docker-compose.yaml.

Example docker-compose.yml converted:

Install the kompose:
```bash
curl -L https://github.com/kubernetes/kompose/releases/download/v1.31.0/kompose-linux-amd64 -o kompose
chmod +x kompose
sudo mv kompose /usr/local/bin/
```

Convert:
```bash
kompose convert -f docker-compose.yml
kubectl apply -f .
```

## Export services (Ingress optional)

k3s already have the Traefik Ingress Controller (if you don't disable that). You can create rules Ingress to export services at 80/443 ports.

Example of a Ingress:
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

## (Optional) Enable remote access by Kubeconfig

Copy the file /etc/rancher/k3s/k3s.yaml to your local machine, edit the IP from 127.0.0.1 to public IP of server, and use the kubectl command.
