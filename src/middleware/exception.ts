import { NotFoundError } from '@mikro-orm/core';
import {
  Logger,
  Injectable,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Injectable()
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception, host: ArgumentsHost) {
    this.logger.warn('EXCEPTION', exception);
    if (exception instanceof NotFoundError)
      exception = new NotFoundException(exception);
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
