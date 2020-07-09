var express = require("express")
var cors = require("cors")
// var bodyParser = require('body-parser'); // (for Express <4.16.0)

var app = express()

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

// Configuring body parser middleware  // (for Express <4.16.0)
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

//(since Express v4.16.0)
app.use(express.urlencoded())
app.use(express.json())

app.post("/api/login/", (req, res) => {
  console.log("\n-------------------START---------------------")
  console.log("API : ", req.url)
  console.log("HEADER : ", req.headers)
  console.log("BODY : ", req.body)
  const credential = req.body
  if ("user" === credential.username && "user" === credential.password) {
    res.status(200).json({
      token: "YXV0aG9yOiBTaHJlZWphbCBTaGFreWE=",
    })
  } else {
    res.status(401).json({
      message: "Username or password incorrect.",
    })
  }
  console.log("RESPONSE_CODE", res.statusCode)
  console.log("RESPONSE_MESSAGE", res.statusMessage)
  console.log("MESSAGE", res.data)
  console.log("--------------------END----------------------")
})

app.listen(8000)
