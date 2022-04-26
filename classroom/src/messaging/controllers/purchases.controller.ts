import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
interface PurchaseCreatedPayload{
    
}
@Controller()
export class PurchaseController{
    @EventPattern("purchases.new-purchase")
    async purchaseCreated(
        @Payload('value') payload:
    ){
        console.log('teste')
    }
}