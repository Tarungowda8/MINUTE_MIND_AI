export default function ActionItems({ actionItems }) {

    return (
        <section>

            <h2>Action Items</h2>

            <table className="action-table">

                <thead>
                    <tr>
                        <th>Owner</th>
                        <th>Task</th>
                        <th>Due Date</th>
                    </tr>
                </thead>

                <tbody>

                    {actionItems.map((item, index) => (

                        <tr key={index}>
                            <td>{item.owner}</td>
                            <td>{item.task}</td>
                            <td>{item.dueDate}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </section>
    );
}