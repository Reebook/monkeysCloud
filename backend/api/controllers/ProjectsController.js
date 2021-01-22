/**
 * ProjectsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    const defaultStates = ["to do", "working", "done"];
    const statesPromises = [];
    try {
      const project = await projects
        .create({ ...req.body, lead: req.user })
        .fetch();
      for (const item of defaultStates) {
        statesPromises.push(state.create({ name: item, project: project.id }));
      }
      await Promise.all(statesPromises);
      res.send({ project });
    } catch (error) {
      console.log(error);
      res.serverError();
    }
  },
  read: async function (req, res) {
    try {
      const allProjects = await projects
        .find({
          where: { lead: req.user },
          select: ["key", "name"],
        })
        .populate("lead")
        .populate("company");
      res.send({ projects: allProjects });
    } catch (error) {
      res.serverError(error);
      console.log(error);
    }
  },
  update: async function (req, res) {
    try {
      const project = await projects
        .update(req.params.id)
        .set(req.body)
        .fetch();
      res.send({ project });
    } catch (error) {
      res.serverError();
    }
  },
  delete: async function (req, res) {
    if (req.params.id != undefined) {
      const deletedProject = await projects.destroyOne(req.params.id);
      return res.json(deletedProject);
    } else {
      return res.send("invalid input");
    }
  },
};
