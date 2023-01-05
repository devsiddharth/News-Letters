const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname +"/signup.html");
});

app.post("/", function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;


  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME:lastName
        }
      }
    ]
  };

   const jsonData = JSON.stringify(data);

   const url = "https://us21.api.mailchimp.com/3.0/lists/b1cf0fad25"
// https://dev.api.mailchimp.com/3.0/lists/
   const options = {
     method: "POST",
     auth: "siddharth:1c4b83805c1485d01d9dc1b853871f78-us21"
   }

   const request = https.request(url, options, function(response){
     if(response.statusCode === 200){
       res.sendFile(__dirname + "/success.html");
     }
     else{
       res.sendFile(__dirname + "/failure.html");
     }
     response.on("data", function(data){
       console.log(JSON.parse(data));
     })
   });
   request.write(jsonData);
   request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/");
})



app.listen(process.env.PORT || 3000, function(){
  console.log("server started running on port 3000");
});


// 1c4b83805c1485d01d9dc1b853871f78-us21

// b1cf0fad25
