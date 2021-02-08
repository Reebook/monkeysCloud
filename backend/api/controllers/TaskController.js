/**
 * TasksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    try {
      const task = await Task.create(req.body).fetch();
      if (req.body.assignee) {
        await Task.addToCollection(task.id, "assignee", req.params.users);
      }
      res.json(task);
    } catch (error) {
      res.serverError();
      console.log(error);
    }
  },
  read: async function (req, res) {
    try {
      const task = await Task.findOne(req.params.id).populateAll();
      if (!task) return res.notFound();
      res.send(task);
    } catch (error) {
      res.serverError();
    }
  },
  //sprint
  //state
  readAll: async function (req, res) {
    const query = {};
    if (req.query.sprint)
      query.sprint = req.query.sprint === "0" ? null : req.query.sprint;
    if (req.query.state) query.state = req.query.state;
    try {
      const tasks = await Task.find({
        where: query,
        select: ["name", "position", "priority", "state", "sprint"],
        sort: "position ASC",
      });
      res.send(tasks);
    } catch (error) {
      res.serverError();
      console.log(error);
    }
  },

  update: async function (req, res) {
    try {
      const task = await Task.update(req.params.id).set(req.body).fetch();
      res.send(task);
    } catch (error) {
      console.log(error);
      res.badRequest();
    }
  },
  delete: async function (req, res) {
    if (req.params.id != undefined) {
      const deleteTask = await Task.destroyOne(req.params.id);
      return res.json(deleteTask);
    } else {
      return res.send("invalid input");
    }
  },
  addSubTask: async function (req, res) {
    try {
      const task = await Task.findOne(req.params.id);
      if (!task.epic) throw new Error();
      await Task.addToCollection(req.body.taskId, "parents", req.params.id);
      const epicTasks = await Task.findOne(req.params.id).populate("children");
      res.send(epicTasks);
    } catch (error) {
      res.serverError();
    }
  },
  getEpicTasks: async function (req, res) {
    try {
      const tasks = await Task.findOne(req.params.id).populate("children");
      res.send(tasks);
    } catch (error) {
      res.serverError();
    }
  },
};
