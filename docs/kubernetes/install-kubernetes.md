# Kubernetes install

Load **overlay** and **br_netfilter** modules

Create file **/etc/modules-load.d/containerd.conf**

```bash
overlay
br_netfilter
```

Manual load

```bash
$ sudo modprobe overlay
$ sudo modprobe br_netfilter
```

Create file /etc/sysctl.d/99-kubernetes-k8s.conf

```bash
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
net.bridge.bridge-nf-call-ip6tables = 1
```
Load configs created

```bash
$ sudo sysctl --system
```

Install containerd

Install **docker** repository only to install **containerd.io**

Download gpg key by repository
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/docker.gpg
```

Create repository file in **/etc/apt/sources.list.d/** with name **docker.list**

```bash
deb [arch=amd64] https://download.docker.com/linux/debian bullseye stable
```

Update package list and install **containerd.io**

```bash
sudo apt-get update
sudo apt-get install containerd.io
```

Overwrite containerd config file

```bash
$ sudo containerd config default > /etc/containerd/config.toml
```

Edit file **/etc/containerd/config.toml** and change the option **SystemdCgroup** from **false** to **true**

```bash
sudo vim /etc/containerd/config.toml
```

Restart the containerd

```bash
sudo systemctl restart containerd
```

Install the Kubernetes

Add repository kubernetes gpg key
```bash
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.31/deb/Release.key | gpg --dearmor -o /etc/apt/trusted.gpg.d/kubernetes-gpg-keyring.gpg
```

Add kubernetes repository

Create file: **/etc/apt/sources.list.d/kubernetes.list**
```bash
deb [signed-by=/etc/apt/trusted.gpg.d/kubernetes-gpg-keyring.gpg] http://pkgs.k8s.io/core:/stable:/v1.31/deb /"
```

###

Update package list
```bash
sudo apt update
```

Install kubernetes
```bash
sudo apt install kubelet kubeadm
```

Mark hold packages
```bash
sudo apt-mark hold kubelet kubeadm
```

Active the daemon to autostart
```bash
sudo systemctl enable kubelet
```

Limit image storage
```bash
vim /var/lib/kubelet/kubeadm-flags.env

--image-gc-high-threshold=60 --image-gc-low-threshold=50
```
