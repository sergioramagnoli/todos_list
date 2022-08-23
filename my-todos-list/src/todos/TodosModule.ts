import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TodosController } from "./TodosController";
import { TokenMiddleware } from "../middleware/AuthMiddleware";

@Module({
  controllers: [TodosController],
  providers: [],
})
export class TodosModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes(TodosController);
  }
}
