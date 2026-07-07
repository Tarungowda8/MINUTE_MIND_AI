package backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class GroqService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.model}")
    private String model;

    private final HttpClient client = HttpClient.newHttpClient();

    private final ObjectMapper mapper = new ObjectMapper();

    public String analyzeMeeting(String transcript)
            throws IOException, InterruptedException {

    	String prompt = """
    			You are an AI Meeting Assistant.

    			Analyze the following meeting transcript and extract the important information.

    			Return ONLY valid JSON.

    			The JSON format must be:

    			{
    			  "summary": "Short summary of the meeting",
    			  "decisions": [
    			    "Decision 1",
    			    "Decision 2"
    			  ],
    			  "actionItems": [
    			    {
    			      "owner": "Person responsible",
    			      "task": "Task description",
    			      "dueDate": "Due date"
    			    }
    			  ]
    			}

    			Rules:
    			- Do not return Markdown.
    			- Do not use ```json.
    			- Do not add explanations.
    			- Return only valid JSON.
    			- If there are no decisions, return an empty array.
    			- If the owner is not mentioned, use "Unknown".
    			- If the due date is not mentioned, use "Not Specified".
    			- Keep the summary concise (2-3 sentences maximum).

    			Meeting Transcript:
    			""" + transcript;

        String body = """
{
"model":"%s",
"messages":[
{
"role":"system",
"content":"You are an expert AI meeting assistant that extracts structured meeting information and always responds with valid JSON only."
},
{
"role":"user",
"content":%s
}
]
}
""".formatted(
                model,
                mapper.writeValueAsString(prompt)
        );

        HttpRequest request =
                HttpRequest.newBuilder()
                        .uri(
                                URI.create(
                                        "https://api.groq.com/openai/v1/chat/completions"))
                        .header(
                                "Authorization",
                                "Bearer " + apiKey)
                        .header(
                                "Content-Type",
                                "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString(body))
                        .build();

        HttpResponse<String> response =
                client.send(
                        request,
                        HttpResponse.BodyHandlers.ofString());

        JsonNode root = mapper.readTree(response.body());

        return root
                .get("choices")
                .get(0)
                .get("message")
                .get("content")
                .asText();
    }
}