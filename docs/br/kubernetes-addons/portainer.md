# Portainer

buscar nova versao
https://docs.portainer.io/start/upgrade/kubernetes

```bash
wget -c https://downloads.portainer.io/ce2-14/portainer.yaml
```

remover o antigo
```bash
kubectl delete -f portainet-VERSAO.yaml
```

remover o volume
```bash
kubectl delete -f portainer-volume.yaml
```

editar o arquivo portainer-VERSAO.yaml
- Colocar referencia ao volume e volume-clain

subir nova versao
```
kubectl apply -f portainer-volume.yaml
kubectl apply -f portainer-VERSAO.yaml
kubectl apply -f ingress.yaml
```

> Testar...