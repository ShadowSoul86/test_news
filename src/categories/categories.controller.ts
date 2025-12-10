import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CategoriesService } from "./categories.service";
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Category } from "./categories.model";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@ApiTags("Категории")
@Controller("categories")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @ApiOperation({ summary: "Создание категории" })
  @ApiResponse({ status: 200, type: Category })
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.createCategory(dto);
  }

  @ApiOperation({ summary: "Удаление категории" })
  @ApiResponse({ status: 200 })
  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.categoriesService.deleteCategory(id);
  }

  @ApiOperation({ summary: "Получение категории" })
  @ApiParam({ name: "id_or_slug" })
  @ApiResponse({ status: 200, type: Category })
  @Get(":id_or_slug")
  get(@Param("id_or_slug") id_or_slug: number | string) {
    return this.categoriesService.getCategory(id_or_slug);
  }

  @ApiOperation({ summary: "Изменение категории" })
  @ApiResponse({ status: 200, type: Category })
  @Put(":id")
  update(@Param("id") id: number, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(id, dto);
  }

  @ApiOperation({ summary: "Список категорий" })
  @ApiQuery({ name: "parent_id", required: false })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  list(@Query("parent_id") parent_id?: number) {
    return this.categoriesService.getList(parent_id);
  }

  @ApiOperation({ summary: "Получение иерархии категории" })
  @ApiParam({ name: "id_or_slug" })
  @ApiResponse({ status: 200, type: Array<number> })
  @Get(":id_or_slug/hierarchy")
  getHierarchy(@Param("id_or_slug") id_or_slug: number | string) {
    return this.categoriesService.getHierarchy(id_or_slug);
  }
}
