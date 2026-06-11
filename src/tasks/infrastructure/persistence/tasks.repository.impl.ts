import { Injectable } from '@nestjs/common';
import { ITaskRepository } from '../../domain/tasks.repository.interface';
import { Task } from '../../domain/tasks.entity';

@Injectable()
export class TasksRepositoryInMemory implements ITaskRepository {
  private tasks: Task[] = [];

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.tasks.find(task => task.id === id);
    return task || null;
  }

  async create(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  async update(task: Task): Promise<Task> {
    const index = this.tasks.findIndex(t => t.id === task.id);

    if (index === -1) {
      throw new Error('Task not found');
    }

    this.tasks[index] = task;
    return task;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.tasks.findIndex(t => t.id === id);

    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);
    return true;
  }
}