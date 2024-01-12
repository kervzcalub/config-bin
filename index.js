import express from "express";
import fs from "fs";

const app = express();
const port = 3000;


app.get("/", (req, res) =>{
    res.send("Hello World!");
});

app.post("/inet", (req,res) => {
    let message;
    try{
        const conf = req.query.config;
        fs.writeFile("inet.conf", conf, (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
          });
        message = {
            success:true
        }
    }catch(error) {
        message = {
            success: false,
            error: error.message
        }
    };
    res.send(message);
});

app.get("/inet", (req, res) => {
    try {
        const data = fs.readFileSync('inet.conf', 'utf8');
        console.log(data);
        res.send(data);
      } catch (error) {
        console.error(error);
        const message = {
            success: false,
            error: error.message
        }
        res.send(message);
      }
});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });