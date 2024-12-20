import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get("/")
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post("/create")
  craeteBoard(
    @Body() createBoardDto: CreateBoardDto
  ): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get("/:id")
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Delete("/:id")
  deleteBoardById(@Param('id') id: string): void {
    this.boardsService.deleteBoardById(id);
  }

}
