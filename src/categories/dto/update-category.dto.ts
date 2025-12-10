import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto {
  @ApiProperty({ example: "1", description: "Идентификатор родителя" })
  readonly parent_id?: number | undefined;
  @ApiProperty({ example: "Яблоки", description: "Наименование категории" })
  readonly name?: string | undefined;
  @ApiProperty({ example: "1", description: "Номер сортировки" })
  readonly order?: number | undefined;
}
