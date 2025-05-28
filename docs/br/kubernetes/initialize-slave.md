# Ingressando nós escravos

Execute o comando abaixo em cada nó que desejar ingressar no cluster
> Utilize o token e a chave que recebeu ao iniciar o nó mestre.

```
kubeadm join 10.0.10.100:6443 --token 9e0xeu.s0if3... --discovery-token-ca-cert-hash sha256:3a328e56729515d...
```

> Caso não lembre ou não tenha guardado, será preciso gerar um novo token.

No Control-Plane execute o seguinte comando:

```sh
# kubeadm token create --print-join-command
```

> Verique no master os nós em execução

```
kubectl get nodes

ou

kubectl get nodes -o wide
```
> OBS.: A opção **-o wide** acrecenta mais informações a saida

> A Saída deve ser parecida com essa:
![verificadndo nos do cluester](imgs/checando_nos_do_cluster.png)


- Verificar Worker 3 fora do Pool - OK
		kubectl --kubeconfig=/home/celso/.kube/config.bagarote describe node node3 | grep Taint 
		kubectl --kubeconfig=/home/celso/.kube/config.bagarote taint node node3 node.kubernetes.io/disk-pressure:NoSchedule-
