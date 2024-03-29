import { Controller, Get } from '@nestjs/common';

import { Public } from './decorators/is-public-path.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/test-error')
  async testError() {
    throw new Error('Test error');
  }
}
