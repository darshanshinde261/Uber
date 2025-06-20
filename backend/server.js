const app = require('./app');
const http = require('http');
require('dotenv').config();
const port = process.env.PORT || 3000;
console.log('port is ' + port);
const server = http.createServer(app);

server.listen(port, ()=>{
    console.log('server is running on port ' + port);
})