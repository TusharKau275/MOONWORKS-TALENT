import { useState, useMemo, useCallback } from 'react';
import './AdminPage.css';

const API_URL = import.meta.env.VITE_API_URL || '';

function AdminPage() {
  // Auth state
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Data state
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Table controls
  const [searchQuery, setSearchQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState('all');
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Store the key for API calls
  const [storedKey, setStoredKey] = useState('');

  // ---------- Auth ----------
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!adminKey.trim()) return;
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch(`${API_URL}/api/admin/submissions`, {
        headers: { 'x-admin-key': adminKey.trim() },
      });

      if (!res.ok) {
        const data = await res.json();
        setAuthError(data.message || 'Access denied.');
        setAuthLoading(false);
        return;
      }

      const data = await res.json();
      setStoredKey(adminKey.trim());
      setSubmissions(data.data || []);
      setIsAuthenticated(true);
    } catch {
      setAuthError('Unable to connect to server. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setStoredKey('');
    setAdminKey('');
    setSubmissions([]);
    setError('');
    setSearchQuery('');
    setTrackFilter('all');
  };

  // ---------- Fetch Data ----------
  const fetchData = useCallback(async () => {
    if (!storedKey) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/admin/submissions`, {
        headers: { 'x-admin-key': storedKey },
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Failed to fetch data.');
        return;
      }

      const data = await res.json();
      setSubmissions(data.data || []);
    } catch {
      setError('Unable to connect to server.');
    } finally {
      setLoading(false);
    }
  }, [storedKey]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  // ---------- Filtering & Sorting ----------
  const uniqueTracks = useMemo(() => {
    const tracks = new Set(submissions.map((s) => s.track_interest).filter(Boolean));
    return Array.from(tracks).sort();
  }, [submissions]);

  const filteredData = useMemo(() => {
    let data = [...submissions];

    // Filter by track
    if (trackFilter !== 'all') {
      data = data.filter((s) => s.track_interest === trackFilter);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (s) =>
          (s.name && s.name.toLowerCase().includes(q)) ||
          (s.email && s.email.toLowerCase().includes(q)) ||
          (s.track_interest && s.track_interest.toLowerCase().includes(q)) ||
          (s.message && s.message.toLowerCase().includes(q)) ||
          (s.source_page && s.source_page.toLowerCase().includes(q))
      );
    }

    // Sort
    data.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (aVal == null) aVal = '';
      if (bVal == null) bVal = '';

      if (sortField === 'created_at') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [submissions, searchQuery, trackFilter, sortField, sortDirection]);

  // ---------- Sort Handler ----------
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // ---------- CSV Export ----------
  const exportCSV = () => {
    if (filteredData.length === 0) return;

    const headers = ['ID', 'Name', 'Email', 'Track Interest', 'Message', 'Source Page', 'Created At'];
    const rows = filteredData.map((s) => [
      s.id,
      s.name || '',
      s.email || '',
      s.track_interest || '',
      (s.message || '').replace(/"/g, '""'),
      s.source_page || '',
      s.created_at ? new Date(s.created_at).toLocaleString() : '',
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((r) => r.map((v) => `"${v}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `moonworks_submissions_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---------- Helpers ----------
  // Alternating blue/teal badges — only two track colors from design system
  const getTrackClass = (track, index) => {
    return index % 2 === 0 ? 'blue' : 'teal';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return { date: '—', time: '' };
    const d = new Date(dateStr);
    return {
      date: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
    };
  };

  // ---------- Stats ----------
  const stats = useMemo(() => {
    const total = submissions.length;
    const tracks = new Set(submissions.map((s) => s.track_interest).filter(Boolean)).size;
    const latest = submissions.length > 0
      ? formatDate(submissions[0].created_at)
      : null;

    // Submissions this week
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisWeek = submissions.filter((s) => new Date(s.created_at) >= weekAgo).length;

    return { total, tracks, latest, thisWeek };
  }, [submissions]);

  // ---------- SVG Icons ----------
  const SearchIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  const DownloadIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );

  const RefreshIcon = () => (
    <svg className="admin-header__btn-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );

  const LogoutIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );

  // ---------- Gate Screen ----------
  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="admin-gate">
          <div className="admin-gate__card">
            <img
              src="/moon-logo-transparent.png"
              alt="Moonworks Talent"
              className="admin-gate__logo"
            />
            <h1 className="admin-gate__title">
              Admin <span className="admin-gate__title-accent">Access</span>
            </h1>
            <p className="admin-gate__subtitle">
              Enter your admin key to access the<br />Moonworks Talent dashboard.
            </p>
            <form onSubmit={handleLogin}>
              <div className="admin-gate__input-group">
                <input
                  id="admin-key-input"
                  type="password"
                  className="admin-gate__input"
                  placeholder="Enter admin key…"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  autoFocus
                  autoComplete="off"
                />
              </div>
              <button
                id="admin-login-btn"
                type="submit"
                className="admin-gate__btn"
                disabled={authLoading || !adminKey.trim()}
              >
                {authLoading ? 'Verifying…' : 'Access Dashboard'}
              </button>
            </form>
            {authError && (
              <div className="admin-gate__error">{authError}</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---------- Dashboard ----------
  return (
    <div className="admin-page">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header__top">
          <div className="admin-header__brand">
            <img
              src="/moon-logo-transparent.png"
              alt="Moonworks Talent"
              className="admin-header__logo-img"
            />
            <div>
              <div className="admin-header__title">
                Moon<span className="admin-header__title-accent">works</span> Talent
              </div>
              <span className="admin-header__badge">Admin Panel</span>
            </div>
          </div>
          <div className="admin-header__actions">
            <button
              id="admin-export-btn"
              className="admin-header__btn admin-header__btn--export"
              onClick={exportCSV}
              disabled={filteredData.length === 0}
              title="Export to CSV"
            >
              <DownloadIcon /> Export CSV
            </button>
            <button
              id="admin-refresh-btn"
              className={`admin-header__btn admin-header__btn--refresh ${isRefreshing ? 'is-spinning' : ''}`}
              onClick={handleRefresh}
              title="Refresh data"
            >
              <RefreshIcon /> Refresh
            </button>
            <button
              id="admin-logout-btn"
              className="admin-header__btn admin-header__btn--logout"
              onClick={handleLogout}
              title="Logout"
            >
              <LogoutIcon /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Stats — only blue & teal accents */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-card__label">Total Submissions</div>
          <div className="admin-stat-card__value admin-stat-card__value--blue">
            {stats.total}
          </div>
          <div className="admin-stat-card__sub">All time</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__label">This Week</div>
          <div className="admin-stat-card__value admin-stat-card__value--teal">
            {stats.thisWeek}
          </div>
          <div className="admin-stat-card__sub">Last 7 days</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__label">Unique Tracks</div>
          <div className="admin-stat-card__value admin-stat-card__value--blue">
            {stats.tracks}
          </div>
          <div className="admin-stat-card__sub">Interest areas</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__label">Latest Entry</div>
          <div className="admin-stat-card__value admin-stat-card__value--teal" style={{ fontSize: '1.125rem' }}>
            {stats.latest ? stats.latest.date : '—'}
          </div>
          <div className="admin-stat-card__sub">
            {stats.latest ? stats.latest.time : 'No submissions yet'}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="admin-error">
          <span>⚠</span> {error}
        </div>
      )}

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-search">
          <span className="admin-search__icon"><SearchIcon /></span>
          <input
            id="admin-search-input"
            type="text"
            className="admin-search__input"
            placeholder="Search by name, email, track, message…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="admin-filter">
          <select
            id="admin-track-filter"
            className="admin-filter__select"
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value)}
          >
            <option value="all">All Tracks</option>
            {uniqueTracks.map((track) => (
              <option key={track} value={track}>
                {track}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-results-count">
          Showing <span>{filteredData.length}</span> of <span>{submissions.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-wrapper">
        <div className="admin-table-container">
          {loading ? (
            <div className="admin-loading">
              <div className="admin-loading__spinner" />
              <div className="admin-loading__text">Loading submissions…</div>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty__icon">📭</div>
              <div className="admin-empty__title">
                {submissions.length === 0 ? 'No submissions yet' : 'No results found'}
              </div>
              <div className="admin-empty__text">
                {submissions.length === 0
                  ? 'Submissions will appear here when people apply.'
                  : 'Try adjusting your search or filter.'}
              </div>
            </div>
          ) : (
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    {[
                      { key: 'id', label: '#' },
                      { key: 'name', label: 'Name' },
                      { key: 'email', label: 'Email' },
                      { key: 'track_interest', label: 'Track' },
                      { key: 'message', label: 'Message' },
                      { key: 'source_page', label: 'Source' },
                      { key: 'created_at', label: 'Date' },
                    ].map((col) => (
                      <th
                        key={col.key}
                        className={sortField === col.key ? 'is-sorted' : ''}
                        onClick={() => handleSort(col.key)}
                      >
                        {col.label}
                        {sortField === col.key && (
                          <span
                            className={`admin-table__sort-icon ${
                              sortDirection === 'desc' ? 'admin-table__sort-icon--desc' : ''
                            }`}
                          >
                            ▲
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => {
                    const dt = formatDate(row.created_at);
                    return (
                      <tr key={row.id || index}>
                        <td className="admin-table__cell-id">
                          {typeof row.id === 'number' ? row.id : index + 1}
                        </td>
                        <td className="admin-table__cell-name">{row.name || '—'}</td>
                        <td className="admin-table__cell-email">
                          <a href={`mailto:${row.email}`}>{row.email || '—'}</a>
                        </td>
                        <td>
                          <span
                            className={`admin-table__cell-track admin-table__cell-track--${getTrackClass(row.track_interest, index)}`}
                          >
                            {row.track_interest || '—'}
                          </span>
                        </td>
                        <td
                          className={`admin-table__cell-message ${
                            !row.message ? 'admin-table__cell-message--empty' : ''
                          }`}
                        >
                          {row.message || 'No message'}
                        </td>
                        <td>
                          <span className="admin-table__cell-source">
                            {row.source_page || '—'}
                          </span>
                        </td>
                        <td className="admin-table__cell-date">
                          {dt.date}
                          <span className="admin-table__cell-date-time">{dt.time}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
