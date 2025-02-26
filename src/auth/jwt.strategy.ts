import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ExtractJwt } from 'passport-jwt';
import { User } from './user.entity';
import * as config from 'config';
import * as process from 'node:process';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
      @InjectRepository(UserRepository)
      private userRepository: UserRepository
    ) {
      super({
        secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      })
    }

    async validate(payload){
      const { username } = payload;
      const user: User = await this.userRepository.findOne({
        where: { username }
      });

      if(!user) {
        throw new UnauthorizedException();
      }

      return user;
    }
}