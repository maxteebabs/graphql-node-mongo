global.assert = require("assert");

before(async function(){
    // var db = require('../models');
    // await db.sequelize.sync({ force: false })
    // await sampleData.clearDatabase();
    const { createServer } = require("../server");
    global.server = await createServer();
});
