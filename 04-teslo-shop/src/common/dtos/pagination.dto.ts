import { Type } from "class-transformer";
import { IsOptional, IsInt, Min, Max } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset: number = 0;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number = 10;
}