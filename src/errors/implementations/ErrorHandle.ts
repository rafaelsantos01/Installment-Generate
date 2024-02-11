import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus ? exception.getStatus() : 400;
    const message = exception.message || 'Erro interno do servidor';
    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
