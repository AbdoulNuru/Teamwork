import http from 'http';
import app  from './app';

const port = process.env.PORT;
const TeamworkServer = http.createServer(app);

TeamworkServer.listen(port, ()=>{
    console.log(`Teamwork Server running on ${port}`);
});