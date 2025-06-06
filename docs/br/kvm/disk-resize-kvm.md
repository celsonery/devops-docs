# Resize KVM Disk with LVM

## 1 - Resizing disk in KVM

Listar vms rodando
```bash
virsh list
OR
virsh list --all
```

Desligar a maquina virtual
```bash
virsh shutdown kdocker
```

Verificar qual disco pertence a maquina
```bash
virsh domblklist kdocker
```

Verificar informações sobre o disco
```bash
qemu-img info /var/lib/libvirt/images/kdocker.qcow2
```

---  
OBS.: Se houver algum snapshot - remover
Listar
```bash
virsh snapshot-list kdocker
```

Remover
```bash
virsh snapshot-delete --domain kdocker --snapshotname snapshot1
```
---

Aumentar o disco com mais 50G
```bash
qemu-img resize /var/lib/libvirt/images/kdocker.qcow2 +50G
```

Iniciar a maquina virtual
```bash
virsh start kdocker
```

Informar ao KVM aumento do disco
```bash
virsh blockresize k8sno3 /var/lib/libvirt/images/k8sno3.qcow2 80G <- novo tamanho total do disco
```

## 2 - Resizing disk inside the VM with LVM

Conectar na VM
```bash
ssh kdocker
```

Confirmar tamanho do disco
```bash
df -hT
```

Aumentar partição com fdisk
```bash
fdisk /dev/vda

passos:
p 
d -> 2
n -> e
p
n -> l -> N
x -> b
r
t -> 8e
w
```

Usar o partprobe não é necessário reinicialização da VM
```bash
apt install parted
partprobe /dev/vda
```

Verificar se existe espaço livre
```bash
lvs
pvs
vgs
```

Autmentar Phisical Volume no LVM
```bash
pvresize /dev/vda5
```

Verificar novamente se existe espaço livre
```bash
vgs
pvs
```

Em caso positivo, utilizar espaço livre para partição var neste caso.
```bash
lvextend -l +100%FREE /dev/mapper/k8s01--vg-var
```

Por final aumentar sistema de arquivos
```bash
resize2fs /dev/k8s01-vg/var
```

Verificar finalmente o novo tamanho do disco
```bash
df -Th
```

# Reduce LVM Volume

OBS.: Para o volume root é necessário bootar via live-cd

Caso precise montar volumes LVMs
```bash
vgchange -ay
```

#### Reduzinho um volume raiz

1 - Verificação do volume
```bash
e2fsck -fy /dev/mapper/k8s01--vg-root
```

2 - Reduzir sistema de arquivos para 10G
```bash
resize2fs /dev/mapper/k8s01--vg-root 10G
```

3 - Reduzir volume lógico para os 10G
```bash
lvreduce -L 10G /dev/mapper/k8s01--vg-root

ou reduzir espaço

lvreduce -L +10G /dev/mapper/k8s01--vg-root
```

4 - Executar resize2fs novamente
```bash
resize2fs /dev/mapper/k8s01--vg-root
```

5 - Reboot


#### Reduzinho um volume não raiz ex.: /var
1 - Desmontar partição / Volume
```bash
umount /var
```

2 - Verificação do volume
```bash
e2fsck -fy /dev/mapper/k8s01--vg-var
```

3 - Reduzir sistema de arquivos para 10G
```bash
resize2fs /dev/mapper/k8s01--vg-var 10G
```

4 - Reduzir volume lógico para os 10G
```bash
lvreduce -L 10G /dev/mapper/k8s01--vg-var

ou reduzir espaço

lvreduce -L -10G /dev/mapper/k8s01--vg-root
```

5 - Executar resize2fs novamente
```bash
resize2fs /dev/mapper/k8s01--vg-root
```

6 - Remontar partição/volume
```bash
mount /var
```

