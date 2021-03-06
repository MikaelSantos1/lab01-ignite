import {  UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { ProductService } from '../../../services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';

@Resolver(()=>Product)
export class ProductResolver {
    constructor(
        private productService:ProductService
    ){

    }
    @Query(()=>[Product])
    // @UseGuards(AuthorizationGuard)
    products(){
       return this.productService.listAllProducts()
    }

    @UseGuards(AuthorizationGuard)
    @Mutation(()=>Product)
    createProduct(
        @Args('data') data:CreateProductInput
    ){
        return this.productService.createProduct(data)
    }

    
}
