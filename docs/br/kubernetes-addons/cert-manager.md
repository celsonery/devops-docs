# Cert Manager

https://cert-manager.io/

- Instalação

$ kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.6.0/cert-manager.yaml

- https://github.com/cert-manager/cert-manager/releases/download/v1.16.1/cert-manager.yaml

- Criar um ClusterIssuer

$ kubectl apply -f clusterissuer.yaml

- Consultar
$ kubectl get clusterissuer

- Editar o ingress da aplicação para habilitar os certificados

$ kubectl get secrets

$ kubectl get certificate
$ kubectl describe certificate ecommerce-tls
$ kubectl describe certificaterequest ecommerce-tls-2ld57

$ kubectl describe challenges --all-namespaces

$ kubectl get crd
