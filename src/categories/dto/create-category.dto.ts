import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({ example: "1", description: "Идентификатор родителя" })
  readonly parent_id: number;
  @ApiProperty({ example: "Яблоки", description: "Наименование категории" })
  readonly name: string;
  @ApiProperty({ example: "1", description: "Номер сортировки" })
  readonly order: number;
}
