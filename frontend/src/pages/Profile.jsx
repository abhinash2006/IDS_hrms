import {
    useEffect,
    useState
} from "react";

import {
    getProfile
} from "../api/profileApi";

import {
    FaUserCircle,
    FaEnvelope,
    FaPhone,
    FaBuilding,
    FaBriefcase
} from "react-icons/fa";

function Profile() {

    const [profile,
    setProfile] =
    useState(null);

    const [loading,
        setLoading] =
        useState(true);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile =
    async () => {

        try {

            const response =
            await getProfile();

            setProfile(
                response.data
            );

        } catch(error){

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    if(loading){

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <h3 style={{ color: 'var(--text-muted)' }}>Loading Profile...</h3>
            </div>
        );

    }

    if(!profile){

        return (
            <div className="glass-card" style={{ textAlign: "center", padding: "3rem" }}>
                <h3 style={{ color: 'var(--text-muted)' }}>No profile found</h3>
            </div>
        );

    }

    const initials = `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}`.toUpperCase();

    return (

        <div>

            <div className="page-header">
                <div>
                    <h1>My Profile</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        View and manage your account information.
                    </p>
                </div>
            </div>

            <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)', paddingBottom: '2.5rem', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '90px',
                        height: '90px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--primary) 0%, #ec4899 100%)',
                        color: 'var(--text-white)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.25rem',
                        fontWeight: '800',
                        boxShadow: '0 10px 25px rgba(99, 102, 241, 0.25)'
                    }}>
                        {initials || <FaUserCircle />}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                            {profile.first_name} {profile.last_name}
                        </h2>
                        <span className="profile" style={{ display: 'inline-block', padding: '0.25rem 1rem' }}>
                            {profile.designation || "N/A"}
                        </span>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '1.25rem', color: 'var(--primary)', display: 'flex' }}><FaEnvelope /></div>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Email Address</p>
                            <p style={{ fontSize: '0.95rem', fontWeight: '600' }}>{profile.email}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '1.25rem', color: 'var(--primary)', display: 'flex' }}><FaPhone /></div>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Mobile Number</p>
                            <p style={{ fontSize: '0.95rem', fontWeight: '600' }}>{profile.mobile || "N/A"}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '1.25rem', color: 'var(--primary)', display: 'flex' }}><FaBuilding /></div>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Department</p>
                            <p style={{ fontSize: '0.95rem', fontWeight: '600' }}>{profile.department || "N/A"}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '1.25rem', color: 'var(--primary)', display: 'flex' }}><FaBriefcase /></div>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Designation</p>
                            <p style={{ fontSize: '0.95rem', fontWeight: '600' }}>{profile.designation || "N/A"}</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );

}

export default Profile;