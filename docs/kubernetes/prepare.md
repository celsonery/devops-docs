# To prepare envirenment

### Requirements

1. 3 servers
1. Server master (control-plane) with 2 CPU's (cores) 2 GB de RAM
1. Server slaves (workers) with 1 CPU e 1 GB de RAM
1. Root access


### Preparation
Add names and IPs in the file **/etc/hosts**

```
10.0.10.100  master.empresa.local    master
10.0.10.101  slav01.empresa.local    slav01
10.0.10.102  slav02.empresa.local    slav02
```

Configure the firewall

Master:

| Port | Protocol |
| ---- | ---- |
| 6443 | TCP |
| 2379-2380 | TCP |
| 10250 | TCP |
| 10251 | TCP |
| 10252 | TCP |
| 10253 | TCP |

Slaves:

| Port | Protocol |
| ---- | ---- |
| 10251 | TCP |
| 10255 | TCP |

Disable SWAP
```
# swapon -s
# swapoff -a
```

Edit file **/etc/fstab** add coment at swap line
```
#/dev/mapper/master--vg-swap_1 none swap    sw  0   0
```

Afer that check machines communication with **ping**
```
# ping slav01
# ping slav02
```

If all right you send and receive pings
```
# shutdown -r now
```
