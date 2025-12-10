export class CreateOrUpdateCategoryDto {
  readonly id?: number | undefined;
  readonly parent_id?: number | undefined;
  readonly name: string;
  readonly slug?: string | undefined;
  readonly order: number;
  readonly deleted_at?: Date | undefined;
}
