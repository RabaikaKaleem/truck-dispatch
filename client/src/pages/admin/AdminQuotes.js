import React, { useEffect, useState } from 'react';
import { getAllQuotes, updateQuote, deleteQuote } from '../../utils/api';
import { toast } from 'react-toastify';

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [reviewData, setReviewData] = useState({ status: '', adminNote: '', estimatedCost: '' });

  const fetchQuotes = () => {
    getAllQuotes()
      .then(({ data }) => setQuotes(data))
      .catch(() => toast.error('Failed to load quotes'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchQuotes(); }, []);

  const openReview = (quote) => {
    setSelectedQuote(quote);
    setReviewData({ status: quote.status, adminNote: quote.adminNote || '', estimatedCost: quote.estimatedCost || '' });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateQuote(selectedQuote._id, reviewData);
      toast.success('Quote updated!');
      setSelectedQuote(null);
      fetchQuotes();
    } catch { toast.error('Failed to update quote'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this quote?')) return;
    try {
      await deleteQuote(id);
      toast.success('Quote deleted');
      fetchQuotes();
    } catch { toast.error('Failed to delete'); }
  };

  if (loading) return <div className="loading">Loading quotes...</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Quote Requests</h1>
        <span style={{ color: '#95a5a6' }}>{quotes.filter(q => q.status === 'pending').length} pending</span>
      </div>

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>Name</th><th>Email</th><th>Route</th><th>Cargo</th><th>Weight</th><th>Est. Cost</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {quotes.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', color: '#95a5a6', padding: '30px' }}>No quotes yet</td></tr>
              ) : quotes.map((q) => (
                <tr key={q._id}>
                  <td><strong>{q.name}</strong></td>
                  <td style={{ fontSize: '13px' }}>{q.email}</td>
                  <td style={{ fontSize: '12px' }}>{q.pickupLocation} → {q.dropLocation}</td>
                  <td>{q.cargoType}</td>
                  <td>{q.weight} lbs</td>
                  <td style={{ color: '#27ae60', fontWeight: '600' }}>${q.estimatedCost?.toLocaleString()}</td>
                  <td><span className={`badge badge-${q.status}`}>{q.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }} onClick={() => openReview(q)}>Review</button>
                      <button className="btn btn-danger" style={{ padding: '4px 10px', fontSize: '12px' }} onClick={() => handleDelete(q._id)}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedQuote && (
        <div className="modal-overlay" onClick={() => setSelectedQuote(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Review Quote — {selectedQuote.name}</h3>
              <button className="close-btn" onClick={() => setSelectedQuote(null)}>✕</button>
            </div>

            <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '16px', marginBottom: '20px', fontSize: '13px' }}>
              <p><strong>Phone:</strong> {selectedQuote.phone}</p>
              <p><strong>Route:</strong> {selectedQuote.pickupLocation} → {selectedQuote.dropLocation}</p>
              <p><strong>Pickup Date:</strong> {new Date(selectedQuote.pickupDate).toLocaleDateString()}</p>
              <p><strong>Weight:</strong> {selectedQuote.weight} lbs | <strong>Cargo:</strong> {selectedQuote.cargoType}</p>
              {selectedQuote.message && <p><strong>Message:</strong> {selectedQuote.message}</p>}
            </div>

            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Status</label>
                <select value={reviewData.status} onChange={e => setReviewData({ ...reviewData, status: e.target.value })}>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="form-group">
                <label>Final Estimated Cost ($)</label>
                <input type="number" value={reviewData.estimatedCost} onChange={e => setReviewData({ ...reviewData, estimatedCost: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Admin Note to Client</label>
                <textarea value={reviewData.adminNote} onChange={e => setReviewData({ ...reviewData, adminNote: e.target.value })} placeholder="Notes for the client..." />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Update Quote</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuotes;
