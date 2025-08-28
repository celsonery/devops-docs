# Backup Configs of KVM

Backing up your KVM configuration is a good practice to ensure you can restore your virtual machines (VMs) in the event of a failure of migration. Below are the main components to beck up and how to do it.

---

## 1. Backup of definitions of VMs (libvirt)

If you use the **Libvirt**, the VMs configurations is stored in XML.

### Export configurations
```bash
virsh list --all           # See VMs list
virsh dumpxml name-of-vm > name-of-vm.xml
```

### Export all
```bash
for vm in $(virsh list --all --name); do
  virsh dumpxml $vm > "$vm.xml"
done
```

Save the all files `.xml` in the backup folder.

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
