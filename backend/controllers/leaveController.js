const Leave = require('../models/Leave');
const Employee = require('../models/Employee');


//apply for leave
exports.ApplyforLeave = async (req , res) => {

    try {
        const {employeeId , startDate , endDate , reason} = req.body()
    
    // edge case
    //new is used to create a new instance of an object from a constructor function.
    if (new Date(endDate) < new Date(startDate)){
        return res.status(400).json({error : 'startdate cant be after enddate'})
    }

    //fetch employee
    const employee = await Employee.findById({employeeId})
    if (!employee) {
        return res.status(404).json({error : 'employee not found'})
    }

    //another edge case
    if (new Date(startDate) < new Date(employee.joiningDate)){
        return res.status(400).json({error : 'leave before joing huh'})
    }

    //calc requested leave days
    const requestedLeaveDays = (new Date(endDate) - new Date(startDate))/(1000 * 60 * 60 * 24)+1;

    //edge case if approaved leaves is less than requested 
    const approvedLeaves = await Leave.findOne({
        employee : employeeId,
        status: 'Approved'
    })
    const usedDays = approvedLeaves.reduce((sum, leave) => {
      const leaveDays = 
        (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24) + 1;
      return sum + leaveDays;
    }, 0);

    const remainingBalance = (employee.totalLeave || 20) - usedDays;
    if (requestedDays > remainingBalance) {
      return res.status(400).json({ error: 'Not enough leave balance.' });
    }

    //edge case of overlapping leaves
    const overlapping = await Leave.findOne({
        employee : employeeId,
        $or: [
            {
                startDate:{$lte:endDate},
                endDate: {$lte:startDate}
            }
        ],
        status: {$in: ['Pending' , 'Approved']}
    })

    if (overlapping){
        return res.status(400).json({error : 'ioverlapping leaves '})
    }

    //create leave request
    const leave = new Leave({
    employee: employeeId,
    startDate,
    endDate,
    reason,
    status: 'Pending',
    appliedDate: new Date()
    })

    await leave.save()
    res.status(201).json({message: 'leave request raissed'})
    } catch (error) {
        res.status(500).json({error})
    }

}


//approve leave
exports.ApproveLeave = async (req , res) => {
    try {
        const leave = await Leave.findOne(req.params.Id)

        if (!leave) {
            res.status(404).json({error : 'leave not found'})
        }

        if (leave.status !== 'Pending'){
            res.status(400).json({error : 'its not a pending leave'})
        }

        leave.status = 'Approved'
        leave.approvedDate = new Date()
        await leave.save()
        res.json({message : 'leave approaved yayaya' , leave})
    } catch (error) {
        res.status(500).json({error})
    }
}


//RejectLeave controller 
exports.RejectLeave = async (req , res) => {
    try {
        const leave = await Leave.findOne(req.params.Id)

        if (!leave) {
            res.status(404).json({error : 'leave not found'})
        }

        if (leave.status !== 'Pending'){
            res.status(400).json({error : 'its already processed'})
        }

        leave.status = 'Rejected'
        leave.rejectedDate = new Date()
        await leave.save()
        res.json({message : 'leave rejected !yayaya' , leave})
    } catch (error) {
        res.status(500).json({error})
    }
}



//fetch leave balance
exports.LeaveBalance = async (req , res) => {
    try {
        const employee = await Employee.findOne(req.params.employeeId)

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found.' });
    }

    const approvedLeaves = await Leave.findOne({
        employee : employeeId,
        status : 'Approved'
    })

    
    const usedDays = approvedLeaves.reduce((sum, leave) => {
      const leaveDays = 
        (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24) + 1;
      return sum + leaveDays;
    }, 0);

    const totalLeave = employee.totalLeave || 20; 
    const remainingBalance = totalLeave - usedDays;
    res.json({ leaveBalance: remainingBalance });
    } catch (error) {
        res.status(500).json({error})
    }
}

//get all leave requests for HR
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({}).populate('employee');
    if (leaves.length === 0) {
      return res.status(404).json({ message: 'No leave requests found.' });
    }
    res.json({ leaves });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // populate() fetches referenced documents and replaces those IDs with the documents themselves.
};