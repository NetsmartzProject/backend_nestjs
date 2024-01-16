import { Controller, Post, Get, Param, Body, Put, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('user/:email/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Param('email') email: string, @Body() taskData: any): Promise<any> {
    try {
      const task = await this.taskService.createTask(email, taskData);
      console.log(task,"task")
      return task;
    } catch (err) {
      throw new BadRequestException('Failed to create task', err.message);
    }
  }

  @Get()
  async getUserTasks(@Param('email') email: string): Promise<any> {
    try {
      const tasks = await this.taskService.getUserTasks(email);
      return tasks;
    } catch (err) {
      throw new NotFoundException(`Tasks not found for user with email: ${email}`);
    }
  }

  @Put(':taskId')
  async updateTask(@Param('email') email: string, @Param('taskId') taskId: string, @Body() taskData: any): Promise<any> {
    try {
      const updatedTask = await this.taskService.updateTask(email, taskId, taskData);
      return updatedTask;
    } catch (err) {
      throw new NotFoundException(`Task not found or could not be updated: ${taskId}`);
    }
  }

  @Delete(':taskId')
  async deleteTask(@Param('email') email: string, @Param('taskId') taskId: string): Promise<any> {
    try {
      const deletedTask = await this.taskService.deleteTask(email, taskId);
      return deletedTask;
    } catch (err) {
      throw new NotFoundException(`Task not found or could not be deleted: ${taskId}`);
    }
  }
}
