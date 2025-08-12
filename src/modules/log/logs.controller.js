

import { EventLog } from "../../../database/models/eventLog.model.js";



export const log = async (req, res) => {
  try {
    const { limit = 100, eventType } = req.query;
    const filter = {};
    if (eventType) filter.eventType = eventType;

    const logs = await EventLog.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json({ ok: true, count: logs.length, logs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Error fetching logs" });
  }
}