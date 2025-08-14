import mongoose from "mongoose";


const schema = new mongoose.Schema({
  method: String,
  endpoint: String,
  eventType: String,
  userId: mongoose.Schema.Types.Mixed, // ممكن يكون ObjectId أو رقم من الـ .NET
  username: String,
  role: { type: String, default: "user" },
  description: String,
  ipAddress: String,
  userAgent: String,
  body: Object,
  query: Object,
  params: Object,
  createdAt: { type: Date, default: Date.now }
})


export const EventLog = mongoose.model('EventLog' , schema)
