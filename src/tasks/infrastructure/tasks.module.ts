import { Module } from '@nestjs/common';
import { TaskController } from './controllers/tasks.controller';

import { CreateTasksUseCase } from '../aplication/create-tasks.use.case';
import { GetTaskByIdUseCase } from '../aplication/get-task-by-id-use-case';
import { UpdateTaskUseCase } from '../aplication/update-task.use-case';
import { DeleteTaskUseCase } from '../aplication/delete-task.use-case';

import { ITaskRepositoryToken } from '../domain/tasks.repository.interface';
import { TasksRepositoryInMemory } from './persistence/tasks.repository.impl';

@Module({
  controllers: [TaskController],
  providers: [
    CreateTasksUseCase,
    GetTaskByIdUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    {
      provide: ITaskRepositoryToken,
      useClass: TasksRepositoryInMemory,
    },
  ],
})
export class TaskModule {}