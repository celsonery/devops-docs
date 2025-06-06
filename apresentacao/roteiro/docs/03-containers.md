# Containers

Os containers têm facilitado o desenvolvimento ágil e aplicação da metodologia Devops e isso tem aquecido o mercado e soluções poderosas têm sido disponibilizadas. O Google usa containers a mais de 1 década. Mas o assunto nunca foi tão comentado ultimamente, acompanhado de uso de Cloud Computing.

Os containers substituem a virtualização com Hypervisor, então precisamos entender o que cada um oferece para termos certeza de uma escolha assertiva.

### O que são?

Os containers permitem que uma aplicação rode de forma encapsulada em cima de um único sistema operacional hospedeiro, onde o código, bibliotecas e todas as suas dependências são carregadas e executadas de forma independente.

Cada container compartilha o kernel do host e geralmente, os binários e bibliotecas também. 

Componentes compartilhados são somente leitura e isso torna os containers excepcionalmente leve. 
Os containers têm tamanhos estimados em MB e levam segundos para serem iniciados contra os minutos e os vários gigabytes de uma VM inteira.

Containers fornecem o básico necessário para qualquer aplicativo ser executado em um sistema operacional hospedeiro.

Além disso os containers reduzem a carga de trabalho na gestão dos sistemas operacionais, já que eles compartilham o mesmo kernel, você terá menos sistemas em seus servidores para gerenciar pacotes de atualização e segurança.

### Estrutura
Através de recursos como (Namespaces / chroot / cgroups ) containers isolam processos e passam a gerir totalmente os recursos e garantem a segurança necessária.

- Namespaces no sistema Linux ajuda os processos a terem seu próprio ambiente.
- Chroot isola os namespaces do resto do sistema e assim protege contra ataques ou interferência de outros containers no mesmo host.
- Cgroups é um recurso do kernel Linux responsável por controlar a utilização de recursos como CPU, MEMÓRIA, I/O de DISCO e de REDE.

> Esses 3 ingredientes criam a magia da virtualização dos Containers.

Existem várias implementações de containers (**rocket, docker, systemd-nspawn**), sendo a mais utilizada e mais conhecida no momento é o **Docker**.

Assim como nos hypervisors os containers também possuem tipos, **CONTAINERS DE SERVIÇOS** e **CONTAINERS DE APLICAÇÕES**, o **Docker** se encaixa no grupo de **CONTAINER DE APLICAÇÃO**.

### Dados

Segundo um relatório da DATADOG ( empresa com uma plataforma de monitoramento de infraestrutura de TI em SaaS) mostra em 2015 um aumento de containers em 5x em apenas 1 ano.

Os containers permitem adoção híbrida e multicloud.

Uma vez conteinerizados, os aplicativos podem ser implantados em qualquer infraestrutura, Sejam elas máquinas virtuais, bare-metal ou nuvens públicas que executam diferentes hypervisors. 