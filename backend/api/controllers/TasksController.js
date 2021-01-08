/**
 * TasksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    try {
      const newTask = await tasks.create(req.body).fetch();
      const token = await sails.helpers.generateAuthToken(newTask.id);
      return res.json({ tasks: newTask, token });
    } catch (error) {
      res.serverError("Invalid Data");
      console.log(error);
    }
  },
  read: async function (req, res) {
    if (req.params.id != undefined) {
      const readTask = await tasks.findOne(req.params.id);
      return res.json(readTask);
    } else {
      return res.send("invalid input");
    }
  },
  readByState: async function (req, res) {
    try {
      //const getState = await state.findOne(req.params.id);
      var readTask = await tasks.find({where: {state: req.params.id}});
      return res.json(readTask);
    } catch (error) {
      res.serverError("Invalid Data");
      console.log(error);
    }
  },
  readStates: async function (req, res) {
    //Este campo permite cargar los estados que se le pueden asignar a una tarea
    try {
      var allStates = await state.find();
      return res.json(allStates);
    } catch (error) {
      res.serverError("Invalid Data");
      console.log(error);
    }
  },
  update: async function (req, res) {
    try {
      const data = await tasks.update(req.params.id).set(req.body).fetch();
      res.send({ tasks: data });
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
