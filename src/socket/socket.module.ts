import { Module } from '@nestjs/common';
import { SocketClient } from './socket-client';

@Module({
    controllers: [],
    providers: [SocketClient],
    exports: [],
})
export class SocketModule {}
