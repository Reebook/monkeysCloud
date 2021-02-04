/**
 * TasksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    try {
      const task = await tasks.create(req.body).fetch();
      if (req.body.assignee) {
        await tasks.addToCollection(task.id, "assignee", req.params.users);
      }
      res.json({ task });
    } catch (error) {
      res.serverError();
      console.log(error);
    }
  },
  read: async function (req, res) {
    try {
      const task = await tasks.findOne(req.params.id).populateAll();
      if (!task) return res.notFound();
      res.send({ task });
    } catch (error) {
      res.serverError();
    }
  },
  readAll: async function (req, res) {
    const query = { project: req.params.id };
    if (req.query.sprint)
      query.sprint = req.query.sprint === "0" ? null : req.query.sprint;
    try {
      const projectTasks = await tasks.find({
        where: query,
        sort: "position ASC",
      });
      res.send({ tasks: projectTasks });
    } catch (error) {
      res.serverError();
      console.log(error);
    }
  },

  update: async function (req, res) {
    try {
      const task = await tasks.update(req.params.id).set(req.body).fetch();
      res.send({ task });
    } catch (error) {
      console.log(error);
      res.badRequest();
    }
  },
  delete: async function (req, res) {
    if (req.params.id != undefined) {
      const deleteTask = await tasks.destroyOne(req.params.id);
      return res.json(deleteTask);
    } else {
      return res.send("invalid input");
    }
  },
  addSubTask: async function (req, res) {
    try {
      const task = await tasks.findOne(req.params.id);
      if (!task.isEpic) throw new Error();
      await tasks.addToCollection(req.body.taskId, "parents", req.params.id);
      const epicTasks = await tasks.findOne(req.params.id).populate("children");
      res.send(epicTasks);
    } catch (error) {
      res.serverError();
    }
  },
  getEpicTasks: async function (req, res) {
    try {
      const epicTasks = await tasks.findOne(req.params.id).populate("children");
      res.send(epicTasks);
    } catch (error) {
      res.serverError();
    }
  },
};
