import { HttpException, Injectable } from "@nestjs/common";
import { Category } from "./categories.model";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { CreateOrUpdateCategoryDto } from "./dto/create-or-update-category.dto";

function translit(slug: string) {
  const ruToEnMap = {
    'а': 'a', 'б': 'b', 'в': 'v', 'ґ': 'g', 'г': 'g', 'д': 'd', 'е': 'e',
    'ё': 'e', 'є': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'і': 'i', 'ї': 'i',
    'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
    'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': "'", 'ы': 'y', 'ь': "'", 'э': 'e',
    'ю': 'yu', 'я': 'ya'
  }
  return slug.split('').map(char => {
    return ruToEnMap[char] || char;
  }).join('')
}

function generateSlug(name: string) {
  return translit(
    name
      .toLowerCase()
      .replace(/[\s]+/gi, "-")
  ).replace(/[^0-9a-z_-]+/gi, "");
}

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getSlug(id: number | undefined, name: string) {
    // генерируем slug
    let slug = generateSlug(name);

    // в цикле, пока slug занят - добавляем в конце '-1', далее '-2' и тд
    while (
      await this.categoriesRepository.existsBy(
        id ? { slug: slug, id: Not(id) } : { slug: slug },
      )
    ) {
      const splitSlug = slug.split("-");
      if (splitSlug[splitSlug.length - 1].match(/^\d+$/)) {
        const number = splitSlug.pop();
        slug = `${splitSlug.join("-")}-${Number(number) + 1}`;
      } else {
        slug = `${slug}-1`;
      }
    }

    return slug;
  }

  async createCategory(dto: CreateOrUpdateCategoryDto) {
    let slugName: string = dto.name;

    let parent_id = dto.parent_id;
    while (parent_id) {
      if (parent_id == dto.id) {
        throw new HttpException("Цикл в иерархии", 400);
      }
      const parent = await this.categoriesRepository.findOneBy({
        id: parent_id,
      });
      if (!parent) {
        throw new HttpException("Родительская категория не найдена", 404);
      }
      slugName = `${parent.name}-${slugName}`;
      parent_id = parent.parent_id;
    }

    return this.categoriesRepository.save({
      ...dto,
      slug: await this.getSlug(dto.id, slugName),
    });
  }

  async deleteCategory(id: number) {
    if (!(await this.categoriesRepository.existsBy({ id: id }))) {
      throw new HttpException("Категория не найдена", 404);
    }
    console.log(
      id,
      await this.categoriesRepository.findOneBy({ parent_id: id }),
    );
    if (await this.categoriesRepository.existsBy({ parent_id: id })) {
      throw new HttpException("Категория является родительской", 400);
    }
    return await this.categoriesRepository.softDelete(id);
  }

  async getCategory(id_or_slug: number | string) {
    const category = await this.categoriesRepository.findOneBy(
      typeof id_or_slug === "number"
        ? { id: id_or_slug }
        : Number(id_or_slug)
          ? { id: Number(id_or_slug) }
          : { slug: id_or_slug },
    );
    if (!category) {
      throw new HttpException("Категория не найдена", 404);
    }
    return category;
  }

  async updateCategory(id: number, dto: UpdateCategoryDto) {
    // @ts-ignore
    return this.createCategory({
      ...(await this.getCategory(id)),
      ...dto,
    });
  }

  async getList(parent_id?: number) {
    return await this.categoriesRepository.find({
      where: { parent_id: parent_id },
      order: { order: "DESC", id: "DESC" },
    });
  }

  async getHierarchy(id_or_slug: number | string) {
    const category = await this.getCategory(id_or_slug);
    const hierarchy: string[] = [];

    let parent_id = category.parent_id;
    while (parent_id) {
      const parent = await this.categoriesRepository.findOneBy({
        id: parent_id,
      });
      hierarchy.push(parent?.name || "");
      parent_id = parent?.parent_id;
    }

    return hierarchy.reverse();
  }
}
