import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';

@Controller('/api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private connection: Connection,
    private mailService: MailService,
    private userRepository: UserRepository,
  ) {}

  @Get('/connection')
  async getConnection(): Promise<string> {
    this.userRepository.save();
    this.mailService.send();
    return this.connection.getName();
  }

  @Get('/sample')
  get(): string {
    return 'GET SAMPLE';
  }

  @Post()
  post(): string {
    return 'Mengirim post2';
  }
  @Get('/hello')
  async sayHello(
    @Query('first_name') first_name: string,
    @Query('last_name') last_name: string,
  ): Promise<string> {
    const name: string = first_name + ' ' + last_name;
    return this.userService.sayHello(name);
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sample_response(): Record<string, string> {
    return {
      data: 'Hello Response',
    };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      url: '/api/users/sample-response',
      statusCode: 301,
    };
  }

  @Get('/set-cookie')
  set_cookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Success Set Cookie');
  }

  @Get('/get-cookie')
  get_cookie(@Req() request: Request): string {
    return request.cookies['name'];
  }

  @Get('/view/hello')
  viewHello(
    @Query('first_name') first_name: string,
    @Query('last_name') last_name: string,
    @Res() response: Response,
  ) {
    response.render('index.html', {
      title: 'viewHello',
      name: first_name + last_name,
    });
  }
  @Get('/:id')
  getId(@Req() request: Request): string {
    return `Hello ${request.params.id}`;
  }
}
