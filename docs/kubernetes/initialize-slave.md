# Initialize workers nodes

Perform below commands in the each node to ingress to cluster.

> Use the token and the key, that you saved before in the initialize master node.

```
kubeadm join 10.0.10.100:6443 --token 9e0xeu.s0if3... --discovery-token-ca-cert-hash sha256:3a328e56729515d...
```

> In the case you don't saved, you will be need generate a new token.

In the Control-Plane(Master) perform the below command:

```sh
# kubeadm token create --print-join-command
```

> Verify if the nodes are running.

```
kubectl get nodes

ou

kubectl get nodes -o wide
```
> PBS.: The **-o wide** option shows more information in the output.

> The output be should:
![verifing nodes](imgs/checando_nos_do_cluster.png)


## Verify Worker 3 without the Pool - OK
		kubectl describe node node3 | grep Taint 
		kubectl taint node node3 node.kubernetes.io/disk-pressure:NoSchedule-
