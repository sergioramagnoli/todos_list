import {MiddlewareConsumer, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TodosModule} from "./todos/todos.module";
import {TokenMiddleware} from "./todos/token.middleware";
import {TodosController} from "./todos/todos.controller";

@Module({
  imports: [TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware)
        .exclude('/login')
        .forRoutes(TodosController)
  }
}
