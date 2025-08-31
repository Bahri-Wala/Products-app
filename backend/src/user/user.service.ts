import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findByUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  async ensureSeedUser(username: string, password: string) {
    const exists = await this.findByUsername(username);
    if (!exists) {
      const passwordHash = await bcrypt.hash(password, 10);
      await this.repo.save(this.repo.create({ username, passwordHash }));
    }
  }
}
