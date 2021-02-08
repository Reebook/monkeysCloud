/**
 * SprintsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    try {
      const sprint = await Sprint.create(req.body).fetch();
      res.send(sprint);
    } catch (error) {
      res.serverError();
      console.log(error);
    }
  },
  //projects
  read: async function (req, res) {
    const query = {};
    if (req.query.finished) {
      query.finished = req.query.finished === "true" ? true : false;
    }
    if (req.query.project) query.project = req.query.project;

    try {
      const sprint = await Sprint.find(query);
      res.send(sprint);
    } catch (error) {
      res.serverError();
    }
  },
  sprintTasks: async function (req, res) {
    try {
      const sprint = await Sprint.find({ project: req.params.id });
      res.send(sprint);
    } catch (error) {
      res.serverError();
    }
  },

  update: async function (req, res) {
    if (Object.keys(req.body) == 0 || req.body.id == undefined) {
      return res.send("invalid input");
    } else {
      const sprintUpdated = await Sprint.update(req.body.id)
        .set(req.body)
        .fetch();
      return res.json(sprintUpdated);
    }
  },
  delete: async function (req, res) {
    if (req.params.id != undefined) {
      const deletedSprint = await Sprint.destroyOne(req.params.id);
      return res.json(deletedSprint);
    } else {
      return res.send("invalid input");
    }
  },
};
