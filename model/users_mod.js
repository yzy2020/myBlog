class users_mod extends require("./model") {
  static loginUser(username, password, type) {
    type = Number(type);
    return new Promise((resolve, reject) => {
        let sql =
          "select * from users where binary user_name='"+username +"' and password='" +password +"'"
        console.log(sql);
        this.queruy(sql)
          .then((result) => {
            console.log(result, 'result');
            resolve(result);
          })
          .catch((err) => {
            reject(err, "登录失败");
          });
    });
  }

  static getUsers(userName, pageNum, pageSize, params) {
    console.log(params, 'params')
    return new Promise((resolve, reject) => {
      let sql = "select * from users where user_name like'%"+ userName + "%' limit ?,?"
      this.queruy(sql, params).then((result) => {
        console.log(result, 'result')
        // resolve(result)
        const data = result
        let sqlTotal = "select count(*) as total from users where user_name like'%" + userName + "%'"
        this.queruy(sqlTotal, result).then((result) => {
          let total = result[0]['total']
          resolve({
            status: '200',
            message: 'success',
            data: data,
            pageNum: pageNum,
            pageSize: pageSize,
            total: total
          })
        })
      }).catch((err) => {
        reject(err, '操作失败')
      })
    })
  }

  static updateUser(userName, userNickname, email, avatar, birthday, age, moblePhone, userId) {
    console.log(email, 'email')
    return new Promise((resolve, reject) => {
      let sql = "update users set user_nickname='" + userNickname + "' , user_name='" + userName + "' , email='" + email + "' , avatar='" + avatar + "' , age='" + age + "' , moble_phone='" + moblePhone + "' , birthday='" + birthday + "' where user_Id=" + userId
      this.queruy(sql).then((result) => {
        resolve({
          status: '200',
          message: 'success'
        })
      }).catch((err) => {
        reject(err, '操作失败')
      })
    })
  }

  static createUser(userName, userNickname, email, avatar, birthday, age, moblePhone) {
    let password = "123";
    let createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    return new Promise((resolve, reject) => {
      let sql = "insert into users (user_nickname, user_name, email, avatar, age, moble_phone, birthday, password, create_time) values ('" + userNickname + "','" + userName + "','" + email + "','" + avatar + "'," +  age + ",'" + moblePhone + "','" + birthday + "','" + password + "','" +  createTime +"')";
      this.queruy(sql).then((result) => {
        resolve({
          status: '200',
          message: 'success'
        })
      }).catch((err) => {
        reject(err, '操作失败')
      })
    })
  }

  static deleteUser(userId) {
    return new Promise((resolve, reject) => {
      let sql = "delete from users where user_Id =" + userId
      this.queruy(sql).then((result) => {
        resolve({
          status: '200',
          message: 'success'
        })
      }).catch((err) => {
        reject(err, '操作失败')
      })
    })
  }
}
module.exports = users_mod;
