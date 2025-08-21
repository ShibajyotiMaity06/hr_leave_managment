import React, { useState } from 'react';
import axios from 'axios';

const LeaveForm = ({ onLeaveApplied }) => {
  const [form, setForm] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Basic validation: dates provided and endDate >= startDate
    if (!form.startDate || !form.endDate) {
      setError('Start date and end date are required.');
      return;
    }
    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError('End date cannot be before start date.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/leaves', form);
      onLeaveApplied(res.data.leave); // Notify parent to refresh list
      setForm({ startDate: '', endDate: '', reason: '' });
    } catch (err) {
      setError(
  typeof err.response?.data?.error === "string"
    ? err.response.data.error
    : JSON.stringify(err.response.data.error)
);

    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="reason"
        placeholder="Reason (optional)"
        value={form.reason}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Applying...' : 'Apply Leave'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default LeaveForm;
