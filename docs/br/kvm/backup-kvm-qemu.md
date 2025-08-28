# Backup Configs KVM

Fazer backup das configurações do KVM/QEMU é uma boa prática para garantir que você possa restaurar suas máquinas virtuais (VMs) em caso de falhas ou migrações. A seguir estão os principais componentes a serem salvos e como fazer isso.

---

## 1. Backup das definições das VMs (libvirt)

Se você usa o **Libvirt**, as configurações das VMs ficam armazenadas em XML.

### Exportar configurações
```bash
virsh list --all           # Ver lista de VMs
virsh dumpxml nome-da-vm > nome-da-vm.xml
```

### Exportar todas de uma vez
```bash
for vm in $(virsh list --all --name); do
  virsh dumpxml $vm > "$vm.xml"
done
```

Guarde todos os arquivos `.xml` em um diretório de backup.

---

## 2. Backup das imagens de disco

As imagens de disco (normalmente `.qcow2`, `.img`, etc.) estão localizadas geralmente em:

- `/var/lib/libvirt/images/`
- ou outro diretório configurado.

### Copiar as imagens
```bash
cp /var/lib/libvirt/images/*.qcow2 /backup/dir/
```

### Backup incremental com rsync
```bash
rsync -avh /var/lib/libvirt/images/ /backup/dir/images/
```

---

## 3. Backup de configurações adicionais

### Diretórios importantes
- `/etc/libvirt/` – configurações de rede, storage pools, etc.
- `/etc/qemu/` – configurações específicas do QEMU.
- `/var/lib/libvirt/` – arquivos de estado e snapshots.

### Compactar as configurações
```bash
tar czvf libvirt-configs-backup.tar.gz /etc/libvirt /etc/qemu /var/lib/libvirt
```

---

## 4. Restauração

Para restaurar uma VM:
```bash
virsh define nome-da-vm.xml
```
Isso recria a definição da VM a partir do arquivo XML. As imagens de disco precisam estar no mesmo caminho ou ajustadas no XML.

---

## 5. Script de backup automático

Exemplo de script:
```bash
#!/bin/bash
BACKUP_DIR="/backup/kvm-$(date +%F)"
mkdir -p $BACKUP_DIR

# Backup das definições
for vm in $(virsh list --all --name); do
  virsh dumpxml $vm > "$BACKUP_DIR/$vm.xml"
done

# Backup das imagens de disco
rsync -avh /var/lib/libvirt/images/ "$BACKUP_DIR/images/"

# Backup das configurações
tar czf "$BACKUP_DIR/libvirt-configs.tar.gz" /etc/libvirt /etc/qemu /var/lib/libvirt
```

Agende esse script no `cron` para backups automáticos.
