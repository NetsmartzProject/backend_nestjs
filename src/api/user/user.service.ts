  

import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

    async findOneByEmail(email: string): Promise<UserDocument | null> {
      return this.userModel.findOne({ email }).exec();
    }
  
  
  async findOne(query: FilterQuery<User>): Promise<User | null> {
    return this.userModel.findOne(query).exec();
  }

  
  async create(newUser: User): Promise<User> {
    return this.userModel.create(newUser);
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email, password }).exec();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log("Login Successfully ")
    return user;
  }

}
