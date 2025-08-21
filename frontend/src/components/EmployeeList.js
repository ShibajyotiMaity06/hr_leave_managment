import React , {useState , useEffect} from 'react'
import axios from 'axios'

const EmployeeList = ({addEmployee}) => {
    const [employee , setEmployee] = useState([])
    const [error , setError] = useState('')

    useEffect(() => {
        const fetchEmployees = async ()=> {
            try {
                const res = await axios.get('http://localhost:5000/api/employees')
                setEmployee(res.data.employees || [])
            } catch (err) {
                setError(err.response?.data?.error || 'Could not fetch employees');
            }
        }

        fetchEmployees()
    } , [addEmployee])

    if (error) return <div style={{ color: 'red' }}>{error}</div>

    if (employee.length === 0) return <div>No employees found</div>

    return (
    <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '1rem' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Joining Date</th>
        </tr>
      </thead>
      <tbody>
        {employee.map(emp => (
          <tr key={emp._id}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>{new Date(emp.joiningDate).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeList