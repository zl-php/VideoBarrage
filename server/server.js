const { createServer } = require("http");
const { Server } = require("socket.io");
const config = require('../conf/config');

const httpServer = createServer();
const io = new Server(httpServer);

// 在线人员
var onLineUsers = {};
// 在线人数
var onLineCounts = 0;

// 建立socket连接
io.on("connection", (socket) => {
    console.log(`websocket 已连接： ${socket.id}`);

    // 接收客户端发送的login事件
    socket.on('login', (user) => {
        // 暂存socket.name 为user.userId;在用户退出时候将会用到
        socket.name = user.userid;

        // 不存在则增加
        if (!onLineUsers.hasOwnProperty(user.userid)) {
            //不存在则增加
            onLineUsers[user.userid] = user.username;
            onLineCounts++;
        }
        // 向全部client监听login的socket的实例广播，返回的是一个对象
        io.emit('login', {onLineUsers: onLineUsers, onLineCounts: onLineCounts, onOperateUser: user});
        console.log(user.username, "登录了");
    });


    socket.on('message', obj => {
        // 监听到实用户发消息，将该消息广播给全部client
        io.emit('message', obj);

        console.log(obj.username, "发了消息:", obj.content);
    });

    socket.on('disconnect', () => {
        if (onLineUsers.hasOwnProperty(socket.name)) {
            const user = {userid: socket.name, username: onLineUsers[socket.name]};
            delete onLineUsers[socket.name];
            onLineCounts--;

            // 向全部client监听logout的socket的实例广播，返回的是一个对象
            io.emit('logout', {onLineUsers: onLineUsers, onLineCounts: onLineCounts, onOperateUser: user});
            console.log(user.username, "退出了");
        }
    });


});

httpServer.listen({host: config.localHost, port: config.localPort});
console.log(`等待websocket连接: ${config.localHost}:${config.localPort}`)