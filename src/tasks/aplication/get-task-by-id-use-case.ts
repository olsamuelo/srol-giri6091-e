import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ITaskRepositoryToken,
  type ITaskRepository,
} from '../domain/tasks.repository.interface';
import { Task } from '../domain/tasks.entity';

@Injectable()
export class GetTaskByIdUseCase {
  constructor(
    @Inject(ITaskRepositoryToken)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException(`La tarea ${id} no existe`);
    }

    return task;
  }
}