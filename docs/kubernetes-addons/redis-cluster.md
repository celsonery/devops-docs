
kubectl create ns redis

kubectl get ns
---

#### Volumes
```yml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local-storage
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
reclaimPolicy: Delete
```

kubectl apply -f sc.yaml

kubectl get sc


```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: local-pv1
spec:
  storageClassName: local-storage
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/storage/data1"

---

apiVersion: v1
kind: PersistentVolume
metadata:
  name: local-pv2
spec:
  storageClassName: local-storage
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/storage/data2"

---

apiVersion: v1
kind: PersistentVolume
metadata:
  name: local-pv3
spec:
  storageClassName: local-storage
  capacity:
    storage: 2Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/storage/data3"
```

kubectl apply -f pv.yaml

kubectl get pv

#### ConfigMap

[ConfigMap](redis-configmap.yaml)

kubectl apply -n redis -f redis-config.yaml

kubectl get configmap -n redis

#### StatefulSet Application - redis-statefulset.yaml

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis
spec:
  serviceName: redis
  replicas: 3
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      initContainers:
      - name: config
        image: redis:6.2.3-alpine
        command: [ "sh", "-c" ]
        args:
          - |
            cp /tmp/redis/redis.conf /etc/redis/redis.conf
            
            echo "finding master..."
            MASTER_FDQN=`hostname  -f | sed -e 's/redis-[0-9]\./redis-0./'`
            if [ "$(redis-cli -h sentinel -p 5000 ping)" != "PONG" ]; then
              echo "master not found, defaulting to redis-0"

              if [ "$(hostname)" == "redis-0" ]; then
                echo "this is redis-0, not updating config..."
              else
                echo "updating redis.conf..."
                echo "slaveof $MASTER_FDQN 6379" >> /etc/redis/redis.conf
              fi
            else
              echo "sentinel found, finding master"
              MASTER="$(redis-cli -h sentinel -p 5000 sentinel get-master-addr-by-name mymaster | grep -E '(^redis-\d{1,})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})')"
              echo "master found : $MASTER, updating redis.conf"
              echo "slaveof $MASTER 6379" >> /etc/redis/redis.conf
            fi
        volumeMounts:
        - name: redis-config
          mountPath: /etc/redis/
        - name: config
          mountPath: /tmp/redis/
      containers:
      - name: redis
        image: redis:6.2.3-alpine
        command: ["redis-server"]
        args: ["/etc/redis/redis.conf"]
        ports:
        - containerPort: 6379
          name: redis
        volumeMounts:
        - name: data
          mountPath: /data
        - name: redis-config
          mountPath: /etc/redis/
      volumes:
      - name: redis-config
        emptyDir: {}
      - name: config
        configMap:
          name: redis-config
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: "local-storage"
      resources:
        requests:
          storage: 500Mi
```

kubectl apply -n redis -f redis-statefulset.yaml

kubectl get pods -n redis

#### Service
```yaml
apiVersion: v1
kind: Service
metadata:
  name: redis
spec:
  clusterIP: None
  ports:
  - port: 6379
    targetPort: 6379
    name: redis
  selector:
    app: redis
```

kubectl apply -n redis -f redis-service.yaml
kubectl get service -n redis

> syntax
pod_name.service_name.namespace.svc.cluster.local

> Example
redis-0.redis.redis.svc.cluster.local
redis-1.redis.redis.svc.cluster.local
redis-2.redis.redis.svc.cluster.local

---
# Check replication

#### Info replication

kubectl -n redis logs redis-0
kubectl -n redis describe pod redis-0

kubectl -n redis exec -it redis-0 -- sh
redis-cli 
auth a-very-complex-password-here
info replication


kubectl -n redis exec -it redis-1 -- sh
redis-cli 
auth a-very-complex-password-here
info replication

#### Test replication
kubectl -n redis exec -it redis-0 -- sh

redis-cli
auth a-very-complex-password-here
SET emp1 raja
SET emp2 mano
SET emp3 ram

KEYS *

1) "emp3"
2) "emp2"
3) "emp1"

kubectl -n redis exec -it redis-1 -- sh

redis-cli
auth a-very-complex-password-here
KEYS *