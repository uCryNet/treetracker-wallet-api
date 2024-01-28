import { Injectable } from '@nestjs/common';
import knex from 'knex';

@Injectable()
export class Session {
  constructor(private thx: undefined) {
    this.thx = undefined;
  }

  getDB() {
    if (this.thx) {
      return this.thx;
    }
    return knex;
  }

  isTransactionInProgress() {
    return this.thx !== undefined;
  }

  async beginTransaction() {
    if (this.thx) {
      throw new Error('Can not start transaction in transaction');
    }
    this.thx = await knex.transaction();
  }

  async commitTransaction() {
    if (!this.thx) {
      throw new Error('Can not commit transaction before start it!');
    }
    await this.thx.commit();
    this.thx = undefined;
  }

  async rollbackTransaction() {
    if (!this.thx) {
      throw new Error('Can not rollback transaction before start it!');
    }
    await this.thx.rollback();
    this.thx = undefined;
  }
}
