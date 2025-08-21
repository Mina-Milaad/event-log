import express from 'express'
import cors from 'cors'
import { dbConn } from './database/dbConnection.js';
import { bootstrap } from './src/modules/bootstrap.js'
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const port = 5000;
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  req.io = io;
  next();
});

bootstrap(app)


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// محلي زي السيرفر
if (process.env.NODE_ENV === "development") {
  app.use("/event", express.static(path.join(__dirname, "public")));
  app.get("/event", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
  });
}


app.use( express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  socket.on("disconnect",  () => console.log("Client disconnected:", socket.id));
});


server.listen(port, "0.0.0.0",() => console.log(`Example app listening on port ${port}!`))