const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/student');
const path = require('path');
const alumni = require('./models/alumni')
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const mongoURI = 'mongodb+srv://vignesh:vignesh26@cluster0.oam6m.mongodb.net/fieldproxy?retryWrites=true&w=majority'

mongoose.connect(mongoURI).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})

app.listen(3000)
app.use('/', (req, res, next) => {
    next();
});

app.use('/login', (req, res, next) => {
    res.render('auth/login', {
        path: 'alumni/login',
        docType: 'Login'
    })
})
app.use('/Plogin', (req, res, next) => {
    const studId = req.body.stud_id;
    const phoneNo = req.body.phoneno;
    var student = Student.find(student => student.studId === studId && student.phoneNO === phoneNo);
    console.log(student);
    if (student != 0) {
        res.redirect('student/student');
    }
})
app.use('/student', (req, res, next) => {
    res.render('student/student', {
        docType: 'Student',
        path: 'admin/addproduct',
        alumns: alumni
    })
})
app.use('/alumni', (req, res, next) => {
    res.send("This is alumni page");
})