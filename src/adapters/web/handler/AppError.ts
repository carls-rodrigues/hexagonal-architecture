export default class AppError {
  constructor(public readonly message: string, public readonly status: number = 400) {}
}