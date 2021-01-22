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
      const token = await sails.helpers.generateAuthToken(newState.id);
      return res.json({ state: newState, token });
    } catch (error) {
      res.serverError("Invalid Data");
      console.log(error);
    }
  },
  read: async function (req, res) {
    if (req.params.id != undefined) {
      const readState = await state.findOne(req.params.id);
      return res.json(readState);
    } else return res.send("invalid input");
  },
  readAll: async function (req, res) {
    try {
      const allStates = await state.find().populate("taskState");
      return res.json(allStates);
    } catch (error) {
      res.serverError("Invalid Data");
      console.log(error);
    }
  },
  update: async function (req, res) {
    try {
      const data = await state.update(req.params.id).set(req.body).fetch();
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
  projectStates: async function (req, res) {
    try {
      const states = await state.find({ project: req.params.id });
      res.send({ states });
    } catch (error) {
      res.serverError("Invalid Data");
      console.log(error);
    }
  },
};
