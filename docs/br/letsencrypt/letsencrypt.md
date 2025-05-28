# Let's Encrypt

## For create
certbot certonly -v --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory -d '*.bagarote.dev.br' -d bagarote.dev.br


## For renewal
certbot certonly --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory -d '*.bagarote.dev.br' -d bagarote.dev.br --force-renewal --manual-public-ip-logging-ok