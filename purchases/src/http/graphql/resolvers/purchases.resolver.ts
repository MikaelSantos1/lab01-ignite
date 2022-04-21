import {  UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';


import { PurchaseServices } from '../../../services/purchases.service';
import { Purchases } from '../models/purchases';
import { Product } from '../models/product';
import { ProductService } from '../../../services/products.service';

@Resolver(()=>Purchases)
export class PurchasesResolver {
    constructor(
        private purchasesService:PurchaseServices,
        private productService:ProductService
    ){

    }
    @Query(()=>[Purchases])
     @UseGuards(AuthorizationGuard)
    purchases(){
       return this.purchasesService.listAllPurchases()
    }

  @ResolveField(()=>Product)
    product(
        @Parent()purchase:Purchases,
        ){
        {
            return this.productService.getProductById(purchase.productId)
        }
    }
    
}
