import { MiddlewareConsumer, Module, NestModule, RequestMethod, Res } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
// import { ChatGateway } from "./chat/chat.gateway";
import { CatsService } from './cats/cats.service';
import { CatsController } from './cats/cats.controller';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ResponseLoggerMiddleware } from './common/middlewares/responselogged.Middleware';


@Module({
  imports: [CatsModule, DogsModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware,ResponseLoggerMiddleware)
    .forRoutes({path:"cats/*",method: RequestMethod.ALL});
  }
}
