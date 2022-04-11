import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import { ProductResolver } from './graphql/resolvers/products.resolver';
import path from 'path';
import { ApolloDriver } from '@nestjs/apollo';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver:ApolloDriver,
      autoSchemaFile:path.resolve(process.cwd(),'src/schema.gql'),

    })
  ],
  providers:[
    ProductResolver
  ]
})
export class HttpModule {}
