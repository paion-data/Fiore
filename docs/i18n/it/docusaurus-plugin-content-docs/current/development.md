---
sidebar_position: 2
title: Sviluppo
---

La seguente guida è pensata per aiutare gli sviluppatori che si occupano della manutenzione di Fiore o desiderano
apportare modifiche.

Preparazione per lo sviluppo locale
-----------------------------------

Questa sezione illustra la configurazione iniziale per sviluppare Fiore.

### Installazione di Java e Maven (su Mac)

```bash
brew update
brew install openjdk@17
```

Alla fine dell'ultimo prompt dei comandi, apparirà qualcosa di simile a quanto segue:

```bash
For the system Java wrappers to find this JDK, symlink it with
  sudo ln -sfn ...openjdk@17/libexec/openjdk.jdk .../JavaVirtualMachines/openjdk-17.jdk

openjdk@17 is keg-only, which means it was not symlinked into /usr/local,
because this is an alternate version of another formula.

If you need to have openjdk@17 first in your PATH, run:
  echo 'export PATH=".../openjdk@17/bin:$PATH"' >> .../.bash_profile

For compilers to find openjdk@17 you may need to set:
  export CPPFLAGS="-I.../openjdk@17/include"
```

Assicurati di eseguire i comandi `sudo ln -sfn`, `echo 'export PATH=...` e `export CPPFLAGS=` sopra.

:::suggerimento

