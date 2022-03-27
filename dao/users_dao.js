/*
 * @Description:
 * @Version: 1.0.0
 * @Date: 2022-03-06 23:21:52
 * @Author: yzy
 * @LastEditTime: 2022-03-27 15:26:48
 */
var makeDate = require('../utils/date')
moment = require('moment');
class users_dao extends require("../model/users_mod") {
  // 登录验证
  static async login(req, resp) {
    let body = req.body;
    let loginData = await this.loginUser(body.username, body.password);
    console.log(loginData, "loginData");
    if (loginData.length > 0) {
      let jwt_token = {
        user_Id: loginData[0].user_Id,
        user_name: loginData[0].user_name,
        user_nickname: loginData[0].user_nickname,
      };
      resp.send(jwt_token);
    } else {
      resp.status(500).send("账号或密码错误");
    }
  }

  // 获取用户信息
  static async Users(req, resp) {
    console.log(req.query, "rq");
    const pageNum = req.query.pageNum; //当前的num
    const pageSize = req.query.pageSize; //当前页的数量
    const userName = req.query.user_name;
    const params = [parseInt(pageNum) * parseInt(pageSize), parseInt(pageSize)];
    let usersData = await this.getUsers(userName, pageNum, pageSize, params);
    resp.send(usersData);
  }

  // 更新用户信息
  static async updateUserInfo(req, resp) {
    console.log(req.body, "rq");
    const userName = req.body.user_name;
    const userNickname = req.body.user_nickname;
    const email = req.body.email;
    const avatar = req.body.avatar;
    const birthday = req.body.birthday;
    const age = req.body.age;
    const moblePhone = req.body.moble_phone;
    const userId = req.body.user_Id;
    let usersData = await this.updateUser(
      userName,
      userNickname,
      email,
      avatar,
      birthday,
      age,
      moblePhone,
      userId
    );
    resp.send(usersData);
  }

  // 新增用户信息
  static async createUserInfo(req, resp) {
    console.log(req.body, "rq");
    const userName = req.body.user_name;
    const userNickname = req.body.user_nickname;
    const email = req.body.email;
    const avatar = req.body.avatar;
    const birthday = req.body.birthday;
    const age = req.body.age;
    const moblePhone = req.body.moble_phone;
    const userId = req.body.user_Id;
    let usersData = await this.createUser(
      userName,
      userNickname,
      email,
      avatar,
      birthday,
      age,
      moblePhone,
      userId
    );
    resp.send(usersData);
  }

  static async deleteUserInfo(req, resp) {
    console.log(req.body, "rq");
    const userId = req.body.user_Id;
    let usersData = await this.deleteUser(
      userId
    );
    resp.send(usersData);
  }

}
module.exports = users_dao;
