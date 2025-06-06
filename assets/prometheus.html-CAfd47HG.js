import{_ as e,c as s,o as a,a as n}from"./app-CO5cCj3i.js";const i={},l=n(`<h1 id="prometheus" tabindex="-1"><a class="header-anchor" href="#prometheus"><span>Prometheus</span></a></h1><p>1 - Instale o Helm</p><p>2 - Instale ou confirme se o Metrics-server está instalado</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl <span class="token function">top</span> nodes</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>3 - Instale o prometheus</p><p>https://artifacthub.io/</p><p>Instalar o Chart</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token variable">$helm</span> repo <span class="token function">add</span> prometheus-community https://prometheus-community.github.io/helm-charts</span>
<span class="line"></span>
<span class="line">$ helm repo update</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>$ helm repo list</p><p>$ helm show values prometheus-community/prometheus &gt; prometheus-values.yaml</p><p>$ helm install prometheus prometheus-community/prometheus --values prometheus-values.yaml</p><p>testar</p><p>https://adm.bagarote.com.br:30001</p><p>https://adm.bagarote.com.br:30001/metrics</p><p>Habilitar a aplicacao</p><p>adicionar no manifest da aplicacao</p><p>spec: template: metadata: annotacions: prometheus.io/scrape: &quot;true&quot; prometheus.io/path: /metrics prometheus.io/port: &quot;8080&quot; labels: app: api ...</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"></span>
<span class="line">#### Kube-state-metrics</span>
<span class="line"></span>
<span class="line">1 - service-account.yaml</span>
<span class="line">2 - cluster-role.yaml</span>
<span class="line">3 - cluster-role-binding.yaml</span>
<span class="line">4 - deployment.yaml</span>
<span class="line">5 - service.yaml</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">## Instalação via yaml</span>
<span class="line">1 - namespace</span>
<span class="line">2 - clusterRole</span>
<span class="line">3 - config-map</span>
<span class="line">4 - prometheus-deployment</span>
<span class="line">5 - prometheus-service</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),t=[l];function p(r,c){return a(),s("div",null,t)}const o=e(i,[["render",p],["__file","prometheus.html.vue"]]),d=JSON.parse('{"path":"/kubernetes-addons/prometheus.html","title":"Prometheus","lang":"en-US","frontmatter":{},"headers":[],"git":{"updatedTime":1748359938000,"contributors":[{"name":"Celso Nery","email":"celso.nery@gmail.com","commits":1}]},"filePathRelative":"kubernetes-addons/prometheus.md"}');export{o as comp,d as data};