Fiore è compilato con Maven. Maven utilizza una versione separata del JDK, che può essere visualizzata tramite `mvn -v`.
Se non è JDK 17, dovremmo fare in modo che Maven punti al nostro JDK 17 usando
[JAVA_HOME](https://stackoverflow.com/a/2503679):

```bash
$ /usr/libexec/java_home
/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home

$ export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
```

:::

Se vediamo qualcosa di simile dopo aver digitato il comando con il flag di versione qui sotto, siamo a posto.

```bash
$ java --version
openjdk 17.0.10 2021-01-19
OpenJDK Runtime Environment (build 17.0.10+9)
VM Server OpenJDK a 64 bit (build 17.0.10+9, modalità mista)
```

### Installazione di Docker Engine

Fiore dispone di [test di integrazione basati su Docker]; supporta anche
[l'esecuzione di template webservice in Docker][Fiore Dockerfile]. Docker può essere installato seguendo le sue
[istruzioni ufficiali](https://docs.docker.com/desktop/install/mac-install/)

Ottenere il codice sorgente
-------------------

```bash
git clone git@github.com:QubitPi/Fiore.git
cd Fiore
```

### Sincronizzazione con gli stili di codice di Fiore con IntelliJ

Per il momento, abbiamo sintetizzato le convenzioni di stile più importanti relative al codice di Fiore come
impostazioni di IntelliJ. Se IntelliJ viene utilizzato per l'IDE, è possibile importare queste impostazioni di stile del
codice importando il file [Fiore-Project-intellij-code-style.xml][Configurazione stile] nella radice del repository. Le
impostazioni per il progetto appariranno come un nuovo schema denominato "Fiore-Project" nella sezione __Editor__ ->
__Stile Codice__ dell'IDE.

Abilitare anche "rimuovi importazioni inutilizzate" da __Editor__ -> __Generale__ -> __Importazione Automatica__ ->
__Ottimizza Importazioni al Volo__, che rimuoverà automaticamente le importazioni inutilizzate.

Esecuzione dei test
-------------------

I seguenti comandi eseguono sia test unitari che di integrazione:

:::tip

Se i test falliscono con 404 o endpoint-not-working, assicurarsi che la porta 8080 non sia occupata. Tutti i test di
integrazione vengono eseguiti sul servizio web in esecuzione su quella porta.

:::

```bash
mvn clean verify
```

Per i test IT, utilizziamo [Testcontainers] invece di [jcabi-mysql] perché quest'ultimo è difficile da configurare e
debuggare e [Testcontainers] supporta più tipi di database, come mongo

Creazione di pacchetti
----------------------

Un [file WAR](https://en.wikipedia.org/wiki/WAR_(file_format)) denominato __fiore-1.0-SNAPSHOT.war__
verrà generato nella directory _target_ per [l'esecuzione in Jetty](#running-webservice-in-standalone-jetty-production)
con il comando seguente:

```bash
mvn clean package
```

Esecuzione del servizio web in Docker
-------------------------------------

Assicurarsi che Docker sia installato
([_Installing Docker_](https://docker.qubitpi.org/desktop/setup/install/mac-install/)), quindi esegui i seguenti
comandi:

### Ottenere l'immagine

Possiamo ottenere l'immagine in uno dei 2 modi seguenti:

#### Docker Hub

Possiamo estrarre l'immagine dal [mio Docker Hub](https://hub.docker.com/r/jack20191124/fiore/):

```bash
docker pull jack20191124/fiore
```

#### GitHub

Possiamo anche compilare l'immagine da [source][Docker]:

```bash
git clone https://github.com/QubitPi/Fiore.git
cd Fiore
docker build -t jack20191124/fiore .
```

Si noti che `jack20191124/fiore` nell'ultimo comando è il nome dell'immagine; possiamo sostituire quel valore con
qualsiasi altro valore desiderato.

### Creazione di un container

Una volta creata l'immagine, possiamo creare un'istanza con

:::info

Sostituire `OPENAI_API_KEY` qui sotto con la chiave effettiva che può essere ottenuta
[qui](https://platform.openai.com/api-keys)

:::

```console
export OPENAI_API_KEY=...
docker run --name=fiore -it \
-p 8080:8080 \
-e OPENAI_API_KEY=$OPENAI_API_KEY \
jack20191124/fiore
```

- __name=fiore__: il container si chiama "fiore". Possiamo modificarlo di conseguenza.
- __-p 8080:8080__: 8080 è la porta su cui il servizio web sarà in ascolto. Con questo port forwarding, saremo in grado
  di accedere al servizio web dal browser web della macchina host all'indirizzo `localhost:8080`

Se visualizziamo il seguente output, significa che il contenitore è in esecuzione correttamente ed è pronto ad accettare
richieste come `http://localhost:8080/v1/healthcheck`

```bash
...

2023-10-24 05:21:46.032:INFO :oejss.DefaultSessionIdManager:main: Session workerName=node0
2023-10-24 05:21:46.977:INFO :oejsh.ContextHandler:main: Started o.e.j.w.WebAppContext@2892dae4{ROOT.war,/,file:///tmp/jetty-0_0_0_0-8080-ROOT_war-_-any-13760845903749066689/webapp/,AVAILABLE}{/jetty-base/webapps/ROOT.war}
2023-10-24 05:21:46.994:INFO :oejs.AbstractConnector:main: Started ServerConnector@5c8dfc08{HTTP/1.1, (http/1.1)}{0.0.0.0:8080}
2023-10-24 05:21:47.009:INFO :oejs.Server:main: Started Server@71d44a3{STARTING}[11.0.15,sto=5000] @2947ms
```

Esecuzione del servizio Web in Jetty autonomo
---------------------------------------------

### Scarica Jetty

Per JDK __17__, la versione su cui gira Fiore, è stato testato che Jetty _11.0.15_ funzionava. Pertanto, useremo la
versione ["11.0.15"](https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-home/11.0.15/jetty-home-11.0.15.tar.gz) come
esempio:

![Errore durante il caricamento di download-jetty.png](img/download-jetty.png)

Inserisci il file `tar.gz` in una posizione a tua scelta come percorso di installazione ed estrai il binario Jetty
usando

```bash
tar -xzvf jetty-home-11.0.15.tar.gz
```

La directory estratta *jetty-home-11.0.15* è la distribuzione Jetty. Chiamiamo questa directory __$JETTY_HOME__, che
non deve essere modificata.

### Configurazione di Jetty standalone

Il nostro [file WAR](#creazione-di-pacchetti) verrà copiato in una directory da cui Jetty potrà essere prelevato ed
eseguito. Chiamiamo questa directory __$JETTY_BASE__, che solitamente è diversa da _$JETTY_HOME_. _$JETTY_BASE_ contiene
anche le configurazioni di runtime del container. In breve, il contenitore Jetty autonomo verrà configurato con:

```bash
export JETTY_HOME=/path/to/jetty-home-11.0.15
mkdir -p /path/to/jetty-base
cd /path/to/jetty-base
java -jar $JETTY_HOME/start.jar --add-module=annotations,server,http,deploy,servlet,webapp,resources,jsp
```

dove `/path/to/` è il percorso _assoluto_ alla directory contenente la directory `jetty-home-11.0.15`

Con `--add-module=annotations,server,http,deploy,servlet,webapp,resources,jsp` configuriamo il contenitore Jetty.

Infine, trascina il file [WAR](#creazione-di-pacchetti) nella directory __/path/to/jetty-base/webapps__ e rinominalo in
__ROOT.war__:

```bash
mv /path/to/war-file /path/to/jetty-base/webapps/ROOT.war
```

### Servizio web in esecuzione

```bash
java -jar $JETTY_HOME/start.jar
```

Il servizio web verrà eseguito sulla porta __8080__

Risoluzione dei problemi
------------------------

### IntelliJ

#### IntelliJ non riesce a LEGGERE il file di risorse

A volte, durante l'esecuzione di unit test in IntelliJ, si verificano errori che indicano che "un file di risorse" non è
stato trovato. Sappiamo che il percorso è assolutamente corretto. In questo caso, si tratta semplicemente di un problema
di IntelliJ che si risolve caricando esplicitamente tali risorse, indicando a IntelliJ dove si trovano:

![Errore nel caricamento di intelliJ-find-resource.png](img/intelliJ-find-resource.png)

#### Larghezza tabulazione

Utilizziamo 4 spazi come tabulazione. Questa impostazione può essere configurata in __Code Style__ -> __Java__ -> __Tabs
and Indents__ con le seguenti impostazioni:

- Dimensione tabulazione: 4
- Rientro: 4
- Rientro di continuazione: 8

Se le tabulazioni escono ancora con 2 spazi quando si preme TAB o Invio, non con 4 spazi, provare:

1. "Settings | Editor | Code Style" -- provare a disabilitare "Detect and use existing file indents for editing" nel
   caso in cui sia abilitato (è di default). NOTA: potrebbe essere necessario riaprire il file nell'editor.
2. Hai file .editorconfig da qualche parte nel percorso di quel file? Le impostazioni di .editorconfig
   ("Settings | Editor | Code Style") hanno la priorità (sovrascriveranno) sulle impostazioni dell'IDE.

[Docker]: https://github.com/QubitPi/Fiore/blob/master/Dockerfile
[Test di integrazione basati su Docker]: https://github.com/QubitPi/Fiore/blob/master/src/test/groovy/org/qubitpi/Fiore/DockerITSpec.groovy

[jcabi-mysql]: https://mysql.jcabi.com/
[Fiore Dockerfile]: https://github.com/QubitPi/Fiore/blob/master/Dockerfile

[Configurazione stile]: https://github.com/QubitPi/Fiore/blob/master/Fiore-Project-intellij-code-style.xml

[Testcontainers]: https://qubitpi.github.io/testcontainers-java/
