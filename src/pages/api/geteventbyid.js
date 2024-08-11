// pages/api/events/getAllEvents.js
import conndb from "../../../middleware/mongoose";
import Events from "../../../models/Events";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { event_id } = req.query; 
      const events = await Events.findById(event_id);
      //console.log(events);
      // Fetch events and sort by most recent
      res.status(200).json({success:true,events:events});
    } catch (error) {
      console.error(error);
      res.status(500).json({success:false, message: "Error fetching events" });
    }
  } else {
    res.status(405).json({success:false, message: "Method not allowed" });
  }
};

export default conndb(handler);
