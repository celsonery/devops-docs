import{_ as n,c as e,o as s,a}from"./app-CO5cCj3i.js";const i={},l=a(`<h1 id="criando-primeiro-container" tabindex="-1"><a class="header-anchor" href="#criando-primeiro-container"><span>Criando primeiro container</span></a></h1><p>Crie o diretório para o container</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">mkdir nginx</span>
<span class="line">cd nginx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>Crie o arquivo do container <strong>nginx-deployment</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">apiVersion: apps/v1</span>
<span class="line">kind: Deployment</span>
<span class="line">metadata:</span>
<span class="line">  name: nginx-deployment</span>
<span class="line">  labels:</span>
<span class="line">    app: nginx</span>
<span class="line">spec:</span>
<span class="line">  replicas: 3</span>
<span class="line">  selector:</span>
<span class="line">    matchLabels:</span>
<span class="line">      app: nginx</span>
<span class="line">  template:</span>
<span class="line">    metadata:</span>
<span class="line">      labels:</span>
<span class="line">        app: nginx</span>
<span class="line">    spec:</span>
<span class="line">      containers:</span>
<span class="line">      - name: nginx</span>
<span class="line">        image: nginx:1.14.0</span>
<span class="line">        ports:</span>
<span class="line">        - containerPort: 80</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Executando o container</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">kubectl apply -f nginx-deployment.yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Verficando o container</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">kubectl get deployments</span>
<span class="line">kubectl describe deployment nginx-deployment</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>Agora crie o serviço para o container no arquivo <strong>nginx-service.yaml</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">apiVersion: v1</span>
<span class="line">kind: Service</span>
<span class="line">metadata:</span>
<span class="line">  name: nginx-service</span>
<span class="line">  labels:</span>
<span class="line">    run: nginx-service</span>
<span class="line">spec:</span>
<span class="line">  type: NodePort</span>
<span class="line">  ports:</span>
<span class="line">  - port: 80</span>
<span class="line">    protocol: TCP</span>
<span class="line">  selector:</span>
<span class="line">    app: nginx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Crie o serviço</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">kubectl apply -f nginx-service.yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Verficando o serviço</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">kubectl get service</span>
<span class="line">kubectl describe service nginx-service</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,15),r=[l];function t(d,c){return s(),e("div",null,r)}const v=n(i,[["render",t],["__file","using.html.vue"]]),o=JSON.parse('{"path":"/br/kubernetes/using.html","title":"Criando primeiro container","lang":"Português","frontmatter":{},"headers":[],"git":{"updatedTime":1748002949000,"contributors":[{"name":"Celso Nery","email":"celso.nery@gmail.com","commits":1}]},"filePathRelative":"br/kubernetes/using.md"}');export{v as comp,o as data};
