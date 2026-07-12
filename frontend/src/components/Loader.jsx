function Loader() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
                gap: "1rem"
            }}
        >
            <div
                style={{
                    width: "40px",
                    height: "40px",
                    border: "4px solid rgba(99, 102, 241, 0.1)",
                    borderTop: "4px solid var(--primary)",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                }}
            />
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", fontWeight: 500 }}>
                Loading data, please wait...
            </p>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default Loader;