import React, { useState, useEffect } from 'react';

// Initial mock dataset (simulates server DB)
const INITIAL_STUDENTS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@school.com', course: 'React', grade: 'A', score: 92 },
  { id: 2, name: 'Bob Smith', email: 'bob@school.com', course: 'JavaScript', grade: 'B', score: 78 },
  { id: 3, name: 'Carol White', email: 'carol@school.com', course: 'React', grade: 'A', score: 95 },
  { id: 4, name: 'Dave Brown', email: 'dave@school.com', course: 'Python', grade: 'C', score: 62 },
  { id: 5, name: 'Eve Davis', email: 'eve@school.com', course: 'SQL', grade: 'B', score: 80 },
  { id: 6, name: 'Frank Miller', email: 'frank@school.com', course: 'React', grade: 'B', score: 75 },
  { id: 7, name: 'Grace Lee', email: 'grace@school.com', course: 'JavaScript', grade: 'A', score: 88 },
  { id: 8, name: 'Hank Wilson', email: 'hank@school.com', course: 'Python', grade: 'C', score: 58 },
  { id: 9, name: 'Ivy Taylor', email: 'ivy@school.com', course: 'SQL', grade: 'A', score: 91 },
  { id: 10, name: 'Jake Anderson', email: 'jake@school.com', course: 'React', grade: 'B', score: 83 },
  { id: 11, name: 'Kara Thomas', email: 'kara@school.com', course: 'JavaScript', grade: 'A', score: 90 },
  { id: 12, name: 'Liam Martin', email: 'liam@school.com', course: 'Python', grade: 'B', score: 74 },
];

