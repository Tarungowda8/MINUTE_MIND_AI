import { useState } from "react";
import axios from "axios";

export default function TranscriptForm({ result,
                                        setResult,
                                        loading,
                                        setLoading,
                                        setError
                                    }) {

    const [transcript, setTranscript] = useState("");

    const analyzeMeeting = async () => {
        
        if (!transcript.trim()) {
            alert("Please enter a meeting transcript.");
            return;
        }

        setError("");

        try {

    setLoading(true);

    const response = await axios.post(
        "http://localhost:9998/analyze",
        {
            transcript: transcript
        }
    );

    setResult(response.data);

}

catch (error) {
    console.error("Failed to analyze meeting:", error);

    setResult(null);

    setError(
        "Something went wrong while contacting the AI service. Please try again.");

}

finally {

    setLoading(false);

}

    };

    const clearMeeting = () => {

    setTranscript("");

    setResult(null);

};

    return (

        <section>

            <h2>Paste Meeting Transcript</h2>

            <textarea
                rows="12"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste your meeting transcript here..."
                disabled={loading}
            />

            <div className="button-group">

                 <button
                    onClick={analyzeMeeting}
                    disabled={loading}
                    >
                    <>
                        {loading && <span className="spinner"></span>}

                        {loading ? "Analyzing..." : "Analyze Meeting"}
                    </>
                </button>

                    {result && (
                        <button
                            onClick={clearMeeting}
                            className="clear-btn"
                            >
                            Clear
                        </button>
                 )}

</div>

        </section>

    );

}