/*
 * Copyright 2025 Jiaqi Liu. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.qubitpi.fiore.web.endpoints;

import org.qubitpi.fiore.config.OpenaiConfig;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.aeonbits.owner.ConfigFactory;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import net.jcip.annotations.Immutable;
import net.jcip.annotations.ThreadSafe;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Endpoint that delegates chatbot to OpenAI API.
 */
@Singleton
@Immutable
@ThreadSafe
@Path("/openai")
@Produces(MediaType.APPLICATION_JSON)
public class OpenaiServlet {

    private static final ObjectMapper JSON_MAPPER = new ObjectMapper();
    private static final OpenaiConfig OPEN_AI_CONFIG = ConfigFactory.create(OpenaiConfig.class);
    private static final HttpClient HTTP_CLIENT = HttpClient.newHttpClient();

    /**
     * Constructor for dependency injection.
     */
    @Inject
    public OpenaiServlet() {
        // intentionally left blank
    }

    /**
     * Chatbot endpoint.
     *
     * @param payload  A JSON object containing a {@code message} field which contains the message sent to ask the bot.
     *
     * @return 200 OK response with the chatbot's response message
     *
     * @throws IOException  if an I/ O error occurs when sending or receiving from the OpenAI
     * @throws InterruptedException if the OpenAI request is interrupted
     */
    @POST
    @Path("/chat")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response chat(@NotNull final Map<String, String> payload) throws IOException, InterruptedException {
        Objects.requireNonNull(payload);

        return Response
                .status(Response.Status.CREATED)
                .entity(
                        HTTP_CLIENT.send(
                                HttpRequest.newBuilder()
                                        .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                                        .POST(
                                                HttpRequest.BodyPublishers.ofString(
                                                        JSON_MAPPER.writeValueAsString(
                                                                Map.ofEntries(
                                                                        Map.entry("model", "gpt-3.5-turbo"),
                                                                        Map.entry("messages",
                                                                                List.of(Map.ofEntries(
                                                                                        Map.entry("role", "user"),
                                                                                        Map.entry(
                                                                                                "content",
                                                                                                payload.get("message")
                                                                                        )
                                                                                ))
                                                                        )
                                                                )
                                                        )
                                                )
                                        )
                                        .setHeader("Authorization", "Bearer " + OPEN_AI_CONFIG.apiKey())
                                        .setHeader("Content-type", "application/json")
                                        .build(),
                                HttpResponse.BodyHandlers.ofString()
                        ).body()
                )
                .build();
    }
}
