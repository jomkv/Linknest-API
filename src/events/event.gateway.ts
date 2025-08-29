import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WS_SESSION_MESSAGE } from 'src/common/constants/socket-messages.constants';

@WebSocketGateway({
  // transports: ['websocket'],
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private sessionMap: Map<string, string> = new Map(); // socketId -> sessionId
  private reverseSessionMap: Map<string, string> = new Map(); // sessionId -> socketId

  handleConnection(socket: Socket) {
    // * TODO
    // Map user and socketId together if possible
  }

  handleDisconnect(socket: Socket) {
    const sessionId = this.sessionMap.get(socket.id);

    if (sessionId) {
      console.info(`Session Terminated: ${sessionId}`);
      this.cleanupSession(sessionId);
    }
  }

  @SubscribeMessage(WS_SESSION_MESSAGE.REGISTER)
  handleSessionRegister(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sessionId') sessionId: string,
  ) {
    this.sessionMap.set(socket.id, sessionId);
    this.reverseSessionMap.set(sessionId, socket.id);

    console.info(`Session Started: ${sessionId}`);

    socket.emit(WS_SESSION_MESSAGE.REGISTERED, { sessionId });
  }

  emitToSession(sessionId: string, message: string, payload: any) {
    const socketId = this.reverseSessionMap.get(sessionId);
    if (socketId) {
      this.server.to(socketId).emit(message, payload);
      this.cleanupSession(sessionId); // immediately remove session since it is one time use only
    }
  }

  private cleanupSession(sessionId: string) {
    const socketId = this.reverseSessionMap.get(sessionId);

    if (socketId) {
      this.sessionMap.delete(socketId);
    }

    this.reverseSessionMap.delete(sessionId);
  }
}
