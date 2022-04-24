import {  UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CoursesService } from "src/services/courses.service";
import { StudentsService } from "src/services/students.service";
import { AuthorizationGuard } from "../../../http/auth/authorization.guard";
import { EnrollmentsService } from "../../../services/enrollments.service";
import { Enrollment } from "../models/enrollment";


@Resolver(()=>Enrollment)
export class EnrollmentsResolver{
    constructor(
        private enrollmentsService:EnrollmentsService,
        private coursesService:CoursesService,
        private studentService:StudentsService
        ){}

    @Query(()=>[Enrollment])
    @UseGuards(AuthorizationGuard)
    enrollment(){
        return this.enrollmentsService.listAllEnrollments()
    }

    @ResolveField()
    student(@Parent() enrollment:Enrollment){   
        return this.studentService.getStudentById(enrollment.studentId)     
    }
    @ResolveField()
    course(@Parent() enrollment:Enrollment){
        return this.coursesService.getCourseById(enrollment.courseId)
    }
}