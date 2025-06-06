# Postgres

#### Tranferencia on-the-fly

```bash
pg_dump -v -C <nome-banco> | psql -h <nome-novo-host ou ip-novo-host> -U postgres <nome-banco>
```

#### Tranferencia on-the-fly para outro banco na mesma maquina **remover tag '-C'**

```bash
pg_dump -v <nome-banco> | psql -U postgres <nome-banco>
```

## Realizar Backup para o OneDrive

#### Instalar e configurar Rclone

Instalar ferramenta rclone e fuse no Debian

```
apt install rclone fuse
```

Configurar rclone com uma conta onedrive
executar como root:

![rclone config](imgs/rclone-01.png)
![rclone config](imgs/rclone-02.png)
![rclone config](imgs/rclone-03.png)
![rclone config](imgs/rclone-04.png)
![rclone config](imgs/rclone-05.png)
![rclone config](imgs/rclone-06.png)
![rclone config](imgs/rclone-07.png)
![rclone config](imgs/rclone-08.png)
![rclone config](imgs/rclone-09.png)
![rclone config](imgs/rclone-10.png)
![rclone config](imgs/rclone-11.png)
![rclone config](imgs/rclone-12.png)
![rclone config](imgs/rclone-13.png)
![rclone config](imgs/rclone-14.png)
![rclone config](imgs/rclone-15.png)
![rclone config](imgs/rclone-16.png)
![rclone config](imgs/rclone-17.png)
![rclone config](imgs/rclone-18.png)
![rclone config](imgs/rclone-19.png)
![rclone config](imgs/rclone-20.png)
![rclone config](imgs/rclone-21.png)


#### Criar Scripts
```bash

```
- Criar Variavel de ambiente PGPASSWORD
