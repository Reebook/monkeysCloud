/**
 * SprintsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    try {
      const sprint = await sprints.create(req.body).fetch();
      res.send({ sprint });
    } catch (error) {
      res.serverError();
      console.log(error);
    }
  },
  read: async function (req, res) {
    if (req.params.id != undefined) {
      const readSprint = await sprints.findOne(req.params.id);
      return res.json(readSprint);
    } else {
      return res.send("invalid input");
    }
  },
  sprintTasks: async function (req, res) {
    try {
      const sprint = await sprints.find({});
      res.send(sprint);
    } catch (error) {
      res.serverError();
    }
  },

  update: async function (req, res) {
    if (Object.keys(req.body) == 0 || req.body.id == undefined) {
      return res.send("invalid input");
    } else {
      const sprintUpdated = await sprints
        .update(req.body.id)
        .set(req.body)
        .fetch();
      return res.json(sprintUpdated);
    }
  },
  delete: async function (req, res) {
    if (req.params.id != undefined) {
      const deletedSprint = await sprints.destroyOne(req.params.id);
      return res.json(deletedSprint);
    } else {
      return res.send("invalid input");
    }
  },
};
