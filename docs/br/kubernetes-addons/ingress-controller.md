# Ingress Controller

- Site
https://kubernetes.github.io/ingress-nginx/

- Instalação via helm
helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx --namespace ingress-nginx --create-namespace



- Criar ingress.yaml

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-hosts
  annotations:
    kubernetes.io/ingress.class: "nginx"
spec:
  rules:
  - host: api.bagarote.com.br
    http:
      paths:
      - pathType: "Prefix"
        path: "/"
        backend:
          service:
            name: api
            port:
              number: 8082
  - host: adm.bagarote.com.br
    http:
      paths:
      - pathType: "Prefix"
        path: "/"
        backend:
          service:
            name: adm
            port:
              number: 80
  - host: site.bagarote.com.br
    http:
      paths:
      - pathType: "Prefix"
        path: "/"
        backend:
          service:
            name: site
            port:
              number: 80
```
