/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  //https://www.generatedata.com/
  //http://irlnathan.github.io/sailscasts/blog/2013/11/19/sailscasts-answers-ep3-how-do-i-create-sample-dummy-users-for-my-sails-project/

  if ((await user.count()) > 0) {
    return;
  }

  //to use this
  // sails lift --drop

  const Users = [
    { email: "josue@hotmail.com", password: "12345" },
    { email: "jorge@hotmail.com", password: "12345" },
    { email: "diego@hotmail.com", password: "12345" },
    { email: "carlos@hotmail.com", password: "12345" },
    { email: "gabriel@hotmail.com", password: "12345" },
  ];

  const companies = [
    {
      name: "Monkeys Cloud",
      website: "http://monkeyscloud.com",
      phoneNumber: "12121212",
      owner: 1,
      email: "monkey@hotmail.com",
    },
    {
      name: "Test Company",
      website: "http://test.com",
      phoneNumber: "12121212",
      owner: 1,
      email: "test@hotmail.com",
    },
  ];

  const projects = [
    {
      name: "Web App",
      key: "MC",
      company: 1,
      lead: 1,
      members: [1, 2, 3],
    },
    {
      name: "Phone App",
      key: "pa",
      company: 1,
      lead: 1,
    },
  ];

  const sprints = [
    {
      name: "MC-sprint-1",
      startDate: Date.now(),
      endDate: Date.now(),
      sprintGoal: "End",
      project: 1,
      active: true,
    },
    {
      name: "MC-sprint-2",
      startDate: Date.now(),
      endDate: Date.now(),
      sprintGoal: "End",
      project: 1,
    },
  ];

  const states = [
    { name: "to do", position: 0, project: 1 },
    { name: "working", position: 1, project: 1 },
    { name: "done", position: 2, project: 1 },
  ];

  const tasks = [
    {
      name: "Task-1",
      priority: 1,
      project: 1,
      reporter: 1,
      sprint: 1,
      state: 1,
      assignees: [1, 2],
    },
    {
      name: "Task-2",
      priority: 2,
      project: 1,
      reporter: 1,
      sprint: 1,
      state: 1,
      assignees: [1, 3],
    },
    {
      name: "Task-3",
      priority: 3,
      project: 1,
      reporter: 2,
      sprint: 1,
      state: 2,
      assignees: [2, 3],
    },
    {
      name: "Task-4",
      priority: 4,
      project: 1,
      reporter: 1,
      sprint: 1,
      assignees: [1],
      state: 3,
    },
    {
      name: "Task-5",
      priority: 5,
      project: 1,
      reporter: 1,
      sprint: 1,
      state: 2,
    },
  ];

  await Promise.all([
    user.createEach(Users),
    Company.createEach(companies),
    Project.createEach(projects),
    State.createEach(states),
    Sprint.createEach(sprints),
    Task.createEach(tasks),
  ]);
};
