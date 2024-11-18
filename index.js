const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./models/Employee')
const AssetModel = require('./models/Asset')
const bcrypt = require('bcrypt')
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://monisha212206:kss-company@kss.d20qi.mongodb.net/employee")

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            
            if (user) {
                bcrypt.compare(password, user.password, (err,response) =>{
                    if(response) {
                        res.json("success")
                    } else {
                        res.json("the password is incorrecct")
                    }
                })
            } else {
                res.json("No record existed")
            }
        })
})


app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            EmployeeModel.create({ name, email, password: hash })
                .then(employees => res.json(employees))
                .catch(err => res.json(err))

        }).catch(err => console.log(err.message))

})
app.post('/admin-dashboard', (req, res) => {
    AssetModel.create(req.body)
    .then(asset => res.json(asset))
                .catch(err => res.json(err))

    
     })

app.listen(3001, () => {
    console.log("server is running")
})