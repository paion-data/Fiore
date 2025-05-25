---
sidebar_position: 1
title: Introduction
---

Getting Started
===============

:::caution

Before proceeding, it is important to note that __we DO NOT support Spring/Spring Boot paradigm__.
[Fiore] runs as a **[JAX-RS]** webservice backed by its reference implementation Jersey running
as a WAR inside [Jetty] container.

More info about difference between JAX-RS and Spring can be found in [this thread](https://stackoverflow.com/a/42955575)

:::

Quick Start
-----------

### Spinning Up a Container

Please make sure Docker is installed
([_Installing Docker_](https://docker.qubitpi.org/desktop/setup/install/mac-install/)), then execute this on-click
commands:

> [!IMPORTANT]
>
> Please replace the `OPENAI_API_KEY` below with the actual key which can be obtained
> [here](https://platform.openai.com/api-keys)

```console
export OPENAI_API_KEY=...
docker run  -it -p 8080:8080 -e OPENAI_API_KEY=$OPENAI_API_KEY jack20191124/fiore
```

That's it. A healthcheck endpoint can be pinned with

```console
curl -v localhost:8080/v1/healthcheck
```

which would gave

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

### Sending the First Chat Request

```console
curl --location 'http://localhost:8080/v1/openai/chat' --header 'Content-Type: application/json' --data '{
    "message": "Hello"
}' -v
```

Developer can now start adding business values without repeating the time-consuming scaffolding works. To proceed from
here, including getting and developing the webservice source code, please refer to the following sections for more
details:

- [Development](development)
- [Configuration](configuration)

[JAX-RS]: https://jcp.org/en/jsr/detail?id=370
[Fiore]: https://fiore.qubitpi.org/
[Jetty]: https://en.wikipedia.org/wiki/Jetty_(web_server)
