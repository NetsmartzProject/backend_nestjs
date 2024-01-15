// import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Task,TaskDocument } from './task.model';
// import { UserService } from '../user.service';

// @Injectable()
// export class TaskService {
//   constructor(
//     @InjectModel('Task') private readonly taskModel: Model<TaskDocument>,
//     private readonly userService: UserService,
//   ) {}

//   async createTask(email: string, taskData: any): Promise<Task> {
//     // Check if the user exists
//     const user = await this.userService.findOneByEmail(email);
//     if (!user) {
//       throw new NotFoundException(`User not found with email: ${email}`);
//     }

//     // Create a new task associated with the user
//     const task = new this.taskModel({ ...taskData, user: user._id });
//     return task.save();
//   }

//   async getUserTasks(email: string): Promise<Task[]> {
//     const user = await this.userService.findOneByEmail(email);
//     if (!user) {
//       throw new NotFoundException(`User not found with email: ${email}`);
//     }

//     return this.taskModel.find({ user: user._id }).exec();
//   }

//   async updateTask(email: string, taskId: string, taskData: any): Promise<Task> {
//     const user = await this.userService.findOneByEmail(email);
//     if (!user) {
//       throw new NotFoundException(`User not found with email: ${email}`);
//     }

//     // Check if the task exists and is associated with the user
//     const existingTask = await this.taskModel.findOne({ _id: taskId, user: user._id });
//     if (!existingTask) {
//       throw new NotFoundException(`Task not found with ID: ${taskId}`);
//     }

//     // Update the task
//     Object.assign(existingTask, taskData);
//     return existingTask.save();
//   }

//   async deleteTask(email: string, taskId: string): Promise<Task> {
//     const user = await this.userService.findOneByEmail(email);
//     if (!user) {
//       throw new NotFoundException(`User not found with email: ${email}`);
//     }

//     // Check if the task exists and is associated with the user
//     const taskToDelete = await this.taskModel.findOne({ _id: taskId, user: user._id });
//     if (!taskToDelete) {
//       throw new NotFoundException(`Task not found with ID: ${taskId}`);
//     }

//     // Delete the task
//     await taskToDelete.remove();
//     return taskToDelete;
//   }
// }
// task.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task,TaskDocument } from './task.model';
import { UserService } from '../user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskDocument>,
    private readonly userService: UserService,
  ) {}

  async checkUserExists(email: string): Promise<boolean> {
    const user = await this.userService.findOneByEmail(email);
    return !!user;
  }

  async createTask(email: string, taskData: any): Promise<Task> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User not found with email: ${email}`);
    }

    const task = new this.taskModel({ ...taskData, user: user._id });
    return task.save();
  }

  async getUserTasks(email: string): Promise<Task[]> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User not found with email: ${email}`);
    }

    return this.taskModel.find({ user: user._id }).exec();
  }

  async updateTask(email: string, taskId: string, taskData: any): Promise<Task> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User not found with email: ${email}`);
    }

    const existingTask = await this.taskModel.findOne({ _id: taskId, user: user._id });
    if (!existingTask) {
      throw new NotFoundException(`Task not found with ID: ${taskId}`);
    }

    Object.assign(existingTask, taskData);
    return existingTask.save();
  }

  async deleteTask(email: string, taskId: string): Promise<Task> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User not found with email: ${email}`);
    }

    const taskToDelete = await this.taskModel.findOne({ _id: taskId, user: user._id });
    if (!taskToDelete) {
      throw new NotFoundException(`Task not found with ID: ${taskId}`);
    }

    await taskToDelete.deleteOne(); // Use deleteOne() instead of remove()
    return taskToDelete;
  }
}
