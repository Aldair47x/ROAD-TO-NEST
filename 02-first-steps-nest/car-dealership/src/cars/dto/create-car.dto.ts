import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateCarDto {
  @IsUUID()
  readonly id: string;
  @IsString()
  readonly brand: string;
  @IsString()
  readonly color: string;
  @IsString()
  readonly model: string;
  @IsNumber()
  readonly price: number;
}
