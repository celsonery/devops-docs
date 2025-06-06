# Install docker in Debian 12

Update your system

> Use the "sudo" command before if you are like common user.
```bash
# apt update
# apt upgrade
```

Install need packages to install.
```bash
# apt install curl gnupg2 apt-transport-https software-properties-common ca-certificates
```

Add repository of Docker in Debian
```bash
# curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/trusted.gpg.d/docker.gpg
```

Create file: **/etc/apt/sources.list.d/docker.list**

Debian 12 - Bookwarm
```bash
deb [arch=amd64 signed-by=/etc/apt/trusted.gpg.d/docker.gpg] https://download.docker.com/linux/debian bookworm stable
```

## If you don't want use docker runtime, use containerd runtime:
> If uou prefer use **containerd** to manager containers, see [Install kubernetes](../kubernetes/install-kubernetes.md).


Install docker
> Case you have problem in perform with previews version [18.06.0]
```bash
# apt update
# apt install docker-ce

or

# apt install docker-ce=18.06.0~ce~3-0~debian
```

Configure the daemon and create file **/etc/docker/daemon.json**
```json
{
    "exec-opts": ["native.cgroupdriver=systemd"],
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "100m"
        },
    "storage-driver": "overlay2"
}
```

Create folder **/etc/systemd/system/docker.service.d**
```bash
# mkdir -p /etc/systemd/system/docker.service.d
```

Restart Docker Daemon
```bash
systemctl daemon-reload
systemctl restart docker
```

Give user permission to common user run containers.
```bash
# usermod -aG docker $USER
```

Check if docker is working.
```bash
$ docker version
```

Shuld see like this:
```bash
Client:
 Version:           18.06.0-ce
 API version:       1.38
 Go version:        go1.10.3
 Git commit:        0ffa825
 Built:             Wed Jul 18 19:09:33 2018
 OS/Arch:           linux/amd64
 Experimental:      false

Server:
 Engine:
  Version:          18.06.0-ce
  API version:      1.38 (minimum version 1.12)
  Go version:       go1.10.3
  Git commit:       0ffa825
  Built:            Wed Jul 18 19:07:38 2018
  OS/Arch:          linux/amd64
  Experimental:     false
```

Running first docker image.
```bash
$ docker run hello-world
```

or httpd image.

```bash
$ docker run --rm -p 80:80 httpd
```

To check if work, go to your browser and connect to http://localhost or http://127.0.0.1.

