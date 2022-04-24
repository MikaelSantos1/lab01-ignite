import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';

import { CustomersService } from '../../../services/customer.service';
import { PurchaseServices } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/currentUser';
import { Customer } from '../models/customer';



@Resolver(()=>Customer)
export class CustomerResolver {
    constructor(
        private customerService:CustomersService,
        private purchaseService:PurchaseServices
    ){

    }
    @UseGuards(AuthorizationGuard)
    @Query(()=>Customer)
    me(
        @CurrentUser()user:AuthUser
    ){
        return this.customerService.getCustomerByAuthUserId(user.sub)
    }
    @ResolveField()
    purchases(@Parent() customer: Customer){  
        return this.purchaseService.listAllFromCustomer(customer.id)
    }
    
}
