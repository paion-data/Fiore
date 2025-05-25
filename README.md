Fiore
=====

![Java Version Badge][Java Version Badge]
[![Docker Hub][Docker Pulls Badge]][Docker Hub URL]
[![GitHub Workflow Status][GitHub Workflow Status]](https://github.com/QubitPi/Fiore/actions/workflows/ci-cd.yaml)
[![Apache License Badge]][Apache License, Version 2.0]

> [!TIP]
>
> Read this in other languages:
>
> - [Italiano](./README.it.md)

__Fiore__ is a [JSR 370] webservice template that lets us spin up Java webservice quickly through [GitHub templates].
Whether we want to create a chatbot that leverages popular APIs such as ChatGPT or connect to our own custom service,
this template can do it all! Explore [fiore.qubitpi.org](https://fiore.qubitpi.org/) to view all of its available features, how to use them,
examples and more!

✨ Features
-----------

- Connect to any API
- Data storage
- Out-of-the-box healthcheck endpoint
- Docusaurus-based documentation site freely hosted on GitHub Pages
- Dockerized webservice
- ELK application monitoring
- Flexible webservice configuration

🚀 Quick Start
--------------

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
here, including getting and developing the webservice source code, please refer to the [documentation][Documentation]
for details.

License
-------

The use and distribution terms for [Fiore]() are covered by the [Apache License, Version 2.0].

[Apache License Badge]: https://img.shields.io/badge/Apache%202.0-F25910.svg?style=for-the-badge&logo=Apache&logoColor=white
[Apache License, Version 2.0]: https://www.apache.org/licenses/LICENSE-2.0

[Docker Pulls Badge]: https://img.shields.io/docker/pulls/jack20191124/fiore?style=for-the-badge&logo=docker&color=2596EC
[Docker Hub URL]: https://hub.docker.com/r/jack20191124/fiore
[Documentation]: https://fiore.qubitpi.org/

[GitHub templates]: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository#about-template-repositories
[GitHub Workflow Status]: https://img.shields.io/github/actions/workflow/status/QubitPi/Fiore/ci-cd.yaml?branch=master&logo=github&style=for-the-badge

[Java Version Badge]: https://img.shields.io/badge/Java-17-brightgreen?style=for-the-badge&logo=OpenJDK&logoColor=white
[JSR 370]: https://jcp.org/en/jsr/detail?id=370
