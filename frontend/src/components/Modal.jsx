function Modal({
    isOpen,
    onClose,
    title,
    children
}) {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(15, 23, 42, 0.4)",
                backdropFilter: "blur(4px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
                animation: "fadeIn 0.2s ease-out"
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    padding: "2rem",
                    width: "90%",
                    maxWidth: "600px",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "var(--shadow-lg)",
                    animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    color: "var(--text-main)"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>{title}</h2>
                    <button 
                        onClick={onClose}
                        style={{ background: "transparent", border: "none", color: "var(--text-muted)", fontSize: "1.5rem", cursor: "pointer", display: "inline-flex", padding: "0.25rem" }}
                    >
                        &times;
                    </button>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                    {children}
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                    <button className="btn btn-secondary" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;