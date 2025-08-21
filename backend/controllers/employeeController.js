const Employee = require('../models/Employee.js')

//adding a new employee 
exports.AddEmployee = async (req , res)=>{
    try {
        const {name , email , department , joiningDate} = req.body;

        if (!name || !email || !department || !joiningDate){
            return res.status(400).json({error :'all the field are mandotory'})
        }

        const existing =await Employee.findOne({email})
        if (existing){
            return res.status(400).json({error : 'employee with same email already exists'})
        }

        const employee = new Employee({name , email , department , joiningDate})
        await employee.save()
        res.status(200).json({message : 'new employee created' , employee})

    } catch (err) {
        res.status(500).json({error : err.message});
    }
}


// get employee by id
exports.EmployeeById = async (req , res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        if (!employee){
            return res.status(400).json({error : 'no employee found by this id'})
        }

        res.json({employee})

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// get all employees
exports.getAllEmployees = async (req , res) => {
    try {
        const allemployees = await Employee.find({})
        if (allemployees.length === 0) {
            return res.status(404).json({error : 'no employees at all '})
        }
        res.json({employees:allemployees})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}