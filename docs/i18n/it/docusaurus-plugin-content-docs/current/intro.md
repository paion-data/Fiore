---
sidebar_position: 1
title: Introduzione
---

Iniziare
========

:::caution

Prima di procedere, è importante notare che __NON supportiamo il paradigma Spring/Spring Boot__. [Fiore] viene eseguito
come un webservice __[JAX-RS]__ supportato dalla sua implementazione di riferimento Jersey, che viene eseguito come WAR
all'interno del contenitore [Jetty].

Ulteriori informazioni sulle differenze tra JAX-RS e Spring sono disponibili in [questo thread](https://stackoverflow.com/a/42955575).

:::

Avvio rapido
------------

### Avvia un Contenitore

Assicurati che Docker sia installato
([Installazione di Docker](https://docker.qubitpi.org/desktop/setup/install/mac-install/)), quindi esegui questi comandi al clic:

:::tip

Sostituisci `OPENAI_API_KEY` qui sotto con la chiave effettiva che puoi ottenere
[qui](https://platform.openai.com/api-keys)

:::

```console
export OPENAI_API_KEY=...
docker run  -it -p 8080:8080 -e OPENAI_API_KEY=$OPENAI_API_KEY jack20191124/fiore
```

Ecco fatto. Un endpoint di controllo dello stato può essere bloccato con

```console
curl -v localhost:8080/v1/healthcheck
```

che darebbe

```console
$ curl -v localhost:8080/v1/healthcheck
*   Trying 127.0.0.1:8080...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /v1/healthcheck HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.85.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Content-Length: 0
< Server: Jetty(11.0.15)
<
* Connection #0 to host localhost left intact
```

### Invio della Prima richiesta di chat

```console
curl --location 'http://localhost:8080/v1/openai/chat' --header 'Content-Type: application/json' --data '{
    "message": "Hello"
}' -v
```

Lo sviluppatore può ora iniziare ad aggiungere valori aziendali senza dover ripetere i lunghi e laboriosi lavori di
scaffolding. Per procedere da qui, incluso il recupero e lo sviluppo del codice sorgente del servizio web, consultare le
seguenti sezioni per maggiori dettagli:

- [Sviluppo](development)
- [Configurazione](configuration)

[JAX-RS]: https://jcp.org/en/jsr/detail?id=370
[Fiore]: https://fiore.qubitpi.org/
[Jetty]: https://en.wikipedia.org/wiki/Jetty_(web_server)
