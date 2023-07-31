import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(id: string) {
    super(`Record with id ${id} doesn't exist`, HttpStatus.NOT_FOUND);
  }
}
