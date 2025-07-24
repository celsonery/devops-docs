# eTotem PrintServer - Versão 1.0.0

## Objetivo e motivação

Levando em consideração a segurança dos Browsers, não seria possível enviar uma impressão diretamente para uma impressora, apenas através do diálog de impressão.

> Ao menos não facilmente sem abrir mão de mexer nas configurações dos Browsers.

A solução foi então desenvolver um servidor que ficaria residente aguardando uma solicitação de impressão. A solução foi desenvolvida utilizando Java com SpringBoot para a criação de uma API Rest para facilitar o envio da informação pelo Frontend.

## Requisitos

- Java JDK 17+
- Direitos administrativos
- Instalador

## Instalação

- Primeiramente instale o Java JDK 17+
- Após utilize o instalador do PrintServer

## Funcionamento

- O PrintServer irá funcionar como serviço do windows escutando na porta TCP 9200 utilizando o protocolo https.
- O PrintServer enviar para a impressora padrão do sistema onde está instalado.

## Desenvolvimento [ Técnico ]
#### Criação do .jar

- Primeiramente baixe o código do gitlab.
```sh
$ git clone https://gitlab.bagarote.com.br/karyon/etotem/printer.git
```

- Após gere o .jar utilizando o maven
```sh
$ mvnw package
```
OBS.: Isso irá gerar um arquivo "etotem-printer-1.0.0.jar" dentro da parta "target".

#### Criação do .jar como Serviço com WinWS
- Foi utilizado o utilitário WinWS [https://github.com/winsw/winsw] com o xml abaixo:

```xml
<service>
  <id>eTotemPrinter</id>
  <name>eTotem Servidor de Impressao</name>
  <description>Serviço de impressao do eTotem.</description>
  <env name="ETOTEM_HOME" value="%BASE%"/>
  <executable>java</executable>
  <arguments>-Xrs -Xmx256m -jar "%BASE%\etotem-printer-1.0.0.jar" --httpPort=9200</arguments>
  <log mode="roll"></log>
</service>
```

#### Criação do Instalador usando o Inno Setup
- Foi utilizado o Inno Setup para criar um instalador para a solução:
https://jrsoftware.org/isinfo.php

> Partes importantes do script setup.iss

```iss
[Files]
Source: "C:\Users\Celso\Devel\karyon\etotem\printer-instalador\{#MyAppExeName}"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\Users\Celso\Devel\karyon\etotem\printer-instalador\etotem-print.xml"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\Users\Celso\Devel\karyon\etotem\printer-instalador\etotem-printer-1.0.0.jar"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\Users\Celso\Devel\karyon\etotem\printer-instalador\printer.png"; DestDir: "{app}"; Flags: ignoreversion
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Run]
Filename: "{app}\{#MyAppExeName}"; Parameters: "install"; Flags: runhidden
Filename: "{app}\{#MyAppExeName}"; Parameters: "start"; Flags: runhidden
Filename: "{sys}\netsh.exe"; Parameters: "http add urlacl url=https://+:9200/ sddl="; Flags: runhidden

[UninstallRun]
Filename: "{app}\{#MyAppExeName}"; Parameters: "uninstall"; RunOnceId: "eTotemPrinterService"; Flags: runhidden

[UninstallDelete]
Name: "{app}\*"; Type: files;

```

## Conclusão

- Esta é uma versao inicial v1.0.0, a muito o que melhorar ainda, porém se mostra estável e funcional.
- O código completo da solução pode ser encontrado em: https://gitlab.bagarote.com.br/karyon/etotem/printer.

> Autores: Celso Nery <celso@karyon.com.br> | Marlon Xavier <marlon@karyon.com.br>