import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

}