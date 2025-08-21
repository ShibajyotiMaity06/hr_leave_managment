import React , {useState} from 'react'
import axios from 'axios'

const EmployeeForm = ({onAdd})=> {
    const [form , setForm] = useState({
        name : '',
        email: '',
        department: '',
        joiningDate : ''
    })

    const [error , setError] = useState('')

    const handleChange = e => {
        setForm({ ...form , [e.target.name]: e.target.value})
        setError('')
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/employees' , form)
// When you submit an HTML form, the browser’s default action is to send the form data to the server and then reload the page.
// event.preventDefault() stops this default page reload, letting your React code control exactly what happens on form submission.
            onAdd(res.data.employee)
            setForm({name : '',
        email: '',
        department: '',
        joiningDate : ''})
        } catch (err) {
            setError(err.response?.data?.error || 'Error adding employee');
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
             <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="joiningDate"
        placeholder="Joining Date"
        value={form.joiningDate}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Employee</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
    )
}

export default EmployeeForm;