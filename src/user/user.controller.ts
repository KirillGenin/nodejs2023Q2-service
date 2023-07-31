import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserdDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async get() {
    return await this.userService.get();
  }

  @Get(':id')
  async getOne(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ) {
    return await this.userService.getOne(id);
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateUserdDto: UpdateUserdDto,
  ) {
    return await this.userService.update(id, updateUserdDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ) {
    return await this.userService.remove(id);
  }
}
