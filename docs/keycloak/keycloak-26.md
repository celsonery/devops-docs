# Keycloak 26

## Install Java

Primeiramento instale o OpenJDK-17

```bash
# apt install openjdk-17-jre-headless
```

## Install keycloak

### Download Keycloak

- Faça o download do keycloak
OBS: Aqui estou usando a versão 26.0.2

```bash
# wget -c https://github.com/keycloak/keycloak/releases/download/26.0.2/keycloak-26.0.2.tar.gz
``` 

- Unpack keycloak
```bash
# tar zxvf keycloak-26.0.2.tar.gz
```

Eu movi a pasta extraida **keycloak-26.0.2** para **/opt/keycloak**
```bash
# mv keycloak-26.0.2 /opt/keycloak
```


### Generate SSL to keycloak
> Utilizei um certificado Let's Encrypt

```bash
certbot -v certonly --standalone -d auth.bagarote.dev.br
```
Foi criado em **/etc/letsencrypt/live/auth.bagarote.dev.br/*.pem


### Configuration keycloak
- Editei o arquivo **/opt/keycloak/conf/keycloak.conf** e alterei as seguintes variáveis

```conf
# Observability

# If the server should expose healthcheck endpoints.
health-enabled=true

# If the server should expose metrics endpoints.
metrics-enabled=true

# HTTP

# The file path to a server certificate or certificate chain in PEM format.
https-certificate-file=/etc/letsencrypt/live/auth.bagarote.dev.br/fullchain.pem

# The file path to a private key in PEM format.
https-certificate-key-file=/etc/letsencrypt/live/auth.bagarote.dev.br/privkey.pem

# The proxy address forwarding mode if the server is behind a reverse proxy.
#proxy=reencrypt

# Do not attach route to cookies and rely on the session affinity capabilities from reverse proxy
#spi-sticky-session-encoder-infinispan-should-attach-route=false

# Hostname for the Keycloak server.
hostname=auth.bagarote.dev.br

```

### Build keycloak
```bash
/opt/keycloak/bin/kc.sh build
```

### Running keycloak
```bash
export KEYCLOAK_ADMIN=admin
export KEYCLOAK_ADMIN_PASSWORD=senhadoadmin

/opt/keycloak/bin/kc.sh start
```


## Criei um service no systemd para facilitar o gerenciamento

Em **/etc/systemd/system/** criei **keycloak.service** com o seguinte conteúdo
```bash
[Unit]
Description=Manager service keycloak
After=multi-user.target

[Service]
ExecStart=/usr/bin/bash /opt/keycloak/bin/kc.sh start
Type=simple

[Install]
WantedBy=multi-user.target
```

Após a criação do arquivo instalei para iniciar sempre junto com a máquina
```bash
# systemctl enable --now keycloak.service
```

## Teste funcionamento
> Abra seu browser no endereço criado para o keycloak na porta :8443
Ex: auth.bagarote.dev.br:8443
