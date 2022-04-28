import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import { CoursesService } from "src/services/courses.service";
import {StudentsService  } from "src/services/students.service";
import { EnrollmentsService } from "src/services/enrollments.service";

export interface Customer {
    authUserId: string;
}

export interface Product {
    id: string;
    title: string;
    slug: string;
}

export interface PurchaseCreatedPayload {
    customer: Customer;
    product: Product;
}
@Controller()
export class PurchaseController{
    constructor(
        private studentService:StudentsService,
        private courseService:CoursesService,
        private enrollmentService:EnrollmentsService
    ){}
    @EventPattern("purchases.new-purchase")
    async purchaseCreated(@Payload('value') payload:PurchaseCreatedPayload){
       let student= await this.studentService.getStudentByAuthUserId(payload.customer.authUserId)

       if(!student){
           student= await this.studentService.createStudent({
            authUserId:payload.customer.authUserId
           })
       }
       let course= await this.courseService.getStudentBySlug(payload.product.slug)
       if(!course){
       course = await this.courseService.createCourse({
            title:payload.product.title})
       }
       await this.enrollmentService.createEnrollment({
           courseId:course.id,
           studentId:student.id
       })
    }
}