import { Injectable } from "@nestjs/common";
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class BookEventListener {
   
    
     @OnEvent('book.created')
    handleBookCreatedEvent(event: any) {
        console.log("Book Created Event:", event);
    }

}