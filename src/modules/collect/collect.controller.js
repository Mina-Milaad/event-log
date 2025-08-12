
import { EventLog } from "../../../database/models/eventLog.model.js";



export const collect = async (req, res) => {
  try {
    const log = await EventLog.create({
      ...req.body,
      createdAt: new Date()
    });

    // بث الحدث عبر Socket.IO
    req.io.emit("eventLog", log);

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Error saving log" });
  }
}