import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Product } from "./product";

enum PurchasesStatus{
    PENDING="PENDING",
    APROVED="APROVED",
    FAIELD="FAIELD"
}
registerEnumType(PurchasesStatus,{
    name:"PurchasesStatus",
    description:"Avaible purchases statuses"
})
@ObjectType()
export class Purchases{
    @Field(()=>ID)
    id:string;

    @Field(()=>PurchasesStatus)
    status:PurchasesStatus;

    @Field()
    slug:string;

    @Field(()=>Date)
    createdAt:Date;

    @Field(()=>Product)
    product:Product
    
    productId:string;
    
}