import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('commands')
export class CommandsController {
  constructor(private readonly config: ConfigService) { }
}
