import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(id: string) {
    super(`Record with id ${id} doesn't exist`, HttpStatus.NOT_FOUND);
  }
}

class NotExistException extends HttpException {
  constructor(type: string, id: string) {
    super(
      `${type} with id ${id} doesn't exist`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class NotExistTrackException extends NotExistException {
  constructor(id: string) {
    super('Track', id);
  }
}

export class NotExistArtistException extends NotExistException {
  constructor(id: string) {
    super('Artist', id);
  }
}

export class NotExistAlbumException extends NotExistException {
  constructor(id: string) {
    super('Album', id);
  }
}
