# Backup of VMs KVM in Prod

Este guia descreve como realizar backups de VMs em produção usando **KVM/QEMU** no **openSUSE Tumbleweed**, sem desligá-las, através de snapshots com `virsh`.

---

## Pré-requisitos

- Servidor com **libvirt** e **qemu-kvm** instalados.
- **qemu-guest-agent** instalado e rodando dentro de cada VM.
- Espaço suficiente em disco para armazenar os snapshots temporários e o backup.
- As imagens das VMs localizadas em `/var/lib/libvirt/images/` ou outro diretório conhecido.

---

## Passo a passo

### 1. Criar snapshot externo da VM

Este comando cria um snapshot somente de disco, de forma atômica, congelando o sistema de arquivos dentro da VM (se suportado).

```bash
virsh snapshot-create-as --domain NOME_DA_VM snapshot-backup --disk-only --atomic --no-metadata --quiesce
```

**Parâmetros importantes:**
- `--disk-only`: Snapshot apenas do disco, sem estado da memória.
- `--atomic`: Garante que todas as alterações sejam aplicadas de forma consistente.
- `--no-metadata`: Não registra o snapshot na configuração permanente da VM.
- `--quiesce`: Congela o sistema de arquivos (requer `qemu-guest-agent`).

---

### 2. Localizar o disco da VM

```bash
virsh domblklist NOME_DA_VM
```

Saída exemplo:
```
Target   Source
------------------------------------------------
vda      /var/lib/libvirt/images/vm1.qcow2
```

---

### 3. Copiar o disco da VM para o local de backup

```bash
rsync -avh /var/lib/libvirt/images/vm1.qcow2 /mnt/backup/
```

> **Dica:** O `rsync` permite cópias incrementais, acelerando backups subsequentes.

---

### 4. Excluir snapshot e mesclar alterações

Após a cópia, é necessário aplicar as alterações feitas durante o snapshot de volta ao disco principal:

```bash
virsh blockcommit NOME_DA_VM vda --active --pivot
```

---

### 5. Confirmar a restauração do caminho original do disco

```bash
virsh domblklist NOME_DA_VM
```

---

## Automação com Script

```bash
#!/bin/bash

VM_NAME=$1
BACKUP_DIR="/mnt/backup/$VM_NAME"
DATE=$(date +%F)

mkdir -p "$BACKUP_DIR/$DATE"

virsh snapshot-create-as --domain "$VM_NAME" snapshot-backup --disk-only --atomic --no-metadata --quiesce

DISK_PATH=$(virsh domblklist "$VM_NAME" | grep vda | awk '{print $2}')
rsync -avh "$DISK_PATH" "$BACKUP_DIR/$DATE/"

virsh blockcommit "$VM_NAME" vda --active --pivot
```

Uso:
```bash
./backup_vm.sh NOME_DA_VM
```
