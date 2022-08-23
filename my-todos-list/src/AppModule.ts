import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './AppService';
import {TodosModule} from "./todos/TodosModule";
import {AuthController} from "./todos/AuthController";

@Module({
  imports: [TodosModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
