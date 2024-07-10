const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();
// convert data into json format

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// use ejs as view engine
app.set('view engine', 'ejs');

//static folder
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

//Register user

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
    };

    //check if the user already exist
    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send("user already exists");
    }

    else {

        //hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;
        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }

});


app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send('user not found');
        }
        //compare the hash password to the plain password

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.render('home');
        }
        else {
            res.send('wrong password');
        }
    } catch {
        res.send('wrong details');
    }
})


const port = 5000;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})