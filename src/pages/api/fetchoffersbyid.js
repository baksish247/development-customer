import conndb from "../../../middleware/mongoose";
import DailyOffers from "../../../models/DailyOffers";

const handler = async (req, res) => {
  if (req.method == "POST") {
    //console.log(req.body);
    try {
      const { restaurant_id } = req.body;
      const offers = await DailyOffers.find({ restaurant_id });
      res.status(200).json({ success: true, data: offers });
    } catch (e) {
      res.status(201).json({
        success: false,
        error:
          "We are facing some technical issue currently, you can however order in-person directly to the waiter",
      });
    }
  }
};
export default conndb(handler);
