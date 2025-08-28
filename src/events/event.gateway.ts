import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private clients: Map<string, string> = new Map(); // socketId -> userId

  handleConnection(client: Socket) {
    // * TODO
  }

  handleDisconnect(client: Socket) {
    // * TODO
  }
}
