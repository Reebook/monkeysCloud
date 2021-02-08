module.exports = {
  create: async function (req, res) {
    console.log(req.user);
    try {
      const newPullRequest = await pullRequest
        .create({ ...req.body, owner: req.user })
        .fetch();
      res.send({ pullRequest: newPullRequest });
    } catch (error) {
      res.serverError(error);
      console.log(error);
    }
  },
  read: async function (req, res) {
    if (req.params.id != undefined) {
      const readPullRequest = await pullRequest.findOne(req.params.id);
      return res.json(readPullRequest);
    } else {
      return res.send("invalid input");
    }
  },
  update: async function (req, res) {
    try {
      const pullRequestUpdated = await pullRequest
        .update({ id: req.params.id, owner: req.user })
        .set(req.body)
        .fetch();
      res.send({ pullRequest: pullRequestUpdated });
    } catch (error) {
      res.serverError();
    }
  },
  delete: async function (req, res) {
    if (req.params.id != undefined) {
      const deletedPullRequest = await pullRequest.destroyOne(req.params.id);
      return res.json(deletedPullRequest);
    } else {
      return res.send("invalid input");
    }
  },
};
