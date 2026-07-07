package backend.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import backend.model.MeetingRequest;
import backend.service.MeetingService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
public class MeetingController {

    private final MeetingService meetingService;

    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @GetMapping("/")
    public String home() {
        return "Meeting Notes AI Agent is Running!";
    }

    @PostMapping("/analyze")
    public String  analyzeMeeting(
            @RequestBody MeetingRequest request)
            throws Exception {

        return meetingService.analyzeTranscript(
                request.getTranscript());

    }
}