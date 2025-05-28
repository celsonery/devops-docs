import{_ as s,c as e,o as a,a as n}from"./app-CNaaTsHW.js";const i={},t=n(`<h1 id="postgres-no-zabbix" tabindex="-1"><a class="header-anchor" href="#postgres-no-zabbix"><span>Postgres no Zabbix</span></a></h1><h4 id="configuracao-no-postgres" tabindex="-1"><a class="header-anchor" href="#configuracao-no-postgres"><span>Configuração no Postgres</span></a></h4><p>Crie um usuário para o zabbix no postgres</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">CREATE USER zbx_monitor WITH PASSWORD &#39;xxxxx&#39; INHERIT;</span>
<span class="line">GRANT pg_monitor TO zbx_monitor;</span>
<span class="line"></span>
<span class="line">Edite o arquivo **pg_hba.conf**</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>vim /var/lib/pgsql/data/pg_hba.conf</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"></span>
<span class="line">Acrescente as linhas abaixo</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>host all zbx_monitor 127.0.0.1/32 trust host all zbx_monitor 0.0.0.0/0 md5 host all zbx_monitor ::0/0 md5</p><p>... local all</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"></span>
<span class="line"></span>
<span class="line">Restart o servidor postgresql</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>systemctl restart postgresql.service</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"></span>
<span class="line">Teste a conexão com o novo usuário</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>sudo -u postgres --username=zbx_monitor postgres</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line"></span>
<span class="line">&gt; O sistema não deve pedir senha</span>
<span class="line"></span>
<span class="line">&gt; Finalizada a configuração por parte do Postgres</span>
<span class="line"></span>
<span class="line"></span>
<span class="line">#### Configuração no zabbix_agent</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),l=[t];function r(d,o){return a(),e("div",null,l)}const c=s(i,[["render",r],["__file","zabbix-postgres.html.vue"]]),m=JSON.parse('{"path":"/br/postgres/zabbix-postgres.html","title":"Postgres no Zabbix","lang":"pt-BR","frontmatter":{},"headers":[],"git":{"updatedTime":1748443627000,"contributors":[{"name":"Celso Nery","email":"celso.nery@gmail.com","commits":1}]},"filePathRelative":"br/postgres/zabbix-postgres.md"}');export{c as comp,m as data};
