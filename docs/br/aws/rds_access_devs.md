# Como configurar os acessos para os Devs.

## Passo 1: Gerar as Access Keys (AWS)
Para que eles usem o comando aws ssm start-session, cada um precisa de uma chave. No console IAM:

1. Vá em Users > Clique no nome (devname).
1. Aba Security Credentials > Create access key.
3. Escolha Command Line Interface (CLI).
4. Entregue a Access Key ID e a Secret Access Key para o desenvolvedor.

## Passo 2: O Dev configura a máquina dele
O Dev (e os outros) deve rodar no terminal:

```Bash
aws configure
# Ele insere a Key, a Secret, e a região (us-east-1)
```

## Passo 3: Criar os usuários dentro do PostgreSQL
Não use o usuário "postgres" (o que é uma ótima prática de segurança), conecte você no banco e rode:

```SQL
-- Criando o usuário para o DevName
CREATE USER devname WITH PASSWORD 'mudar123';

-- Dando permissão de conexão no seu banco real
GRANT CONNECT ON DATABASE seu_banco_de_dados TO devname;

-- Dando permissão para ver as tabelas no schema public
GRANT USAGE ON SCHEMA public TO devname;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO devname;
```

## Passo 4: Acessando o PostgreSQL da máquina local:

1. Instalar aws session manager
https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html

Para OpenSUSE Tumbleweed
```bash
# Baixar o RPM oficial da AWS
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/linux_64bit/session-manager-plugin.rpm" -o "session-manager-plugin.rpm"

# Instalar usando o zypper (isso resolve dependências se necessário)
sudo zypper install session-manager-plugin.rpm
```

2. Verificar a instalação
Após a instalação, verifique se o binário está respondendo corretamente:

```Bash
session-manager-plugin
```

3. Conectar ao SSM.
```bash
#!/bin/bash
# Script para DEV conectarem ao PostgreSQL
echo "Iniciando túnel para o RDS PostgreSQL..."
aws ssm start-session \
    --target <i-ID_DA_INSTANCIA_BASTION> \
    --document-name AWS-StartPortForwardingSessionToRemoteHost \
    --parameters '{"host":["<SEU-RDS-ENDPOINT.AWS.COM>"],"portNumber":["5432"],"localPortNumber":["5432"]}'
```
> Isso cria um túnel direto para o RDS sem precisar de IP público ou porta aberta no firewall para a internet.

3. Use seu cliente SQL favorito:

- Host: localhost
- Port: 5432
- User: devname
- Database: nomedatabase (NUNCA use o rdsadmin).