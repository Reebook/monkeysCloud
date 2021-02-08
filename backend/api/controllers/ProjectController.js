/**
 * ProjectsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    const defaultStates = [
      { name: "to do", position: 0 },
      { name: "working", position: 1 },
      { name: "done", position: 2 },
    ];
    const statesPromises = [];
    try {
      const project = await Project.create({
        ...req.body,
        lead: req.user,
      }).fetch();
      for (const item of defaultStates) {
        statesPromises.push(State.create({ ...item, project: project.id }));
      }
      await Promise.all(statesPromises);
      res.send(project);
    } catch (error) {
      console.log(error);
      res.serverError();
    }
  },

  users: async function (req, res) {
    try {
      const project = await Project.findOne({
        where: { id: req.params.id },
        select: ["key", "name"],
      }).populate("members", {
        select: ["avatar", "email"],
      });
      if (!project) return res.notFound();
      res.send(project);
    } catch (error) {
      console.log(error);
      res.serverError();
    }
  },

  readAll: async function (req, res) {
    const query = {};
    if (req.query.lead) query.lead = req.query.lead;
    try {
      const projects = await Project.find({
        where: query,
        select: ["key", "name"],
      })
        .populate("lead")
        .populate("company");
      res.send(projects);
    } catch (error) {
      res.serverError(error);
      console.log(error);
    }
  },
  update: async function (req, res) {
    try {
      const project = await Project.update(req.params.id).set(req.body).fetch();
      res.send(project);
    } catch (error) {
      res.serverError();
    }
  },
  delete: async function (req, res) {
    if (req.params.id != undefined) {
      const deletedProject = await Project.destroyOne(req.params.id);
      return res.json(deletedProject);
    } else {
      return res.send("invalid input");
    }
  },
};
