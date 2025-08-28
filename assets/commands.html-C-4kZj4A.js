import{_ as s,c as a,o as n,a as e}from"./app-CT-lU83C.js";const l={},i=e(`<h1 id="commandos" tabindex="-1"><a class="header-anchor" href="#commandos"><span>Commandos</span></a></h1><p>minkube manual</p><h1 id="iniciando-cluster-kubernetes-minikube" tabindex="-1"><a class="header-anchor" href="#iniciando-cluster-kubernetes-minikube"><span>Iniciando cluster kubernetes - minikube</span></a></h1><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">minikube version</span>
<span class="line">minikube start</span>
<span class="line"></span>
<span class="line">kubectl version</span>
<span class="line">kubectl cluster-info</span>
<span class="line">kubectl get nodes</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="deploy-de-uma-aplicacao-minikube" tabindex="-1"><a class="header-anchor" href="#deploy-de-uma-aplicacao-minikube"><span>Deploy de uma aplicacao - minikube</span></a></h1><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl run kubernetes-bootcamp <span class="token parameter variable">--image</span><span class="token operator">=</span>gcr.io/google-samples/kubernetes-bootcamp:v1 <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">8080</span></span>
<span class="line"></span>
<span class="line">kubectl get deployments</span>
<span class="line"></span>
<span class="line">kubectl proxy</span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">POD_NAME</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>kubectl get pods <span class="token parameter variable">-o</span> go-template <span class="token parameter variable">--template</span> <span class="token string">&#39;{{range .items}}{{.metadata.name}}{{&quot;\\n&quot;}}{{end}}&#39;</span><span class="token variable">)</span></span></span>
<span class="line"><span class="token builtin class-name">echo</span> Name of the Pod: <span class="token variable">$POD_NAME</span></span>
<span class="line"></span>
<span class="line"><span class="token function">curl</span> http://localhost:8001/api/v1/namespaces/default/pods/<span class="token variable">$POD_NAME</span>/proxy/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="visualizando-pods-e-nos" tabindex="-1"><a class="header-anchor" href="#visualizando-pods-e-nos"><span>Visualizando pods e nos</span></a></h1><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl get - listar recursos</span>
<span class="line">kubectl describe - mostra informações detalhadas sobre um recurso</span>
<span class="line">kubectl logs - imprima os logs de um contêiner em um pod</span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> - executa um comando em um container em um pod</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl get pods</span>
<span class="line">kubectl describe pods</span>
<span class="line">kubectl logs <span class="token variable">$POD_NAME</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token variable">$POD_NAME</span> <span class="token function">env</span></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> <span class="token variable">$POD_NAME</span> -- <span class="token function">bash</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="expondo-a-aplicacao" tabindex="-1"><a class="header-anchor" href="#expondo-a-aplicacao"><span>Expondo a aplicacao</span></a></h1><p>1 - Criando novo servico</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl get pods</span>
<span class="line">kubectl get services</span>
<span class="line"></span>
<span class="line">kubectl expose deployment/kubernetes-bootcamp <span class="token parameter variable">--type</span><span class="token operator">=</span><span class="token string">&quot;NodePort&quot;</span> <span class="token parameter variable">--port</span> <span class="token number">8080</span></span>
<span class="line"></span>
<span class="line">kubectl get services</span>
<span class="line"></span>
<span class="line">kubectl describe services/kubernetes-bootcamp</span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">NODE_PORT</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>kubectl get services/kubernetes-bootcamp <span class="token parameter variable">-o</span> go-template<span class="token operator">=</span><span class="token string">&#39;{{(index .spec.ports 0).nodePort}}&#39;</span><span class="token variable">)</span></span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token assign-left variable">NODE_PORT</span><span class="token operator">=</span><span class="token variable">$NODE_PORT</span></span>
<span class="line"></span>
<span class="line"><span class="token function">curl</span> <span class="token variable"><span class="token variable">$(</span>minikube <span class="token function">ip</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable">$NODE_PORT</span></span>
<span class="line"></span>
<span class="line">kubectl describe deployment</span>
<span class="line">kubectl get pods <span class="token parameter variable">-l</span> <span class="token assign-left variable">run</span><span class="token operator">=</span>kubernetes-bootcamp</span>
<span class="line">kubectl get services <span class="token parameter variable">-l</span> <span class="token assign-left variable">run</span><span class="token operator">=</span>kubernetes-bootcamp</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2 - Usando labels</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl describe deployment</span>
<span class="line"></span>
<span class="line">kubectl get pods <span class="token parameter variable">-l</span> <span class="token assign-left variable">run</span><span class="token operator">=</span>kubernetes-bootcamp</span>
<span class="line"></span>
<span class="line">kubectl get services <span class="token parameter variable">-l</span> <span class="token assign-left variable">run</span><span class="token operator">=</span>kubernetes-bootcamp</span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">POD_NAME</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>kubectl get pods <span class="token parameter variable">-o</span> go-template <span class="token parameter variable">--template</span> <span class="token string">&#39;{{range .items}}{{.metadata.name}}{{&quot;\\n&quot;}}{{end}}&#39;</span><span class="token variable">)</span></span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> name of the pod: <span class="token variable">$POD_NAME</span></span>
<span class="line"></span>
<span class="line">kubectl label pod <span class="token variable">$POD_NAME</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>v1</span>
<span class="line"></span>
<span class="line">kubectl describe pods <span class="token variable">$POD_NAME</span></span>
<span class="line"></span>
<span class="line">kubectl get pods <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>v1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3 - Deletando um service</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl delete <span class="token function">service</span> <span class="token parameter variable">-l</span> <span class="token assign-left variable">run</span><span class="token operator">=</span>kubernetes-bootcamp</span>
<span class="line"></span>
<span class="line">kubectl get services</span>
<span class="line"></span>
<span class="line"><span class="token function">curl</span> <span class="token variable"><span class="token variable">$(</span>minikube <span class="token function">ip</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable">$NODE_PORT</span></span>
<span class="line"></span>
<span class="line">kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> <span class="token variable">$POD_NAME</span> <span class="token function">curl</span> localhost:8080</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="escalando-a-aplicacao" tabindex="-1"><a class="header-anchor" href="#escalando-a-aplicacao"><span>Escalando a aplicacao</span></a></h1><p>1 - Escalando um deployment</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl get deployments</span>
<span class="line"></span>
<span class="line">kubectl scale deployments/kubernetes-bootcamp <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">4</span></span>
<span class="line"></span>
<span class="line">kubectl get deployments</span>
<span class="line"></span>
<span class="line">kubectl get pods <span class="token parameter variable">-o</span> wide</span>
<span class="line">kubectl describe deployments/kubernetes-bootcamp</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2 - Load Balancing</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl describe services/kubernetes-bootcamp</span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">NODE_PORT</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>kubectl get services/kubernetes-bootcamp <span class="token parameter variable">-o</span> go-template<span class="token operator">=</span><span class="token string">&#39;{{(index .spec.ports 0).nodePort}}&#39;</span><span class="token variable">)</span></span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token assign-left variable">NODE_PORT</span><span class="token operator">=</span><span class="token variable">$NODE_PORT</span></span>
<span class="line"></span>
<span class="line"><span class="token function">curl</span> <span class="token number">4</span><span class="token punctuation">(</span>minikube <span class="token function">ip</span><span class="token punctuation">)</span>:<span class="token variable">$NODE_PORT</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3 - Diminuindo a Escala</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl scale deployments/kubernetes-bootcamp <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">2</span></span>
<span class="line"></span>
<span class="line">kubectl get deployments</span>
<span class="line"></span>
<span class="line">kubectl get pods <span class="token parameter variable">-o</span> wide</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="atualizacao-continua" tabindex="-1"><a class="header-anchor" href="#atualizacao-continua"><span>Atualizacao continua</span></a></h1><p>1 - Atualizando a versao do app</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl get deployments</span>
<span class="line"></span>
<span class="line">kubectl get pods</span>
<span class="line"></span>
<span class="line">kubectl describe pods</span>
<span class="line"></span>
<span class="line">kubectl <span class="token builtin class-name">set</span> image deployments/kubernetes-bootcamp kubernetes-bootcamp<span class="token operator">=</span>jocatalin/kubernetes-bootcamp:v2</span>
<span class="line"></span>
<span class="line">kubectl get pods</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2 - Verificando uma atualizacao</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl describe services/kubernetes-bootcamp</span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">NODE_PORT</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>kubectl get services/kubernetes-bootcamp <span class="token parameter variable">-o</span> go-template<span class="token operator">=</span><span class="token string">&#39;{{(index .spec.ports 0).nodePort}}&#39;</span><span class="token variable">)</span></span></span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">echo</span> <span class="token variable">$NODE_PORT</span></span>
<span class="line"></span>
<span class="line"><span class="token function">curl</span> <span class="token variable"><span class="token variable">$(</span>minikube <span class="token function">ip</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable">$NODE_PORT</span></span>
<span class="line"></span>
<span class="line">kubectl rollout status</span>
<span class="line">deployments/kubernetes-bootcamp</span>
<span class="line"></span>
<span class="line">kubectl describe pods</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3 - Voltando uma atualizacao</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl <span class="token builtin class-name">set</span> image deployments/kubernetes<span class="token operator">=</span>bootcamp kubernetes-bootcamp<span class="token operator">=</span>gcr.io/google-samples/kubernetes-bootcamp:v10</span>
<span class="line"></span>
<span class="line">kubectl get deployments</span>
<span class="line"></span>
<span class="line">kubectl get pods</span>
<span class="line"></span>
<span class="line">kubectl describe pods</span>
<span class="line"></span>
<span class="line">kubectl rollout undo deployments/kubernetes-bootcamp</span>
<span class="line"></span>
<span class="line">kubectl get pods</span>
<span class="line"></span>
<span class="line">kubectl describe pods</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,32),p=[i];function c(t,r){return n(),a("div",null,p)}const o=s(l,[["render",c],["__file","commands.html.vue"]]),b=JSON.parse('{"path":"/br/kubernetes/commands.html","title":"Commandos","lang":"Português","frontmatter":{},"headers":[],"git":{"updatedTime":1749238271000,"contributors":[{"name":"Celso Nery","email":"celso.nery@gmail.com","commits":1}]},"filePathRelative":"br/kubernetes/commands.md"}');export{o as comp,b as data};
