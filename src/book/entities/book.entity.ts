import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
export class Book extends Document {

    @Prop({ required: true, unique: true })
    title: string;
    @Prop({ required: true })
    price: number;
    @Prop({ required: true , ref: 'User'})
    user : Types.ObjectId;
    
} 

export const BookSchema = SchemaFactory.createForClass(Book);