// Helper to simulate asynchronous API network latency
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function StudentManagementAPI() {
  // ── 1. CORE APPLICATION STATES ──
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState(null); // { text: string, type: 'success' | 'error' }

  // ── 2. SEARCH & PAGINATION STATES ──
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  // ── 3. FORM & EDITING STATES ──
  const [form, setForm] = useState({ name: '', email: '', course: 'React', score: 80 });
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Helper: display self-dismissing toast notifications
  const triggerToast = (text, type = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 3000);
  };

  // ── 4. REST API SIMULATION HANDLERS (CRUD) ──

  // [GET] Fetch / refresh all student records
  const handleGetAll = async () => {
    setLoading(true);
    await sleep(700);
    setLoading(false);
    triggerToast(`GET /api/students → ${students.length} records fetched`);
  };

  // [POST] Create a new student record
  const handlePostStudent = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      triggerToast('Name and email are required fields!', 'error');
      return;
    }

    setLoading(true);
    await sleep(600);

    const numScore = Number(form.score) || 0;
    const grade = numScore >= 80 ? 'A' : numScore >= 60 ? 'B' : 'C';

    const newStudent = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      course: form.course,
      score: numScore,
      grade
    };

    setStudents((prev) => [newStudent, ...prev]);
    setForm({ name: '', email: '', course: 'React', score: 80 });
    setLoading(false);
    triggerToast('POST /api/students → 201 Created ✅');
  };

  // [PUT] Update an existing student record by ID
  const handlePutStudent = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      triggerToast('Name and email are required fields!', 'error');
      return;
    }

    setLoading(true);
    await sleep(600);

    const numScore = Number(form.score) || 0;
    const grade = numScore >= 80 ? 'A' : numScore >= 60 ? 'B' : 'C';

    setStudents((prev) =>
      prev.map((s) =>
        s.id === editingId
          ? { ...s, name: form.name.trim(), email: form.email.trim(), course: form.course, score: numScore, grade }
          : s
      )
    );

    setEditingId(null);
    setForm({ name: '', email: '', course: 'React', score: 80 });
    setLoading(false);
    triggerToast('PUT /api/students/:id → 200 Updated ✅');
  };

  // [DELETE] Remove a student record by ID
  const handleDeleteStudent = async (id) => {
    setLoading(true);
    await sleep(500);

    setStudents((prev) => prev.filter((s) => s.id !== id));
    setDeleteConfirmId(null);
    setLoading(false);
    triggerToast('DELETE /api/students/:id → 204 No Content ✅');
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setForm({
      name: student.name,
      email: student.email,
      course: student.course,
      score: student.score
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', email: '', course: 'React', score: 80 });
  };

  // ── 5. FILTERING & PAGINATION DERIVATIONS ──
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / PAGE_SIZE) || 1;
  const paginatedData = filteredStudents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', borderRadius: 14, padding: '1.5rem', color: 'white', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: '0 0 0.4rem', fontSize: '1.4rem', fontWeight: 800 }}>🎓 Student Management API UI</h2>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '0.92rem' }}>
          A fully functional CRUD interface with simulated REST API calls — GET, POST, PUT, DELETE with loading states, error handling, search, and pagination.
        </p>
      </div>

      {/* Toast Alert Banner */}
      {toastMsg && (
        <div style={{
          background: toastMsg.type === 'error' ? '#fee2e2' : '#dcfce7',
          color: toastMsg.type === 'error' ? '#991b1b' : '#166534',
          border: `1px solid ${toastMsg.type === 'error' ? '#fca5a5' : '#86efac'}`,
          borderRadius: 8, padding: '10px 16px', marginBottom: '1.25rem', fontWeight: 600, fontSize: '0.88rem'
        }}>
          {toastMsg.type === 'error' ? '⚠️ ' : '✅ '} {toastMsg.text}
        </div>
      )}

      {/* Controls Bar: Search & GET ALL */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, minWidth: 200, padding: '9px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
        />
        <button
          onClick={handleGetAll}
          disabled={loading}
          style={{ background: '#f0fdf4', border: '1.5px solid #10b981', color: '#166534', borderRadius: 8, padding: '8px 16px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
        >
          {loading ? '⏳ Loading...' : '📥 GET ALL'}
        </button>
        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{filteredStudents.length} records</span>
      </div>

      {/* Form Section: Add (POST) or Edit (PUT) */}
      <form
        onSubmit={editingId ? handlePutStudent : handlePostStudent}
        style={{
          background: '#f8fafc',
          border: `2px solid ${editingId ? '#f59e0b' : '#6366f1'}33`,
          borderRadius: 12,
          padding: '1.25rem',
          marginBottom: '1.5rem'
        }}
      >
        <h4 style={{ margin: '0 0 0.75rem', color: editingId ? '#92400e' : '#4338ca', fontWeight: 800 }}>
          {editingId ? '✏️ Edit Student (PUT)' : '➕ Add Student (POST)'}
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem', marginBottom: '1rem' }}>
          <input
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.87rem' }}
            required
          />
          <input
            type="email"
            placeholder="Email *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.87rem' }}
            required
          />
          <select
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.87rem' }}
          >
            {['React', 'JavaScript', 'Python', 'SQL'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Score"
            value={form.score}
            onChange={(e) => setForm({ ...form, score: e.target.value })}
            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.87rem' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: editingId ? '#f59e0b' : '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.88rem'
            }}
          >
            {loading ? '⏳ Please wait...' : editingId ? 'Update Student' : '+ Add Student'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              style={{ background: 'white', border: '1px solid #cbd5e1', color: '#64748b', borderRadius: 8, padding: '8px 14px', fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem' }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Student Records Table */}
      <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: 12, marginBottom: '1.25rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.87rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '11px 12px', fontWeight: 700 }}>#</th>
              <th style={{ padding: '11px 12px', fontWeight: 700 }}>Name</th>
              <th style={{ padding: '11px 12px', fontWeight: 700 }}>Email</th>
              <th style={{ padding: '11px 12px', fontWeight: 700 }}>Course</th>
              <th style={{ padding: '11px 12px', fontWeight: 700 }}>Score</th>
              <th style={{ padding: '11px 12px', fontWeight: 700 }}>Grade</th>
              <th style={{ padding: '11px 12px', fontWeight: 700 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b' }}>
                  ⏳ Loading data from server...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '2.5rem', textAlign: 'center', color: '#94a3b8' }}>
                  No students found matching your search.
                </td>
              </tr>
            ) : (
              paginatedData.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9', background: editingId === s.id ? '#fffbeb' : 'white' }}>
                  <td style={{ padding: '10px 12px', color: '#94a3b8', fontSize: '0.8rem' }}>
                    {(currentPage - 1) * PAGE_SIZE + i + 1}
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0f172a' }}>{s.name}</td>
                  <td style={{ padding: '10px 12px', color: '#64748b', fontSize: '0.82rem' }}>{s.email}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: 4, fontSize: '0.78rem', fontWeight: 600 }}>
                      {s.course}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{s.score}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 800, color: s.grade === 'A' ? '#10b981' : s.grade === 'B' ? '#f59e0b' : '#ef4444' }}>
                    {s.grade}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => startEdit(s)}
                        style={{ background: '#fef3c7', border: '1px solid #f59e0b', color: '#92400e', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700 }}
                      >
                        ✏️ PUT
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(s.id)}
                        style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#991b1b', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700 }}
                      >
                        🗑️ DEL
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.6rem' }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: '7px 14px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.4 : 1 }}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            style={{
              width: 32, height: 32, borderRadius: 8, border: '1px solid', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700,
              background: currentPage === idx + 1 ? '#6366f1' : 'white',
              color: currentPage === idx + 1 ? 'white' : '#374151',
              borderColor: currentPage === idx + 1 ? '#6366f1' : '#cbd5e1'
            }}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
          style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: '7px 14px', cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer', opacity: currentPage >= totalPages ? 0.4 : 1 }}
        >
          Next
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: '2rem', maxWidth: 380, width: '90%', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.5rem', color: '#0f172a' }}>Confirm Delete</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
              DELETE /api/students/{deleteConfirmId} — This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirmId(null)} style={{ background: 'white', border: '1px solid #cbd5e1', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 600 }}>
                Cancel
              </button>
              <button onClick={() => handleDeleteStudent(deleteConfirmId)} style={{ background: '#dc2626', color: 'white', border: 'none', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 700 }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
