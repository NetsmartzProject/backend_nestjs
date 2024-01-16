import { Controller, Post, Request, Logger, ConflictException, NotFoundException, Get, Param, Res, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express"; // Import Response from express

@Controller('user')
export class UserController {
  logger: Logger;

  constructor(private readonly userService: UserService) {
    this.logger = new Logger(UserController.name);
  }



  @Post('signup')
async signup(@Request() req): Promise<any> {
  const newUser = req.body;
  try {
    const query = { email: newUser.email };
    const isUser = await this.userService.findOne(query);

    if (isUser) {
      throw new ConflictException('User Already Exists');
    }

    // Use 'firstname' instead of 'firstName'
    const user = await this.userService.create({
      firstname: newUser.firstName,
      lastname: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
      task:[]
    });
    console.log(user, "signup");
    return user;
  } catch (err) {
    this.logger.error('Something went wrong in signup:', err);
    throw err;
  }
}


  @Get(':email') // Assuming you want to retrieve user details by email
  async getUserByEmail(@Param('email') email: string): Promise<any> {
    try {
      const user = await this.userService.findOneByEmail(email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (err) {
      throw err;
    }
  }



  @Post('login')
  async login(@Request() req, @Res() res: Response): Promise<any> {
    const { email, password, firstName, lastName } = req.body;
  
    try {
      const user = await this.userService.authenticate(email, password);
  
      // Assuming firstName and lastName are available in the req.body
      if (firstName) {
        user.firstname = firstName;
      }
  
      if (lastName) {
        user.lastname = lastName;
      }
  
      // You may generate and return a JWT token here for authentication
      console.log(user, "user");
  
      return res.status(HttpStatus.OK).json({ user, statusCode: HttpStatus.OK });
    } catch (err) {
      this.logger.error('Login failed:', err);
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Login failed', statusCode: HttpStatus.UNAUTHORIZED });
    }
  }
  

}
