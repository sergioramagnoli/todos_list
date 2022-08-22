import { HttpException, HttpStatus } from "@nestjs/common";

export class Precondition {
  static require(
    condition: boolean,
    message = "No tienes permiso para realizar esta acción"
  ) {
    if (condition === false) {
      throw new HttpException(
        {
          error: {
            message: message,
          },
        },
        HttpStatus.FORBIDDEN
      );
    }
  }
}
