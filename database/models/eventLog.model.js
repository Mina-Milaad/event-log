import mongoose from "mongoose";


const schema = new mongoose.Schema({
  method: String,
  endpoint: String,
  EventType: String,
  userId: mongoose.Schema.Types.Mixed, // ممكن يكون ObjectId أو رقم من الـ .NET
  Username: String,
  Role: { type: String, default: "user" },
  description: String,
  IpAddress: String,
  localIPAddress: String,
  computerName: String,
  fullUsername: String,      
  Email: String,

  requestedDates: [{
    requestDate: Date,
    hoursRequested: Number,
    halfDayOption: String,
    startTime: {
      hours: Number,
      minutes: Number,
      seconds: Number
    },
    endTime: {
      hours: Number,
      minutes: Number,
      seconds: Number
    }
  }],

  targetDN: String,
  createdBy: String,
  fromSecureBrowser: Boolean,
  userAgent: String,
  body: Object,
  query: Object,
  params: Object,
  createdAt: { type: Date, default: Date.now }
})


export const EventLog = mongoose.model('EventLog' , schema)
