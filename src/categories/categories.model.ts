import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from "typeorm";

@Entity({ name: "categories" })
export class Category {
  @ApiProperty({ example: "2", description: "Идентификатор" })
  @PrimaryGeneratedColumn()
  declare id: number;

  @ApiProperty({ example: "1", description: "Идентификатор родителя" })
  @Column({ nullable: true })
  parent_id?: number;

  @ApiProperty({ example: "Яблоки", description: "Наименование категории" })
  @Column()
  name: string;

  @ApiProperty({ example: "yabloki", description: "slug" })
  @Column({ unique: true })
  slug: string;

  @ApiProperty({ example: "1", description: "Номер сортировки" })
  @Column()
  order: number;

  @ApiProperty({ example: null, description: "Дата удаления" })
  @DeleteDateColumn({ name: "deleted_at" })
  deleted_at?: Date;
}
