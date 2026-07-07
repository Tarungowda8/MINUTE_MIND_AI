package backend.service;

import org.springframework.stereotype.Service;

@Service
public class MeetingService {

    private final GroqService groqService;

    public MeetingService(GroqService groqService) {
        this.groqService = groqService;
    }

    public String  analyzeTranscript(String transcript)
            throws Exception {

        return groqService.analyzeMeeting(transcript);

    }

}