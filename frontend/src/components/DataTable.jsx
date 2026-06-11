function DataTable({
    columns,
    data,
    onDelete,
    onEdit
}) {

    return (

        <table
            border="1"
            cellPadding="10"
            width="100%"
        >

            <thead>

                <tr>

                    {columns.map(
                        (column) => (

                            <th key={column}>
                                {column}
                            </th>

                        )
                    )}

                    <th>
                        Actions
                    </th>

                </tr>

            </thead>

            <tbody>

                {data.map(
                    (row) => (

                        <tr key={row.id}>

                            {columns.map(
                                (column) => (

                                    <td key={column}>
                                        {row[column]}
                                    </td>

                                )
                            )}

                            <td>

                                <button
                                    onClick={() =>
                                        onEdit(row)
                                    }
                                >
                                    Edit
                                </button>

                                {" "}

                                <button
                                    onClick={() =>
                                        onDelete(
                                            row.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    )
                )}

            </tbody>

        </table>

    );

}

export default DataTable;