import { Module } from '@nestjs/common';
import { ChatGateway } from './ChatGateway';

@Module({
    imports: [ChatGateway],
})
export class GatewayModule {}
