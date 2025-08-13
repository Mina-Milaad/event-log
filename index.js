import express from 'express';
import cors from 'cors';
import { bootstrap } from './src/modules/bootstrap.js';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' },
  path: '/event/socket.io/' // المسار المخصص للـ socket.io
});

const port = 8050;

app.use(cors());
app.use(express.json());

// نضيف io للـ req بحيث أي Route يقدر يرسل أحداث
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ملفات الواجهة (Dashboard)
app.use('/event', express.static(path.join(__dirname, 'public')));

// API routes تحت /event/api
app.use('/event/api/logs', bootstrap);

// لو حد فتح /event مباشرة يجيب dashboard.html
app.get('/event', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Socket.IO events
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
