import {  UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { ProductService } from '../../../services/products.service';
import { Product } from '../models/product';

@Resolver('test')
export class ProductResolver {
    constructor(
        private productService:ProductService
    ){

    }
    @Query(()=>[Product])
    @UseGuards(AuthorizationGuard)
    products(){
       return this.productService.listAllProducts()
    }
}
