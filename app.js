const express = require('express')
const dotenv = require('dotenv')

//config
dotenv.config({path:"./config/config.env"})
const PORT = process.env.PORT || 5000

// import routers
const meals = require('./routes/meal')


// mount 
const app = express();

app.use('/api/v1/meal',meals)

app.listen( PORT, () => {
  console.log(`Example app listening on port ${PORT} !`)
});
