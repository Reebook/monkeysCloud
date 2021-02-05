/**
 * StateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//const state = require("../models/state");

module.exports = {
  create: async function (req, res) {
    try {
      const newState = await state.create(req.body).fetch();
      res.send({ state: newState });
    } catch (error) {
      res.serverError("Invalid Data");
      console.log(error);
    }
  },

  readAll: async function (req, res) {
    /*   const query = {};
    if (req.query.query) {
      query.name = { contains: req.query.query };
    } */
    try {
      const states = await state.find({
        where: { project: req.params.id },
        select: ["name", "position"],
        sort: "position ASC",
      });

      res.send({ states });
    } catch (error) {
      res.serverError();
      console.log(error);
    }
  },

  update: async function (req, res) {
    try {
      const data = await state.update(req.params.id).set(req.body).fetch();
      console.log(data);
      res.send({ state: data });
    } catch (error) {
      console.log(error);
      res.badRequest();
    }
  },
  delete: async function (req, res) {
    if (req.params.id != undefined) {
      const deletedState = await state.destroyOne(req.params.id);
      return res.json(deletedState);
    } else return res.send("invalid input");
  },
};
