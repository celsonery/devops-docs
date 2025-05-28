import{_ as s,c as n,o as a,a as e}from"./app-hlzDzLSQ.js";const p={},l=e(`<h1 id="ingress-controller" tabindex="-1"><a class="header-anchor" href="#ingress-controller"><span>Ingress Controller</span></a></h1><ul><li><p>Site https://kubernetes.github.io/ingress-nginx/</p></li><li><p>Instalação via helm helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx --namespace ingress-nginx --create-namespace</p></li><li><p>Criar ingress.yaml</p></li></ul><div class="language-yaml line-numbers-mode" data-highlighter="prismjs" data-ext="yml" data-title="yml"><pre><code><span class="line"><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1</span>
<span class="line"><span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress</span>
<span class="line"><span class="token key atrule">metadata</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">name</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>hosts</span>
<span class="line">  <span class="token key atrule">annotations</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token key atrule">kubernetes.io/ingress.class</span><span class="token punctuation">:</span> <span class="token string">&quot;nginx&quot;</span></span>
<span class="line"><span class="token key atrule">spec</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token key atrule">rules</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> api.bagarote.com.br</span>
<span class="line">    <span class="token key atrule">http</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">pathType</span><span class="token punctuation">:</span> <span class="token string">&quot;Prefix&quot;</span></span>
<span class="line">        <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">&quot;/&quot;</span></span>
<span class="line">        <span class="token key atrule">backend</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">service</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">name</span><span class="token punctuation">:</span> api</span>
<span class="line">            <span class="token key atrule">port</span><span class="token punctuation">:</span></span>
<span class="line">              <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">8082</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> adm.bagarote.com.br</span>
<span class="line">    <span class="token key atrule">http</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">pathType</span><span class="token punctuation">:</span> <span class="token string">&quot;Prefix&quot;</span></span>
<span class="line">        <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">&quot;/&quot;</span></span>
<span class="line">        <span class="token key atrule">backend</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">service</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">name</span><span class="token punctuation">:</span> adm</span>
<span class="line">            <span class="token key atrule">port</span><span class="token punctuation">:</span></span>
<span class="line">              <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">80</span></span>
<span class="line">  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> site.bagarote.com.br</span>
<span class="line">    <span class="token key atrule">http</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token key atrule">paths</span><span class="token punctuation">:</span></span>
<span class="line">      <span class="token punctuation">-</span> <span class="token key atrule">pathType</span><span class="token punctuation">:</span> <span class="token string">&quot;Prefix&quot;</span></span>
<span class="line">        <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">&quot;/&quot;</span></span>
<span class="line">        <span class="token key atrule">backend</span><span class="token punctuation">:</span></span>
<span class="line">          <span class="token key atrule">service</span><span class="token punctuation">:</span></span>
<span class="line">            <span class="token key atrule">name</span><span class="token punctuation">:</span> site</span>
<span class="line">            <span class="token key atrule">port</span><span class="token punctuation">:</span></span>
<span class="line">              <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">80</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),t=[l];function i(c,o){return a(),n("div",null,t)}const r=s(p,[["render",i],["__file","ingress-controller.html.vue"]]),k=JSON.parse('{"path":"/kubernetes-addons/ingress-controller.html","title":"Ingress Controller","lang":"en-US","frontmatter":{},"headers":[],"git":{"updatedTime":1748359938000,"contributors":[{"name":"Celso Nery","email":"celso.nery@gmail.com","commits":1}]},"filePathRelative":"kubernetes-addons/ingress-controller.md"}');export{r as comp,k as data};
