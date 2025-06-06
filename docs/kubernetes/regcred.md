# RegCred

 kubectl create secret docker-registry regcred -n bagarote-hml --docker-server=registry.bagarote.com.br --docker-username=celsonery --docker-password=XXXXXX --docker-email=celso@karyon.com.br

#### ou via yaml

- Crie um arquivo config.json
```json
{
	"auths": {
		"registry.bagarote.com.br": {
      "username": "celsonery",
      "password": "XXXXXX",
      "email": "celso@karyon.com.br"
    }
	}
}
```

- Criptografe o arquivo em base64
```sh
$ cat config.json | base64 -w 0
```

- Crie o regcred.yaml

 ```yaml
apiVersion: v1
kind: Secret
metadata:
  name: regcred
  namespace: karyon-dev
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: ewoJImF1dGhzIjogewoJCSJyZWdpc3RyeS5iYWdhcm90ZS5jb20uYnIiOiB7CiAgICAgICJ1c2VybmFtZSI6ICJjZWxzb25lcnkiLAogICAgICAicGFzc3dvcmQiOiAiWFhYWFhYIiwKICAgICAgImVtYWlsIjogImNlbHNvQGthcnlvbi5jb20uYnIiCiAgICB9Cgl9Cn0K
 ```

 - Por final suba para o kubernetes
 ```sh
 $ kubectl apply -f regcred.yaml
 ```
 