import { MigrationInterface, QueryRunner } from "typeorm";

export class Categories1765798505955 implements MigrationInterface {
    name = 'Categories1765798505955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "parent_id" integer, "name" character varying NOT NULL, "slug" character varying NOT NULL, "order" integer NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
