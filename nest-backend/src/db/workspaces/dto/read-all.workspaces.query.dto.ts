import { IsInt, IsOptional, Length, Max, Min } from "class-validator";
import { MAX_PAGE_SIZE } from "src/config";

export class ReadManyWorkspacesQueryDTO {
  @IsOptional()
  @Length(1, 50)
  search: string | undefined | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(MAX_PAGE_SIZE)
  pageSize: number = MAX_PAGE_SIZE;

  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  get take(): number {
    return this.pageSize
  }

  get skip(): number {
    return this.pageSize*(this.page-1)
  }
}
