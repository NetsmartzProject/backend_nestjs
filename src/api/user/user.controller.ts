import { Controller, Post, Request, Logger, ConflictException, NotFoundException, Get, Param, Res, HttpStatus } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express"; // Import Response from express

@Controller('user')
export class UserController {
  logger: Logger;

  constructor(private readonly userService: UserService) {
    this.logger = new Logger(UserController.name);
  }

  @Post('signup') // Change the route to something more meaningful, like 'signup'
  async signup(@Request() req): Promise<any> {
    const newUser = req.body;
    try {
      const query = { email: newUser.email };
      const isUser = await this.userService.findOne(query);

      if (isUser) {
        throw new ConflictException('User Already Exists');
      }

      const user = await this.userService.create(newUser);
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
    const { email, password } = req.body;

    try {
      const user = await this.userService.authenticate(email, password);

      // You may generate and return a JWT token here for authentication
      return res.status(HttpStatus.OK).json({ user, statusCode: HttpStatus.OK });
    } catch (err) {
      this.logger.error('Login failed:', err);
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Login failed', statusCode: HttpStatus.UNAUTHORIZED });
    }
  }
}
