---
slug: openai-chatgpt-http-basic
title: Come utilizzare l'API ChatGPT con Java
authors: jiaqi
tags: [Java, OpenAI, ChatGPT]
---

Immagina di sfruttare la potenza delle risposte umane di ChatGPT direttamente dal nostro servizio web! Sarebbe come
aggiungere un compressore al nostro motore già potente.

<!--truncate-->

Questo frammento di codice mostra l'esempio "hello-world" di come eseguire il proxy della chat sui modelli OpenAI
ChatGPT in un servizio web basato su Jersey:

```java
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@POST
@Path("/chat")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public Response chat(@NotNull final String chatMessage) throws IOException, InterruptedException {
    return Response
            .status(Response.Status.CREATED)
            .entity(
                    HttpClient.newHttpClient().send(
                            HttpRequest.newBuilder()
                                    .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                                    .POST(
                                            HttpRequest.BodyPublishers.ofString(
                                                    new ObjectMapper().writeValueAsString(
                                                            Map.ofEntries(
                                                                    Map.entry("model", "gpt-3.5-turbo"),
                                                                    Map.entry("messages",
                                                                            List.of(Map.ofEntries(
                                                                                    Map.entry("role", "user"),
                                                                                    Map.entry("content", chatMessage)
                                                                            ))
                                                                    )
                                                            )
                                                    )
                                            )
                                    )
                                    .setHeader("Authorization", "Bearer <MY OPEN AI API KEY>")
                                    .setHeader("Content-type", "application/json")
                                    .build(),
                            HttpResponse.BodyHandlers.ofString()
                    ).body()
            )
            .build();
}
```
