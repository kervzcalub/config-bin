import express from "express";
import fs from "fs";

const app = express();
const port = 3000;




app.post("/", (req,res) => {
    let message;
    const vpn = req.query.vpn;
    const conf = req.query.config;
    try{
        fs.writeFile(`${vpn}.conf`, conf, (err) => {
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

app.get("/", (req, res) => {
    if(!req.query.vpn){
        res.send("Hello World!");
        return;
    }
    try {
        const vpn = req.query.vpn;
        if (fs.existsSync(`${vpn}.conf`)) {
            const data = fs.readFileSync(`${vpn}.conf`, 'utf8');
            res.send(data);
        }else{
            throw Error ("Config Not Found")
        }
        
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