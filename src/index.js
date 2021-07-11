const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
const port = 5000

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

console.log(results);


app.use(cookieParser());

// set a cookie
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  res.cookie('hello', 'world');
  next(); // <-- important!
});

app.get('/', (req, res) => {
  res.status(200).json({hello: "world"});
})

app.post('/a', (req, res) => {
  res.status(200).json({opa:"shlopa"});
})

app.listen(port, () => {
  // console.log(`Example app listening at http://localhost:${port}`)

  // const logger = new seq.Logger({serverUrl: 'http://10.10.102.188:5341/'})

  // logger.emit({
  //   timestamp: new Date(),
  //   level: "Information",
  //   messageTemplate: 'Hello for the {n}th time, {user}!',
  //   properties: {
  //       user: 'admin',
  //       n: 20
  //   }
  // });

  // logger.close();
})

// http://localhost:5341/
