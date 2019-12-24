const cloud = require("wx-server-sdk");

cloud.init({
  env: "yuntest-wcqeq"
});

const db = cloud.database({
  env: "yuntest-wcqeq"
});
const _ = db.command;
const $ = _.aggregate;

exports.main = async event => {
  try {
    const res = await db
      .collection("category")
      .where({
        parent: event.id
      })
      .get();

    return res;
  } catch (err) {
    console.log(err);
  }
};
