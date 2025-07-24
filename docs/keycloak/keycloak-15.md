# Keycloak 15

## Install Java

Primeiramento instale o OpenJDK-17

```bash
# apt install openjdk-17-jre-headless
```

## Install keycloak

### Download Keycloak

- Faça o download do keycloak
OBS: Aqui estou usando a versão 15.1.1

```bash
# wget -c https://github.com/keycloak/keycloak/releases/download/15.1.1/keycloak-15.1.1.tar.gz
```

- Unpack keycloak
```bash
# tar zxvf keycloak-15.1.1.tar.gz
```

Eu movi a pasta extraida **keycloak-15.1.1** para **/opt/keycloak**
```bash
# mv keycloak-15.1.1 /opt/keycloak
```


### Generate SSL to keycloak
> Utilizei um certificado Let's Encrypt

```bash
certbot -v certonly --standalone -d auth.bagarote.dev.br
```
Foi criado em **/etc/letsencrypt/live/auth.bagarote.dev.br/*.pem


### Configuration keycloak

#### SSL


Edite o arquivo **/opt/keycloak/standalone/configuration/standalone.xml** e adicione as linhas abaixo

```conf
<security-realm name="UndertowRealm">
  <server-identities>
    <ssl>
      <keystore path="keycloak.jks" relative-to="jboss.server.config.    dir" keystore-password="123456" />
    </ssl>
  </server-identities>
</security-realm>
```

Altere o subsystem para o undertow
```
<subsystem xmlns="urn:jboss:domain:undertow:12.0" default-server="default-server" default-virtual-host="default-host" default-servlet-container="default" default-security-domain="other" statistics-enabled="${wildfly.undertow.statistics-enabled:${wildfly.statistics-enabled:false}}">
    <buffer-cache name="default"/>
    <server name="default-server">
        <http-listener name="default" socket-binding="http" redirect-socket="https" enable-http2="true"/>
        <https-listener name="https" socket-binding="https" security-realm="UndertowRealm" enable-http2="true"/>
```


#### Database

Remover estas linhas:
```
<datasource jndi-name="java:jboss/datasources/ExampleDS" pool-name="ExampleDS" enabled="true" use-java-context="true" statistics-enabled="${wildfly.datasources.statistics-enabled:${wildfly.statistics-enabled:false}}">
    <connection-url>jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE</connection-url>
    <driver>h2</driver>
    <security>
        <user-name>sa</user-name>
        <password>sa</password>
    </security>
</datasource>
```

Alterar a configuracao do keycloakDS alterando para o postgresql
```
<datasources>
    <datasource jndi-name="java:jboss/datasources/KeycloakDS" pool-name="KeycloakDS" enabled="true" use-java-context="true" statistics-enabled="${wildfly.datasources.statistics-enabled:${wildfly.statistics-enabled:false}}">
        <connection-url>jdbc:postgresql://db.bagarote.com.br:5432/keycloak</connection-url>
        <driver>postgres</driver>
        <security>
            <user-name>dev</user-name>
            <password>123</password>
        </security>
    </datasource>
    <drivers>
        <driver name="postgres" module="com.postgres">
            <driver-class>org.postgresql.Driver</driver-class>
            <xa-datasource-class>org.postgresql.xa.PGXADataSource</xa-datasource-class>
        </driver>
    </drivers>
</datasources>
```

Altera a linha **default-binding**
```
<default-bindings context-service="java:jboss/ee/concurrency/context/default" datasource="java:jboss/datasources/KeycloakDS" managed-executor-service="java:jboss/ee/concurrency/executor/default" managed-scheduled-executor-service="java:jboss/ee/concurrency/scheduler/default" managed-thread-factory="java:jboss/ee/concurrency/factory/default"/>

```


### Rodando o keycloak
```bash
ExecStart=/usr/bin/bash /opt/keycloak/bin/standalone.sh -b=<ip-externo> -bmanagement=<ip-externo>
```


## Criei um service no systemd para facilitar o gerenciamento

Em **/etc/systemd/system/** criei **keycloak.service** com o seguinte conteúdo
```bash
[Unit]
Description=Manager service keycloak
After=multi-user.target

[Service]
ExecStart=/usr/bin/bash /opt/keycloak/bin/standalone.sh -b=<ip-externo> -bmanagement=<ip-externo>
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
Ex: auth.bagarote.com.br:8443


---
ls /etc/letsencrypt/live/auth2.bagarote.com.br
openssl pkcs12 -export -out keycloak.p12 -inkey /etc/letsencrypt/live/auth.bagarote.com.br/privkey.pem -in /etc/letsencrypt/live/auth.bagarote.com.br/fullchain.pem -name keycloak-certificate
keytool -importkeystore -srckeystore keycloak.p12 -destkeystore keycloak.jks -srcstoretype  pkcs12 
rm keycloak.p12
keytool -list -v -keystore keycloak.jks


## Atualizar certificado SSL KeyCloak

Primeiro renomeio os arquivos antigos
````bash
mv keycloak.p12 keycloak.p12-old
mv keycloak.jks keycloak.jks-old
```

Gere um novo certificado, baseado no certificado do letsencrypt renovado.
```bash
openssl pkcs12 -export -out keycloak.p12 -inkey /etc/letsencrypt/live/auth.bagarote.com.br/privkey.pem -in /etc/letsencrypt/live/auth.bagarote.com.br/fullchain.pem -name keycloak-certificate
```

Informe uma senha: XXXXXX e confirme.


Agora gere a chave jks para o keycloak.
```bash
keytool -importkeystore -srckeystore keycloak.p12 -destkeystore keycloak.jks -srcstoretype  pkcs12
```

Repita a senha informada anteriormente: XXXXXX e confirme.

> Após o procedimento concluído, agende um reboot ou reinicie manualmente o keycloak.
```bash
reboot

ou 

systemctl restart keycloak
```