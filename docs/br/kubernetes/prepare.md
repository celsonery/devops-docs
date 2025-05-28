# Preparação do ambiente

### Requisitos

1. Mínimo de 3 servers
1. Servidor master (control-plane) com 2 CPU's (cores) 2 GB de RAM
1. Servidor slaves (workers) com 1 CPU e 1 GB de RAM
1. Acesso administrativo (root)


### Preparação
Adicione nomes e IPs das maquinas no arquivo **/etc/hosts**

```
10.0.10.100  master.empresa.local    master
10.0.10.101  slav01.empresa.local    slav01
10.0.10.102  slav02.empresa.local    slav02
```

Configure o firewall

Master:

| Porta | Protocolo |
| ---- | ---- |
| 6443 | TCP |
| 2379-2380 | TCP |
| 10250 | TCP |
| 10251 | TCP |
| 10252 | TCP |
| 10253 | TCP |

Slaves:

| Porta | Protocolo |
| ---- | ---- |
| 10251 | TCP |
| 10255 | TCP |

Desabilite o SWAP
```
# swapon -s
# swapoff -a
```

Edite o arquivo **/etc/fstab** e comente a linha correspondente ao arquivo de troca (swap)
```
#/dev/mapper/master--vg-swap_1 none swap    sw  0   0
```

Após toda configuração verifique se as maquinas estão se enxergando com o **ping**
```
# ping slav01
# ping slav02
```

Se tudo correu bem e obteve resposta dos nós escravos e vice-versa reinicie os computadores.
```
# shutdown -r now
```


