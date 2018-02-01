import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';
import { configProvider } from './providers/config.provider';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  components: [configProvider],
  exports: [configProvider],
})
export class CoreModule {

  configure(consumer: MiddlewaresConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({path: '/*', method: RequestMethod.ALL});
  }
}
