# Instalação da AWS CLI
Para instalar a AWS CLI, siga os passos abaixo com base no seu sistema operacional:

## Linux (Ubuntu/Debian):
1. Instale o unzip:
```bash
sudo apt install unzip
```

2. Faça o download e instale a versão mais recente:
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

3. Verifique a instalação:
```bash
aws --version
```

## Windows:
- Baixe o instalador em https://awscli.amazonaws.com/AWSCLIV2.msi e execute-o. Após a instalação, a AWS CLI estará disponível no cmd e PowerShell. 

## macOS:
- Use o Homebrew:
```bash
brew install awscli
```

- Ou baixe o instalador .pkg do site oficial da AWS. 


# Configuração da AWS CLI
Após a instalação, configure a AWS CLI com suas credenciais:

1. Execute o comando:
```bash
aws configure
```

2. Preencha os campos solicitados:

- AWS Access Key ID: Insira sua chave de acesso (gerada no IAM).
- AWS Secret Access Key: Insira a chave secreta correspondente.
- Default region name: Ex: us-east-1 (região padrão).
- Default output format: json. 

> Importante: Guarde suas chaves de acesso em local seguro. Nunca as compartilhe ou exponha em código aberto.