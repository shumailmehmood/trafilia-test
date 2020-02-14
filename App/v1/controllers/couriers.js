const Courier = require('../../schemas/courier');
const { validate_courier_reg } = require('../../validatingMethods/validate')
exports.courierReg = async (req, res) => {
   try {
      const { error } = validate_courier_reg(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      let data = new Courier(req.body);
      data = await data.save();
      return res.send(data);
   } catch (err) { return res.status(400).send(err.message); }
}
exports.courierCheckOut = async (req, res) => {
   try {
      const { id } = req.params;
      let data = await Courier.findByIdAndUpdate(id, req.body, { new: true }).lean()
      return res.send(data);
   } catch (err) { return res.status(400).send(err.message); }
}
exports.getCourier = async (req, res) => {
   try {
      const { id, page, limit } = req.query;
      page = page ? +page : 1;
      limit = limit ? +limit : 10;
      let query={};     
      let data = await Courier.aggregate([
         { $match: query },
         {
            $facet: {
               metadata: [{ $count: "total_items" },
               {
                  $addFields: {
                     page: page,
                     limit: limit,
                     pages: { $ceil: { $divide: ["$total_items", limit] } }
                  }
               }],
               data: [{ $skip: (page * limit - limit) }, { $limit: limit }]
            }
         }
      ]);
      return res.send(data[0])
   } catch (err) { return res.status(400).send(err.message); }
}

