import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import TranscriptForm from "./components/TranscriptForm";
import SummaryCard from "./components/SummaryCard";
import Decisions from "./components/Decisions";
import ActionItems from "./components/ActionItems";
import Footer from "./Footer";

export default function App() {

    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <div className="app">

            <Header />

            <TranscriptForm  
                result={result}
                setResult={setResult}
                loading={loading}
                setLoading={setLoading}
                setError={setError}
            />
            {
              error && (

              <section className="error-card">

                <h3>⚠️ Unable to analyze the meeting</h3>

                <p>{error}</p>

              </section>

              )
            }
            {
               !result && (

        <section>

            <h2>Ready to Analyze</h2>

            <p>

                Paste your meeting transcript above and click
                <strong> Analyze Meeting </strong>
                to generate:

            </p>

            <ul>

                <li>Meeting Summary</li>

                <li>Key Decisions</li>

                <li>Action Items</li>

            </ul>

        </section>

    )
}
            {result && (
                <div className="fade-in">
                    <SummaryCard summary={result.summary} />

                    <Decisions decisions={result.decisions} />

                    <ActionItems actionItems={result.actionItems} />
                </div>
            )}

            <Footer/>

        </div>
    );
}