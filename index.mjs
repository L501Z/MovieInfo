import express from 'express';

import router from './API/routes/databaseRoutes.mjs';

import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = "C:\\\Users\\gfuhygo\\OneDrive\\Documents\\traffic_application";

app.use(bodyParser.json() );     
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/api/v2", router);

app.get("/", (req,res,next)=>{
  res.status(200).send("hello")
})

app.listen(5000, () => {
  console.log(`API is listening on port ${5000}`);
});