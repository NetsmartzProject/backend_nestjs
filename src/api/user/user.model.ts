
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Task } from './task/task.model';

@Schema()
export class User {
  @Prop()
  firstname: string;
  
  @Prop()
  lastname: string;

  @Prop({ lowercase: true, unique: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop() 
  task: string[]; 
}

export interface UserDocument extends User, Document {
  _id: string; // Ensure _id is part of the UserDocument interface
}

export const UserSchema = SchemaFactory.createForClass(User);
