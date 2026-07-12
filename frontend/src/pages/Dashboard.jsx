import {
    useEffect,
    useState
} from "react";

import {
    getDashboardStats
} from "../api/dashboardApi";

import {
    FaBriefcase,
    FaUsers,
    FaUserTie,
    FaClipboardList,
    FaFileAlt,
    FaMoneyBill,
    FaCalendarCheck
} from "react-icons/fa";

function Dashboard() {

    const role = JSON.parse(
        atob(
            localStorage
                .getItem("token")
                .split(".")[1]
        )
    ).role;  

    const [stats, setStats] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const response = await getDashboardStats();
            setStats(response.data);
        } catch(error) {
            console.error(error);
        }
    };

    if (!stats) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <h3 style={{ color: 'var(--text-muted)' }}>Loading Dashboard...</h3>
            </div>
        );
    }

    const StatCard = ({ icon, title, value, color }) => (
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: 0 }}>
            <div style={{
                width: '60px',
                height: '60px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: `rgba(${color}, 0.1)`,
                color: `rgb(${color})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
            }}>
                {icon}
            </div>
            <div>
                <p style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{title}</p>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>{value}</h2>
            </div>
        </div>
    );

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1>HRMS Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        Welcome back! Here's what's happening at your portal today.
                    </p>
                </div>
                <div className="profile">
                    Role: {role}
                </div>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1.5rem",
                    marginTop: "1.5rem"
                }}
            >
                {role === "employee" ? (
                    <>
                        <StatCard 
                            icon={<FaClipboardList />} 
                            title="My Pending Leaves" 
                            value={stats.my_leaves} 
                            color="99, 102, 241" 
                        />
                        <StatCard 
                            icon={<FaMoneyBill />} 
                            title="My Payroll Records" 
                            value={stats.my_payrolls} 
                            color="16, 185, 129" 
                        />
                        <StatCard 
                            icon={<FaCalendarCheck />} 
                            title="Attendance Today" 
                            value={stats.attendance_today ? "Present" : "Not Marked"} 
                            color="245, 158, 11" 
                        />
                    </>
                ) : (
                    <>
                        <StatCard 
                            icon={<FaBriefcase />} 
                            title="Total Jobs" 
                            value={stats.total_jobs} 
                            color="99, 102, 241" 
                        />
                        <StatCard 
                            icon={<FaUsers />} 
                            title="Total Candidates" 
                            value={stats.total_candidates} 
                            color="16, 185, 129" 
                        />
                        <StatCard 
                            icon={<FaUserTie />} 
                            title="Total Employees" 
                            value={stats.total_employees} 
                            color="59, 130, 246" 
                        />
                        <StatCard 
                            icon={<FaClipboardList />} 
                            title="Total Interviews" 
                            value={stats.total_interviews} 
                            color="139, 92, 246" 
                        />
                        <StatCard 
                            icon={<FaFileAlt />} 
                            title="Total Offers" 
                            value={stats.total_offers} 
                            color="236, 72, 153" 
                        />
                        <StatCard 
                            icon={<FaCalendarCheck />} 
                            title="Pending Leaves" 
                            value={stats.pending_leaves} 
                            color="245, 158, 11" 
                        />
                        <StatCard 
                            icon={<FaMoneyBill />} 
                            title="Pending Expenses" 
                            value={stats.pending_expenses} 
                            color="239, 68, 68" 
                        />
                        <StatCard 
                            icon={<FaUserTie />} 
                            title="Present Today" 
                            value={stats.present_today} 
                            color="20, 184, 166" 
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;