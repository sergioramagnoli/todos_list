import {MiddlewareConsumer, Module} from "@nestjs/common";
import {TodosController} from "./todos.controller";
import {TodosService} from "./todos.service";
import {TokenMiddleware} from "./token.middleware";


@Module({
    controllers: [TodosController],
    providers: [TodosService]
})

export class TodosModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TokenMiddleware)
            .exclude('/login')
            .forRoutes(TodosController)
    }
}