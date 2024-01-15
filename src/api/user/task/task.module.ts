import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskSchema } from './task.model';
import { UserModule } from '../user.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    UserModule, // Import UserModule to access UserService
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
