// POST /api/leaves — Apply for leave

// PUT /api/leaves/:id/approve — Approve leave

// PUT /api/leaves/:id/reject — Reject leave

// GET /api/leaves/:employeeId/balance — Fetch leave balance

// GET /api/leaves — Get all leave requests (for HR)


const express = require('express')
const router = express.Router()
const leaveController = require('../controllers/leaveController.js')
const { EmployeeById } = require('../controllers/employeeController')

router.post('/' , leaveController.ApplyforLeave)
router.put('/:id/approve' , leaveController.ApproveLeave)
router.put('/:id/reject' , leaveController.RejectLeave)
router.get('/:employeeId/balance' , leaveController.LeaveBalance)
router.get('/' , leaveController.getAllLeaves)


module.exports = router