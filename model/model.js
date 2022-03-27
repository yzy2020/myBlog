const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  port: "3306",
  database: "blog",
});

// 封装一个数据库基础类
module.exports = class Model {
  // 调用的查询方法 sql要执行的语句 params参数
  static queruy(sql, params) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (error, connection) {
        if (error) {
          console.error(error);
          connection.release();
        } else {
          connection.query(sql, params, (err, result) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(result);
            }
            //结束会话  释放连接
            connection.release();
          });
        }
      });
    });
  }
};
