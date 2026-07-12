function DataTable({
    columns,
    data,
    onDelete,
    onEdit,
    onDownload
}) {
    const formatCell = (column, val) => {
        if (column === 'status') {
            let badgeClass = 'badge';
            if (val === 'Pending') badgeClass += ' badge-pending';
            else if (val === 'Approved' || val === 'Open') badgeClass += ' badge-approved';
            else if (val === 'Rejected' || val === 'Closed') badgeClass += ' badge-rejected';
            return <span className={badgeClass}>{val}</span>;
        }
        if (val === null || val === undefined) return '-';
        return val.toString();
    };

    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column}>
                                {column.replace('_', ' ')}
                            </th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                No records found
                            </td>
                        </tr>
                    ) : (
                        data.map((row) => (
                            <tr key={row.id}>
                                {columns.map((column) => (
                                    <td key={column}>
                                        {formatCell(column, row[column])}
                                    </td>
                                ))}
                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {onEdit && (
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => onEdit(row)}
                                            >
                                                Edit
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => onDelete(row.id)}
                                            >
                                                Delete
                                            </button>
                                        )}
                                        {onDownload && (
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => onDownload(row.id)}
                                            >
                                                Payslip
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;