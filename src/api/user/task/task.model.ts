
// task.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { UserDocument } from '../user.model';

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;



  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: UserDocument;

  @Prop({ type: Boolean, default: false }) // Ensure the correct type is specified
  completed: boolean;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
