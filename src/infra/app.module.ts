import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CreateUsers } from 'src/modules/CreateUsers/useCases/CreateUsers.ts/CreateUsers';
import { ListSpecifcUser } from 'src/modules/CreateUsers/useCases/ListUser/ListSpecifcUser';

import { AppController } from '../controller/app.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [CreateUsers, ListSpecifcUser],
})
export class AppModule {}
