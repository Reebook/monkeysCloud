/**
 * ComponentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//const component = require("../models/component");

module.exports = {
  create: async function (req, res) {
    try {
      const newComponent = await component.create(req.body).fetch();
      res.json({ component: newComponent });
    } catch (error) {
      res.serverError();
      console.log(error);
    }
  },
  read: async function (req, res) {
    if (req.params.id != undefined) {
      const readComponent = await component.findOne(req.params.id);
      return res.json(readComponent);
    } else return res.send("invalid input");
  },
  readAll: async function (req, res) {
    try {
      const components = await component.find({
        where: { project: req.params.id },
        select: ["name"],
      });
      res.json(components);
    } catch (error) {
      res.serverError(error);
      console.log(error);
    }
  },
  update: async function (req, res) {
    if (req.body.id == undefined || Object.keys(req.body) == null)
      return res.send("invalid input");
    else {
      const updatedComponent = await component
        .update(req.body.id)
        .set(req.body)
        .fetch();
      return res.json(updatedComponent);
    }
  },
  delete: async function (req, res) {
    if (req.params.id != undefined) {
      const deletedComponent = await component.destroyOne(req.params.id);
      return res.json(deletedComponent);
    } else return res.send("invalid input");
  },
};
