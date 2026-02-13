import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { SearchService } from './search.service';
import { AuthGuard } from '../auth/auth.guard';
import { EntityType } from 'src/types/dto/Search';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // 1. GET: Serve a simple HTML form for testing
  @Get()
  getTestPage(@Res() res: Response) {
    res.send(`
      <html>
        <body>
          <h2>Microsoft Search Test</h2>
          <form action="/api/v1/search" method="POST">
            <input name="query" placeholder="Search Event..." />
            <input name="entityTypes" placeholder="Entity Types..." />
            <button type="submit">Run Search</button>
          </form>
        </body>
      </html>
    `);
  }

  // 2. POST: Handle the search and return JSON (Pure API)
  @Post()
  @UseGuards(AuthGuard)
  async executeSearch(
    @Body('query') query: string,
    @Body('entityTypes') entityTypes: string,
    @Req() req: Request,
    @Res() res: Response, // Inject response to send JSON
  ) {
    try {
      const _entityTypes = entityTypes.split(',');
      const response = await this.searchService.search(
        query,
        _entityTypes as EntityType[],
        req.session.token,
      );
      res.status(HttpStatus.OK).send(response);
    } catch {
      throw new InternalServerErrorException(Message.ERROR_EXECUTING_SEARCH);
    }
  }
}
