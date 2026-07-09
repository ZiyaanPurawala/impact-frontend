import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, axios } from '../context/AuthContext';

const StatCard = ({ label, value, sub, accent }) => (
  <div className={`stat-card${accent ? ' stat-card-accent' : ''}`}>
    <p className="stat-label">{label}</p>
    <p className="stat-value">{value}</p>
    {sub && <p className="stat-sub">{sub}</p>}
  </div>
);

const SkeletonCard = () => (
  <div className="stat-card">
    <div className="skeleton" style={{ height: 12, width: 80, marginBottom: 10 }} />
    <div className="skeleton" style={{ height: 36, width: 100 }} />
  </div>
);

const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
const formatVolume = (v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : Math.round(v);

export default function Dashboard() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [whatsappEnabled, setWhatsappEnabled] = useState(user?.whatsappEnabled !== false);
  const [prediction, setPrediction] = useState(null);
  const [predLoading, setPredLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [uiMessage, setUiMessage] = useState(null);

  // Sync state if user loads
  useEffect(() => {
    if (user) {
      setPhoneNumber(user.phoneNumber || '');
      setWhatsappEnabled(user.whatsappEnabled !== false);
    }
  }, [user]);

  useEffect(() => {
    const load = async () => {
      try {
        const [sRes, rRes] = await Promise.all([
          axios.get('/sessions?limit=5'),
          axios.get('/records'),
        ]);
        setSessions(sRes.data.sessions || sRes.data || []);
        setRecords(rRes.data || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const res = await axios.get('/ml/predict');
        if (res.data && res.data.success) {
          setPrediction(res.data);
        }
      } catch (e) {
        console.error("Failed to load AI prediction", e);
      } finally {
        setPredLoading(false);
      }
    };
    if (user) {
      fetchPrediction();
    }
  }, [user]);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setUiMessage(null);
    try {
      await axios.post('/ml/settings', { phoneNumber, whatsappEnabled });
      updateUser({ phoneNumber, whatsappEnabled });
      setUiMessage({ type: 'success', text: 'Settings updated successfully!' });
      
      // Reload prediction
      const predRes = await axios.get('/ml/predict');
      if (predRes.data && predRes.data.success) {
        setPrediction(predRes.data);
      }
    } catch (err) {
      console.error(err);
      setUiMessage({ type: 'error', text: 'Failed to update settings.' });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleTriggerTest = async () => {
    setTestLoading(true);
    setUiMessage(null);
    try {
      const res = await axios.post('/ml/test-notification');
      if (res.data && res.data.success) {
        setPrediction(res.data);
        setUiMessage({ 
          type: 'success', 
          text: res.data.whatsapp?.sent 
            ? `Notification sent! ${res.data.whatsapp.log}` 
            : `Prediction run. Details: ${res.data.whatsapp?.log || 'Check console.'}` 
        });
      }
    } catch (err) {
      console.error(err);
      setUiMessage({ type: 'error', text: 'Failed to trigger test notification.' });
    } finally {
      setTestLoading(false);
    }
  };

  const totalSessions = sessions.length;
  const totalVolume = sessions.reduce((s, sess) => s + (sess.totalVolume || 0), 0);
  const uniqueExercises = [...new Set(sessions.flatMap(s => s.exercises?.map(e => e.exercise?.name || '') || []))].length;
  const prCount = records.length;

  const prTypeMeta = { weight: 'Weight PR', estimated1RM: '1RM PR', reps: 'Reps PR', volume: 'Volume PR' };
  const prTypeClass = { weight: 'pr-type-weight', estimated1RM: 'pr-type-orm', reps: 'pr-type-reps', volume: 'pr-type-volume' };

  return (
    <div>
      <div className="page-header">
        <h1>Hey, {user?.name?.split(' ')[0]} </h1>
        <p className="text-muted" style={{ marginTop: 4 }}>Here's your training overview</p>
      </div>

      {/* ── Stats ── */}
      <div className="grid-4 mb-6">
        {loading ? (
          [1, 2, 3, 4].map(i => <SkeletonCard key={i} />)
        ) : (
          <>
            <StatCard label="Sessions logged" value={totalSessions} sub="Recent 5 shown" />
            <StatCard label="Total volume" value={`${formatVolume(totalVolume)} kg`} sub="Across all sessions" />
            <StatCard label="Exercises tracked" value={uniqueExercises} sub="Unique movements" />
            <StatCard label="Personal records" value={prCount} sub="All time" accent />
          </>
        )}
      </div>

      <div className="grid-2">
        {/* ── Recent Sessions ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="section-title">Recent workouts</p>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/history')}>View all</button>
          </div>

          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="card card-sm mb-2">
                <div className="skeleton" style={{ height: 14, width: 120, marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 11, width: 80 }} />
              </div>
            ))
          ) : sessions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🏋️</div>
              <h3>No workouts yet</h3>
              <p>Log your first session to get started</p>
              <button className="btn btn-primary mt-4" onClick={() => navigate('/log')}>Log workout</button>
            </div>
          ) : (
            sessions.map(session => (
              <div key={session._id} className="card card-sm mb-2" style={{ cursor: 'pointer' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: 2 }}>
                      {session.name || 'Workout'}
                    </p>
                    <p className="text-sm text-muted">
                      {formatDate(session.date)} · {session.exercises?.length || 0} exercises · {formatVolume(session.totalVolume || 0)} kg
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 120 }}>
                    {session.exercises?.some(e => e.hasPR) && (
                      <span className="pr-badge">🏆 PR</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Top PRs ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="section-title">Latest PRs</p>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/records')}>All records</button>
          </div>

          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="card card-sm mb-2">
                <div className="skeleton" style={{ height: 12, width: 60, marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 22, width: 100 }} />
              </div>
            ))
          ) : records.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">⭐</div>
              <h3>No PRs yet</h3>
              <p>Break a record on your next lift</p>
            </div>
          ) : (
            records.slice(0, 4).map((pr, i) => (
              <div key={i} className="pr-card mb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`pr-type-pill ${prTypeClass[pr.prType]}`}>
                      {prTypeMeta[pr.prType]}
                    </span>
                    <p className="pr-exercise">{pr.exercise?.name || 'Exercise'}</p>
                    <p className="pr-value">
                      {pr.prType === 'reps' ? `${pr.reps} reps` :
                        pr.prType === 'volume' ? `${Math.round(pr.volume)} kg` :
                          `${pr.weight || pr.estimated1RM} kg`}
                    </p>
                  </div>
                  {pr.improvement > 0 && (
                    <p className="pr-improvement">+{pr.improvement?.toFixed(1)} kg</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── AI Analysis & WhatsApp Settings ── */}
      <div className="card mb-6" style={{ background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(200,255,0,0.02) 100%)', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🧠</span>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>AI Consistency & WhatsApp Notifications</h3>
            <p className="text-sm text-muted" style={{ marginTop: 2 }}>Evaluate your Mon-Fri consistency and trigger personalized motivational messages every Sunday</p>
          </div>
        </div>

        <div className="grid-2" style={{ gap: '2rem' }}>
          {/* Column 1: AI Insight */}
          <div>
            <p className="section-title" style={{ fontSize: '0.875rem', marginBottom: '0.75rem' }}>AI Adherence Prediction</p>
            {predLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div className="skeleton" style={{ height: 20, width: '60%' }} />
                <div className="skeleton" style={{ height: 12, width: '100%' }} />
                <div className="skeleton" style={{ height: 60, width: '100%' }} />
              </div>
            ) : prediction ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 600 }}>
                    Expected Adherence: <span style={{ color: prediction.prediction?.category === 'High' ? 'var(--success)' : prediction.prediction?.category === 'Moderate' ? 'var(--warning)' : 'var(--danger)' }}>
                      {prediction.prediction?.category} ({Math.round(prediction.prediction?.probability * 100)}%)
                    </span>
                  </span>
                </div>
                
                {/* Progress bar */}
                <div>
                  <div style={{ background: 'var(--bg-input)', borderRadius: '999px', height: 10, width: '100%', overflow: 'hidden' }}>
                    <div style={{ 
                      background: prediction.prediction?.category === 'High' ? 'var(--success)' : prediction.prediction?.category === 'Moderate' ? 'var(--warning)' : 'var(--danger)', 
                      height: '100%', 
                      width: `${Math.round(prediction.prediction?.probability * 100)}%`, 
                      transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)' 
                    }} />
                  </div>
                </div>

                <p className="text-xs text-muted" style={{ fontStyle: 'italic' }}>
                  Based on: {prediction.features?.total_sessions || 0} workouts logged this week ({prediction.features?.mon_to_fri_sessions || 0} on Mon-Fri), vs {prediction.features?.prev_week_sessions || 0} last week.
                </p>

                {/* Sunday Message Preview */}
                <div style={{ padding: 12, background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--accent)', fontSize: '0.85rem' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 6 }}>Sunday Notification Preview</p>
                  <p style={{ color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: 1.4 }}>
                    "{prediction.message}"
                  </p>
                </div>
                
                {(prediction.isHeuristicFallback || prediction.isDemoMock) && (
                  <p className="text-xs" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    ⚠️ Running on local consistency rules (Python/Scikit-learn not detected)
                  </p>
                )}
              </div>
            ) : (
              <div className="empty-state" style={{ padding: '1rem 0' }}>
                <p className="text-sm text-muted">Log at least one workout to calculate adherence prediction</p>
              </div>
            )}
          </div>

          {/* Column 2: Configuration */}
          <div>
            <form onSubmit={handleSaveSettings}>
              <div className="form-group">
                <label className="form-label" htmlFor="whatsappNumber">WhatsApp Phone Number</label>
                <input
                  id="whatsappNumber"
                  className="form-input"
                  type="tel"
                  placeholder="e.g. +919876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ fontSize: '0.875rem' }}
                />
                <p className="text-xs text-muted" style={{ marginTop: 4 }}>Include country code (e.g. +91 for India, +1 for USA)</p>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 15 }}>
                <input
                  id="whatsappToggle"
                  type="checkbox"
                  checked={whatsappEnabled}
                  onChange={(e) => setWhatsappEnabled(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: 'var(--accent)', cursor: 'pointer' }}
                />
                <label htmlFor="whatsappToggle" className="form-label" style={{ marginBottom: 0, cursor: 'pointer', userSelect: 'none' }}>
                  Enable Weekly WhatsApp Notifications
                </label>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button type="submit" className="btn btn-primary btn-sm" disabled={saveLoading}>
                  {saveLoading ? 'Saving...' : 'Save Settings'}
                </button>
                
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={handleTriggerTest}
                  disabled={testLoading || !phoneNumber}
                  title="Sends the Sunday prediction notification immediately to check your WhatsApp link"
                >
                  {testLoading ? 'Sending...' : 'Test Sunday Notification'}
                </button>
              </div>
            </form>

            {uiMessage && (
              <div style={{ 
                marginTop: 15, 
                padding: 10, 
                borderRadius: 'var(--radius-sm)', 
                fontSize: '0.8125rem',
                background: uiMessage.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                border: `1px solid ${uiMessage.type === 'success' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
                color: uiMessage.type === 'success' ? 'var(--success)' : 'var(--danger)'
              }}>
                {uiMessage.text}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Quick Log CTA ── */}
      {!loading && sessions.length > 0 && (
        <div className="card mt-4" style={{ borderColor: 'rgba(200,255,0,0.15)', background: 'rgba(200,255,0,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: 2 }}>Ready to train?</p>
            <p className="text-sm text-muted">Start logging your next session and beat your PRs.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/log')} style={{ flexShrink: 0 }}>
            Start workout
          </button>
        </div>
      )}
    </div>
  );
}
