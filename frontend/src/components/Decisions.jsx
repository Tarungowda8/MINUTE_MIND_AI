export default function Decisions({ decisions }) {

    return (

        <section>

            <h2>Decisions</h2>

            <ul>

                {decisions.length === 0 ? (

                    <p>No decisions were identified in this meeting.</p>

                ) : (

                    decisions.map((decision, index) => (

                        <li key={index}>
                            ✅ {decision}
                        </li>

                    ))

                )}

            </ul>

        </section>

    );

}