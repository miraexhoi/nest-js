import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { BoardStatusValidationPipe } from './pipes/board-status-validation-pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto,
              @GetUser() user: User ) : Promise<Board> {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get("/:id")
  getBoardById(@Param('id') id: number) : Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user:User
  ) : Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Get()
  getAllBoards(
    @GetUser() user: User
  ): Promise<Board[]> {
    return this.boardsService.getAllBoards(user);
  }

}
