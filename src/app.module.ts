import { Module } from "@nestjs/common";
import { CategoriesModule } from "./categories/categories.module";
import { ConfigModule } from "@nestjs/config";
import { Category } from "./categories/categories.model";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST ?? 'postgres',
      port: Number(process.env.POSTGRES_PORT ?? 5000),
      username: process.env.POSTGRES_USER ?? 'postgres',
      password: process.env.POSTGRES_PASSWORD ?? 'root',
      database: process.env.POSTGRES_DB ?? 'test_news',
      entities: [Category],
      synchronize: true,
      autoLoadEntities: true,
    }),
    CategoriesModule,
  ],
})
export class AppModule {}
