const mongoose = require('mongoose')

const AssetSchema = new mongoose.Schema({
    EmployeeName: String,
    EmployeeId: String,
    Asset1: String,
    Asset2: String,
    Asset3: String,
    Asset4: String,
    IssueDate: Date,
    ReturnDate: Date
   
})

const AssetModel = mongoose.model("asset",AssetSchema)
module.exports = AssetModel