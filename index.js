const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


const path = require('path');
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index'));

server.listen(app.get('port'), () => {
    console.log('\nExpress server up and running at http://localhost:%s.\n', app.get('port'));
    //console.log(process.env.NODE_ENV);
});

io.on('connection', function(socket) {
    console.log("got connection");
    socket.on('disconnect', function() {

        console.log("got disconnect asasd");

    });
});