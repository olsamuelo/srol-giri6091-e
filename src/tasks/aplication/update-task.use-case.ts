import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ITaskRepositoryToken,
  type ITaskRepository,
} from '../domain/tasks.repository.interface';
import { Task } from '../domain/tasks.entity';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(ITaskRepositoryToken)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(
    id: string,
    updateData: Partial<Pick<Task, 'title' | 'description' | 'status'>>,
  ): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException(`La tarea ${id} no existe`);
    }

    if (updateData.title !== undefined) {
      task.title = updateData.title;
    }

    if (updateData.description !== undefined) {
      task.description = updateData.description;
    }

    if (updateData.status !== undefined) {
      task.status = updateData.status;
    }

    return this.taskRepository.update(task);
  }
}