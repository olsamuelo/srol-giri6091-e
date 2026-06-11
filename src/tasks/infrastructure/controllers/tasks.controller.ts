import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateTasksUseCase } from '../../aplication/create-tasks.use.case';
import {
  ITaskRepositoryToken,
  type ITaskRepository,
} from '../../domain/tasks.repository.interface';

@ApiTags('Task')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskCase: CreateTasksUseCase,

    @Inject(ITaskRepositoryToken)
    private readonly taskRepository: ITaskRepository,
  ) {}

  @Get()
  async findAll() {
    return this.taskRepository.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.taskRepository.findById(id);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Mi tarea' },
        description: { type: 'string', example: 'Descripción de la tarea' },
      },
      required: ['title', 'description'],
    },
  })
  @Post()
  async create(@Body() body: { title: string; description: string }) {
    return this.createTaskCase.execute(body.title, body.description);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Tarea actualizada' },
        description: { type: 'string', example: 'Nueva descripción' },
        status: {
          type: 'string',
          enum: ['pending', 'in_progress', 'completed'],
          example: 'completed',
        },
      },
    },
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      title?: string;
      description?: string;
      status?: 'pending' | 'in_progress' | 'completed';
    },
  ) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      return { message: `La tarea ${id} no existe` };
    }

    if (body.title !== undefined) {
      task.title = body.title;
    }

    if (body.description !== undefined) {
      task.description = body.description;
    }

    if (body.status !== undefined) {
      task.status = body.status;
    }

    return this.taskRepository.update(task);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.taskRepository.delete(id);

    if (!deleted) {
      return { message: `La tarea ${id} no existe` };
    }

    return { message: 'Tarea eliminada correctamente' };
  }
}