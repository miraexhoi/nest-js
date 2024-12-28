import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {

  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository
  ) {
  }

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // Board
  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const { title, description } = createBoardDto;
  //
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC
  //   }
  //
  //   this.boards.push(board);
  //   return board;
  // }
  //

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC
    })

    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }

    return found;
  }

  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //
  //   if (!found) {
  //     throw new NotFoundException(`Can't find board with id ${id}`);
  //   }
  //
  //   return found;
  // }
  //
  // deleteBoardById(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter(board => board.id !== found.id);
  // }
  //
  // updateBoardById(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
