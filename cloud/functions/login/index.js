const cloud = require("wx-server-sdk");

cloud.init({
  env: "yuntest-wcqeq"
});

const db = cloud.database({
  env: "yuntest-wcqeq"
});
const _ = db.command;
const $ = _.aggregate;

exports.main = async () => {
  const wxContext = cloud.getWXContext();
  const { OPENID } = wxContext;

  try {
    const res = await db
      .collection("users")
      .where({
        openid: OPENID
      })
      .get();

    if (!res.data.length) {
      let user = await db.collection("users").add({
        data: {
          openid: OPENID
        }
      });
      // category
      let { _id } = user;
      let cat = await db
        .collection("category")
        .where({
          parent: ""
        })
        .get();
      // 插入记录
      let cat_ = cat.data.forEach(item => {
        let { get, icon, name } = item;
        db.collection("category").add({
          data: { get, icon, name, parent: _id },
          success: () => {},
          fail: () => {}
        });
      });

      return {
        _id
      };
    }

    return {
      _id: res.data[0]._id
    };
  } catch (err) {
    console.log(err);
  }
};
