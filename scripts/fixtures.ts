import * as dotenv from 'dotenv'
dotenv.config()

const { sequelize } = require('../src/database');

const { User } = require('../src/models/user.model');
const { Bet } = require('../src/models/bet.model');
const { users } = require('./data/user');
const { bets } = require('./data/bet');

const models = { User, Bet };

const fixtures = {
    User: users,
    Bet: bets
};

function runFixtures(data: {}, _models: { [x: string]: any; }) {
    const promises: any[] = [];
    Object.entries(data).forEach(([key, value]) => {
        const Model = _models[key];
        promises.push(Model.bulkCreate(value));
    });
    return Promise.all(promises);
}

function run() {
    return sequelize.drop()
        .then(() => sequelize.sync())
        .then(() => runFixtures(fixtures, models));
}

const [, , ...args] = process.argv;
const [command] = args;
if (command === 'run') {
  run()
      .then(() => {
        console.log('loaded');
        process.exit(0);
      })
      .catch((err: any) => {
        console.error(err);
        process.exit(1);
      });
}

export default run;
