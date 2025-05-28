# Renovar certificado Kubernetes

#### Erro de certificado
> Em instalações OnPremise do kubernetes é criado certificado váido por 1 ano. Então se ao usar kubectl, está recebendo esta mensagem de erro.
```
Unable to connect to the server: x509: certificate has expired or is not yet valid.
```

#### Verifique seus certificados
```
kubeadm certs check-expiration
```


#### Renove os certificados
```
kubeadm certs renew all


Done renewing certificates. You must restart the kube-apiserver, kube-controller-manager, kube-scheduler and etcd, so that they can use the new certificates.

```

> Então copie /etc/kubernetes/admin.conf para seu ~/.kube/config


#### Reinicie os serviços do kubernetes:
```
kubectl -n kube-system delete pod -l 'component=kube-apiserver'
kubectl -n kube-system delete pod -l 'component=kube-controller-manager'
kubectl -n kube-system delete pod -l 'component=kube-scheduler'
kubectl -n kube-system delete pod -l 'component=etcd'
```