import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import { ProductResolver } from './graphql/resolvers/products.resolver';
import path from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductService } from '../services/products.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { PurchaseServices } from '../services/purchases.service';
import { CustomersService } from '../services/customer.service';
import { CustomerResolver } from './graphql/resolvers/customer.resolver';
import { MessagingModule } from '../messaging/messaging.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot({
      driver:ApolloDriver,
      autoSchemaFile:path.resolve(process.cwd(),'src/schema.gql'),

    })
  ],
  providers:[
    ProductResolver,
    PurchasesResolver,
    CustomerResolver,
   
    ProductService,
    PurchaseServices,
    CustomersService
   
  ]
})
export class HttpModule {}
