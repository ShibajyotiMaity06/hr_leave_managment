import React, { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';

const EmployeePage = () => {
  const [addedEmployee, setAddedEmployee] = useState(null);

  return (
    <div>
      <h2>Add Employee</h2>
      <EmployeeForm onAdd={setAddedEmployee} />
      <h2>All Employees</h2>
      <EmployeeList addedEmployee={addedEmployee} />
    </div>
  );
};

export default EmployeePage;