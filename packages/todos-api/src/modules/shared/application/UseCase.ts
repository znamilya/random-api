import { Either } from "@sweet-monads/either";

abstract class UseCase {
  abstract execute(...args: any[]): Promise<Either<Error, any>>;
}

export { UseCase };
