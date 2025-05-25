Fiore
=====

![Badge Versione Java][Badge Versione Java]
[![Docker Hub][Badge Docker Pulls]][URL Docker Hub]
[![Stato del flusso di lavoro GitHub][Stato del flusso di lavoro GitHub]](https://github.com/QubitPi/Fiore/actions/workflows/ci-cd.yaml)
[![Badge Licenza Apache]][Licenza Apache, versione 2.0]

__Fiore__ è un template di servizio web [JSR 370] che ci permette di avviare rapidamente un servizio web Java tramite i
[template GitHub]. Che si voglia creare un chatbot che sfrutti API popolari come ChatGPT o connettersi al nostro
servizio personalizzato, questo template può fare tutto! Esplora [fiore.qubitpi.org](https://fiore.qubitpi.org/) per visualizzare tutte le
funzionalità disponibili, come utilizzarle, esempi e altro ancora!

✨ Funzionalità
---------------

- Connessione a qualsiasi API
- Archiviazione dati
- Endpoint di controllo dello stato di salute pronto all'uso
- Sito di documentazione basato su Docusaurus, ospitato gratuitamente su GitHub Pages
- Servizio web Dockerizzato
- Monitoraggio delle applicazioni ELK
- Configurazione flessibile del servizio web

🚀 Avvio rapido
---------------

### Avvio di un container

Assicurati che Docker sia installato
([_Installazione di Docker_](https://docker.qubitpi.org/desktop/setup/install/mac-install/)), quindi esegui questi comandi al clic:

> [!IMPORTANTE]
>
> Sostituisci `OPENAI_API_KEY` qui sotto con la chiave effettiva che puoi ottenere
> [qui](https://platform.openai.com/api-keys)

```console
export OPENAI_API_KEY=...
docker run -it -p 8080:8080 -e OPENAI_API_KEY=$OPENAI_API_KEY jack20191124/fiore
```

Ecco fatto. Un endpoint di healthcheck può essere bloccato con

```console
curl -v localhost:8080/v1/healthcheck
```

che restituirebbe

```console
$ curl -v localhost:8080/v1/healthcheck
* Tentativo 127.0.0.1:8080...
* Connesso a localhost (127.0.0.1) porta 8080 (#0)
> GET /v1/healthcheck HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.85.0
> Accetta: */*
>
* Contrassegna il bundle come non supporta multiuso
< HTTP/1.1 200 OK
< Content-Length: 0
< Server: Jetty(11.0.15)
<
* Connessione n. 0 all'host localhost lasciata intatta
```

### Invio della prima chat Richiesta

```console
curl --location 'http://localhost:8080/v1/openai/chat' --header 'Content-Type: application/json' --data '{
"message": "Hello"
}' -v
```

Ora lo sviluppatore può iniziare ad aggiungere valori aziendali senza dover ripetere i lunghi lavori di scaffolding. Per
procedere da qui, incluso il recupero e lo sviluppo del codice sorgente del servizio web, consultare la
[documentazione][Documentazione]
per i dettagli.

Licenza
-------

I termini di utilizzo e distribuzione di [Fiore]() sono coperti dalla [Licenza Apache, versione 2.0].

[Badge licenza Apache]: https://img.shields.io/badge/Apache%202.0-F25910.svg?style=for-the-badge&logo=Apache&logoColor=white
[Licenza Apache, versione 2.0]: https://www.apache.org/licenses/LICENSE-2.0

[Badge Docker Pulls]: https://img.shields.io/docker/pulls/jack20191124/fiore?style=for-the-badge&logo=docker&color=2596EC
[URL Docker Hub]: https://hub.docker.com/r/jack20191124/fiore
[Documentazione]: https://fiore.qubitpi.org/it/

[Template GitHub]: https://docs.github.com/it/repositories/creating-and-managing-repositories/creating-a-template-repository#about-template-repositories
[Stato del flusso di lavoro GitHub]: https://img.shields.io/github/actions/workflow/status/QubitPi/Fiore/ci-cd.yaml?branch=master&logo=github&style=for-the-badge

[Badge versione Java]: https://img.shields.io/badge/Java-17-brightgreen?style=for-the-badge&logo=OpenJDK&logoColor=white
[JSR 370]: https://jcp.org/it/jsr/detail?id=370
