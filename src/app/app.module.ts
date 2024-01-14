import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    // wallet
    WalletModule,
    // base
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    KnexModule.forRoot({
      config: {
        client: 'pg',
        useNullAsDefault: true,
        connection: process.env.DATABASE_URL,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
