import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent, Args, Mutation } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';


import { PurchaseServices } from '../../../services/purchases.service';
import { Purchases } from '../models/purchases';
import { Product } from '../models/product';
import { ProductService } from '../../../services/products.service';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { CurrentUser, AuthUser } from '../../auth/currentUser';
import { CustomersService } from '../../../services/customer.service';

@Resolver(() => Purchases)
export class PurchasesResolver {
    constructor(
        private purchasesService: PurchaseServices,
        private productService: ProductService,
        private customersService: CustomersService
    ) {

    }
    @Query(() => [Purchases])
    @UseGuards(AuthorizationGuard)
    purchases() {
        return this.purchasesService.listAllPurchases()
    }

    @ResolveField(() => Product)
    product(
        @Parent() purchase: Purchases,
    ) {
        {
            return this.productService.getProductById(purchase.productId)
        }
    }

    @Mutation(() => Purchases)
    @UseGuards(AuthorizationGuard)
    async createPurchase(
      @Args('data') data: CreatePurchaseInput,
      @CurrentUser() user: AuthUser,
    ) {
      let customer = await this.customersService.getCustomerByAuthUserId(
        user.sub,
      );
  
      if (!customer) {
        customer = await this.customersService.createCustomer({
          authUserId: user.sub,
        });
      }
  
      return this.purchasesService.createPurchase({
        customerId: customer.id,
        productId: data.productId,
      });
    }
}
