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
      const state = await State.create(req.body).fetch();
      res.send(state);
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
      const states = await State.find({
        where: { project: req.params.id },
        select: ["name", "position"],
        sort: "position ASC",
      });
      res.send(states);
    } catch (error) {
      res.serverError();
      console.log(error);
    }
  },

  update: async function (req, res) {
    try {
      const state = await State.update(req.params.id).set(req.body).fetch();
      res.send(state);
    } catch (error) {
      console.log(error);
      res.badRequest();
    }
  },
  delete: async function (req, res) {
    if (req.params.id != undefined) {
      const deletedState = await State.destroyOne(req.params.id);
      return res.json(deletedState);
    } else return res.send("invalid input");
  },
};
