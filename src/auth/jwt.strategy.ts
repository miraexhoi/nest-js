import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ExtractJwt } from 'passport-jwt';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
      @InjectRepository(UserRepository)
      private userRepository: UserRepository
    ) {
      super({
        secretOrKey: 'Secret1234',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      })
    }

    async validate(payload){
      const { username } = payload;
      const user: User = await this.userRepository.findOne({ username });

      if(!user) {
        throw new UnauthorizedException();
      }

      return user;
    }
}