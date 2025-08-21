import React, { useState } from 'react';
import LeaveForm from '../components/LeaveForm';
import LeaveList from '../components/LeaveList';

const LeavePage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Called after successfully applying a leave to refresh list
  const handleLeaveApplied = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div>
      <h2>Apply for Leave</h2>
      <LeaveForm onLeaveApplied={handleLeaveApplied} />
      <h2>Leave Requests</h2>
      <LeaveList refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default LeavePage;
