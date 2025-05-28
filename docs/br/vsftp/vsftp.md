# VsFTPD

#### Install
apt-get install vsftp apache2-utils libpam-pwdfile

#### Configure

- vim /etc/vsftpd.conf
```
ftpd_banner=Bem-vindo ao FTP Oferta Maluca.
listen=YES
listen_ipv6=NO
anonymous_enable=NO
local_enable=YES
write_enable=YES
local_umask=022
nopriv_user=vsftpd
virtual_use_local_privs=YES
guest_enable=YES
user_sub_token=$USER
local_root=/var/ftp/home/$USER
chroot_local_user=YES
guest_username=vsftpd
hide_ids=YES
allow_writeable_chroot=YES
pam_service_name=vsftpd

use_localtime=YES
pasv_enable=YES
pasv_min_port=30090
pasv_max_port=30100

xferlog_enable=YES
xferlog_file=/var/log/vsftpd.log
```

- vim /etc/pam.d/vsftpd
```
auth required pam_pwdfile.so pwdfile /etc/ftpd.passwd
account required pam_permit.so
```

- Adiciona usuário do vsftp no sistema
```bash
useradd --home /home/vsftpd --gid nogroup -m --shell /bin/false vsftpd
```

- Cria usuários virtuais

- Adiciona usuario e cria arquivo
```bash
htpasswd -c -p -b /etc/ftpd.passwd celso@karyon.com.br $(openssl passwd -1 -noverify XXXXXXXX)
```

- Adiciona usuario em arquivo já existente
```bash
htpasswd -p -b /data/ftp/etc/ftpd.passwd sachinho@ofertamaluca.com.br $(openssl passwd -1 -noverify XXXXXXXX)
```

- Cria a pasta para os usuários virtuais
```bash
mkdir /var/ftp/usuario-virtual@dominio
chown vsftpd:nogroup /var/ftp/usuario-virtual@dominio
```

- Inicia e habilita o servidor vsftpd

```bash
systemctl enable --now vsftpd
```
