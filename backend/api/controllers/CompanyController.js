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
      console.log(error);
    }
  },
  read: async function (req, res) {
    if (req.params.id != undefined) {
      const readCompany = await company.findOne(req.params.id);
      return res.json(readCompany);
    } else {
      return res.send("invalid input");
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
  getMyCompanies: async function (req, res) {
    try {
      const companies = await company
        .find({
          where: { owner: req.user },
          select: ["name", "website", "phone", "email"],
        })
        .select()
        .populate("owner");
      res.send({ companies });
    } catch (error) {
      res.serverError();
    }
  },
};
