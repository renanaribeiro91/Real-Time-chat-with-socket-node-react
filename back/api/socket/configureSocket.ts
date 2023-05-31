import { Server } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';

interface User {
  id: string;
  username: string;
}

const configureSocket = (server: Server): SocketServer => {
  const io: SocketServer = new SocketServer(server, { cors: { origin: 'http://localhost:3000' } });

  const onlineUsers: User[] = [];
  console.log('@@', onlineUsers)

  io.on('connection', (socket: Socket) => {
    console.log('Usuário conectado!', socket.id);

    socket.on('disconnect', (reason) => {
      console.log('Usuário desconectado!', socket.id,reason);
      removeUser(socket.id);
      io.emit('user_list', onlineUsers);
    });

    socket.on('set_username', (username: string) => {
      socket.data.username = username;
      console.log(socket.data.username)
      addUser(socket.id, username);
      io.emit('user_list', onlineUsers);
    });

    socket.on('message', (user: any) => {
      io.emit('receive_message', {
        text:user.text,
        authorId: socket.id,
        author: socket.data.username,
        timestamp:user.timestamp
      });
    });
  });

  const addUser = (id: string, username: string) => {
    const user: User = { id, username };
    onlineUsers.push(user);
  };

  const removeUser = (id: string) => {
    const index = onlineUsers.findIndex((user) => user.id === id);
    if (index !== -1) {
      onlineUsers.splice(index, 1);
    }
  };

  return io;
};

export default configureSocket;
