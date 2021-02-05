/**
 * CompanyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    try {
      const newCompany = await company
        .create({ ...req.body, owner: req.user })
        .fetch();
      res.send({ company: newCompany });
    } catch (error) {
      res.serverError(error);
    }
  },
  read: async function (req, res) {
    try {
      const Company = await company.findOne(req.params.id).populate("owner");
      if (!Company) return res.notFound();
      res.send({ company: Company });
    } catch (error) {
      res.serverError(error);
    }
  },

  readAll: async function (req, res) {
    const query = {};
    if (req.query.owner) query.owner = req.query.params;
    try {
      const companies = await company
        .find({
          where: query,
          select: ["name", "website", "phone", "email"],
        })
        .populate("owner");
      res.send({ companies });
    } catch (error) {
      console.log(error)
      res.serverError();
    }
  },

  update: async function (req, res) {
    try {
      const companyUpdated = await company
        .update({ id: req.params.id, owner: req.user })
        .set(req.body)
        .fetch();
      res.send({ company: companyUpdated });
    } catch (error) {
      res.serverError();
    }
  },
  delete: async function (req, res) {
    if (req.params.id != undefined) {
      const deletedCompany = await company.destroyOne(req.params.id);
      return res.json(deletedCompany);
    } else {
      return res.send("invalid input");
    }
  },
};
