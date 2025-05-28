# Grafana

- Requisitos:
    - Metrics-server
    - Prometheus
    - Helm

https://artifacthub.io/

- Adicionar repositorio

helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

- Acesso
https://adm.bagarote.com.br:30002

- Site
https://grafana.com/

#### Temas usados

9679  - Deployment
10000 - Server monitor

#### Reset de senha do admin
```
grafana-cli admin reset-admin-password --password-from-stdin
```

- Adicionar Prometheus
```
http://prometheus-service:8080

http://metrics.bagarote.com.br
```
