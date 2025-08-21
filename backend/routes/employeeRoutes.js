//POST /api/employees — Add employee

//GET /api/employees/:id — Get employee details

const express = require('express')
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/' , employeeController.AddEmployee)
router.get('/:id' , employeeController.EmployeeById)
router.get('/' , employeeController.getAllEmployees)

module.exports = router