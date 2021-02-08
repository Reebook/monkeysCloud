/**
 * CompanyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    try {
      const company = await Company.create({
        ...req.body,
        owner: req.user,
      }).fetch();
      res.send(company);
    } catch (error) {
      res.serverError(error);
    }
  },
  read: async function (req, res) {
    try {
      const company = await Company.findOne(req.params.id).populate("owner");
      if (!company) return res.notFound();
      res.send(company);
    } catch (error) {
      res.serverError(error);
    }
  },

  readAll: async function (req, res) {
    const query = {};
    if (req.query.owner) query.owner = req.query.params;
    try {
      const companies = await Company.find({
        where: query,
        select: ["name", "website", "phone", "email"],
      }).populate("owner");
      res.send(companies);
    } catch (error) {
      console.log(error);
      res.serverError();
    }
  },

  update: async function (req, res) {
    try {
      const company = await Company.update({
        id: req.params.id,
        owner: req.user,
      })
        .set(req.body)
        .fetch();
      res.send(company);
    } catch (error) {
      res.serverError();
    }
  },
  delete: async function (req, res) {
    if (req.params.id != undefined) {
      const company = await Company.destroyOne(req.params.id);
      return res.json(company);
    } else {
      return res.send("invalid input");
    }
  },
};
