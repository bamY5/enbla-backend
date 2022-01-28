const express = require('express')
const dotenv = require('dotenv')
const body_parser = require('body-parser')
//config
dotenv.config({path:"./config/config.env"})
const PORT = process.env.PORT || 5000

// import routers
const liemat = require('./routes/liemat');
const meal = require('./routes/meal');
const user = require('./routes/user');

// mount 
const app = express();
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: true}))


app.use('/api/v1/liemat',liemat);
app.use('/api/v1/meal',meal);
app.use('/api/v1/user',user);


app.listen( PORT, () => {
  console.log(`Example app listening on port ${PORT} !`)
});
