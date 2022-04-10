import { CanActivate, Catch, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'express-jwt';
import { ConfigService } from '@nestjs/config';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
import { GqlExecutionContext } from '@nestjs/graphql';
@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIANCE: string;
  private AUTH0_DOMAIN: string;
  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIANCE = this.configService.get('AUTH0_AUDIANCE') ?? '';
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN') ?? '';
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const httpContext = context.switchToHttp();
    // const req = httpContext.getRequest();
    // const res = httpContext.getResponse();

    const { req,res}= GqlExecutionContext.create(context).getContext()
    const checkJWT = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
        }),
        audiance: this.AUTH0_AUDIANCE,
        issuer: this.AUTH0_DOMAIN,
        algorithms: ['RS256'],
      }),
    );
    try{
      await checkJWT(req,res)
      return true
    }catch(err){
      console.log(err)
      throw new UnauthorizedException(err)
    }
    
  }
}
