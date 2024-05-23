import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: any[] = [];

  getAllUsers(): any[] {
    return this.users;
  }

  register(
    email: string,
    username: string,
    password: string,
    user_password: string,
  ) {
    this.users.push({
      email,
      username,
      password,
      user_password,
    });
  }
}
