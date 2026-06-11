import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ITaskRepositoryToken,
  type ITaskRepository,
} from '../domain/tasks.repository.interface';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject(ITaskRepositoryToken)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException(`La tarea ${id} no existe`);
    }

    const deleted = await this.taskRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException(`No se pudo eliminar la tarea ${id}`);
    }
  }
}