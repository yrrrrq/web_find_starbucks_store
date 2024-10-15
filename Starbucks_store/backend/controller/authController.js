const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.register = (req, res) => {
    console.log("req", req);
    const { username, password } = req.body;
    console.log("user", {username, password});
    // 检查是否接收到了用户名和密码
    if (!username || !password) {
        return res.status(400).send('用户名和密码是必须的');
    }
    console.log('Received username:', username);
    console.log('Received password:', password);
    try {
        // 确保password是有效的字符串
        const hashedPassword = bcrypt.hashSync(password, 8);
        console.log('Hashed password:', hashedPassword);

        const query_0 = 'SELECT * FROM users WHERE username = ?';
        db.query(query_0, [username], (err, results) => {
            if (err) throw err;
            console.log("results: ", results);
            if (results.length !== 0) {
                return res.status(400).send('用户已存在，请勿重复注册');
            }
        });
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(query, [username, hashedPassword], (err, result) => {
            if (err) {
                console.error('数据库插入错误: ', err);
                res.status(500).send('用户注册失败');
                return;
            }
            res.send('用户注册成功');
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).send('服务器错误');
    }
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    console.log("登录用户：", {username, password});

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) throw err;
        console.log("results: ", results);
        if (results.length === 0) {
            return res.status(400).send('用户名或密码错误');
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(400).send('用户名或密码错误');
        }

        res.send('用户登录成功');
    });
};
