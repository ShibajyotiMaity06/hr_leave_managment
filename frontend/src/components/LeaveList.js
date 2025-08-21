import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaveList = ({ refreshTrigger }) => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');
  const [loadingIds, setLoadingIds] = useState({}); // Track which leave is processing approve/reject

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/leaves');
        setLeaves(res.data.leaves || []); // Adjust key based on backend response
      } catch (err) {
        setError(err.response?.data?.error || 'Could not fetch leaves');
      }
    };
    fetchLeaves();
  }, [refreshTrigger]); // Refetch when leave list needs refresh

  const updateLeaveStatus = async (id, action) => {
    setLoadingIds(prev => ({ ...prev, [id]: true }));
    try {
      const url = `http://localhost:5000/api/leaves/${id}/${action}`;
      const res = await axios.put(url);
      // Update leave status locally without refetching entire list
      setLeaves(prevLeaves =>
        prevLeaves.map(leave =>
          leave._id === id ? { ...leave, status: res.data.leave.status } : leave
        )
      );
    } catch (err) {
      alert('Error updating leave status');
    } finally {
      setLoadingIds(prev => ({ ...prev, [id]: false }));
    }
  };

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (leaves.length === 0) return <div>No leave requests found.</div>;

  return (
    <table border="1" cellPadding="8" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Reason</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {leaves.map(leave => (
          <tr key={leave._id}>
            <td>{leave.employee?.name || 'Unknown'}</td>
            <td>{new Date(leave.startDate).toLocaleDateString()}</td>
            <td>{new Date(leave.endDate).toLocaleDateString()}</td>
            <td>{leave.reason || '-'}</td>
            <td>{leave.status}</td>
            <td>
              {leave.status === 'Pending' ? (
                <>
                  <button
                    onClick={() => updateLeaveStatus(leave._id, 'approve')}
                    disabled={loadingIds[leave._id]}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateLeaveStatus(leave._id, 'reject')}
                    disabled={loadingIds[leave._id]}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    Reject
                  </button>
                </>
              ) : (
                <i>Processed</i>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaveList;
