
import Connection from './Connection';
import pgp from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config()

export default class PgPromiseConnectionAdapter implements Connection {
  pgp: any;
  static instance: PgPromiseConnectionAdapter;

  private constructor() {
    this.pgp = pgp()(
      `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
    );
  }

  static getInstance() {
    if (!PgPromiseConnectionAdapter.instance) {
      PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter();
    }
    return PgPromiseConnectionAdapter.instance;
  }
  query(statement: string, params: any[]): Promise<any> {
    return this.pgp.query(statement, params);
  }
}
