import{_ as s,c as e,o as n,a}from"./app-Bk9c-78g.js";const l={},i=a(`<h1 id="metric-server" tabindex="-1"><a class="header-anchor" href="#metric-server"><span>Metric server</span></a></h1><p>kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml</p><p>Rodando:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl get pods --all-namespaces</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Conferindo se está funcionando:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">kubectl <span class="token function">top</span> nodes</span>
<span class="line"></span>
<span class="line">ou</span>
<span class="line"></span>
<span class="line">kubectl <span class="token function">top</span> pods --all-namespaces</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Caso não funcione:</p><p>faça o download</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">wget</span> https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>edit o arquivo:</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">vim components.yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>acrescente:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token number">125</span>   strategy:</span>
<span class="line"><span class="token number">126</span>     rollingUpdate:</span>
<span class="line"><span class="token number">127</span>       maxUnavailable: <span class="token number">0</span></span>
<span class="line"><span class="token number">128</span>   template:</span>
<span class="line"><span class="token number">129</span>     metadata:</span>
<span class="line"><span class="token number">130</span>       labels:</span>
<span class="line"><span class="token number">131</span>         k8s-app: metrics-server</span>
<span class="line"><span class="token number">132</span>     spec:</span>
<span class="line"><span class="token number">133</span>       containers:</span>
<span class="line"><span class="token number">134</span>       - args:</span>
<span class="line"><span class="token number">135</span>         - --cert-dir<span class="token operator">=</span>/tmp</span>
<span class="line"><span class="token number">136</span>         - --secure-port<span class="token operator">=</span><span class="token number">10250</span></span>
<span class="line"><span class="token number">137</span>         - --kubelet-preferred-address-types<span class="token operator">=</span>InternalIP,ExternalIP,Hostname</span>
<span class="line"><span class="token number">138</span>         - --kubelet-use-node-status-port</span>
<span class="line"><span class="token number">139</span>         - --metric-resolution<span class="token operator">=</span>15s</span>
<span class="line"><span class="token number">140</span>         - --kubelet-insecure-tls</span>
<span class="line"><span class="token number">141</span>         image: registry.k8s.io/metrics-server/metrics-server:v0.7.2</span>
<span class="line"><span class="token number">142</span>         imagePullPolicy: IfNotPresent</span>
<span class="line"><span class="token number">143</span>         livenessProbe:</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),r=[i];function t(p,c){return n(),e("div",null,r)}const o=s(l,[["render",t],["__file","metric-server.html.vue"]]),m=JSON.parse('{"path":"/br/kubernetes/metric-server.html","title":"Metric server","lang":"Português","frontmatter":{},"headers":[],"git":{"updatedTime":1749238271000,"contributors":[{"name":"Celso Nery","email":"celso.nery@gmail.com","commits":1}]},"filePathRelative":"br/kubernetes/metric-server.md"}');export{o as comp,m as data};
