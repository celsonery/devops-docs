# Let's Encrypt

## Create cert for a machine
```bash
certbot -v certonly --webroot -w /var/www/vhosts/oregon -d www.oregon.net.br
```
#### Renew cert
```bash
certbot renew
```

#### Renew a specific domain
```bash
certbot renew certonly -d www.oregon.net.br
```

> [!IMPORTANT]
Para este procedimento é recomendado usar screen para não perder o acesso a vps


## Create wildcard cert for a domain
```bash
certbot certonly -v --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory -d '*.bagarote.dev.br' -d bagarote.dev.br
```

#### Renew wildcard cert
```bash
certbot certonly --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory -d '*.bagarote.dev.br' -d bagarote.dev.br --force-renewal --manual-public-ip-logging-ok
```

> Para verificar a propagação do domínio pode ser utilizado ferramentas como **https://toolbox.googleapps.com/apps/dig/#TXT/_acme-challenge.oregon.net.br** ou sites como **dnscheckr.org**# Let's Encrypt
