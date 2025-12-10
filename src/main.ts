import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("CRUD API Категорий")
    .setDescription("Создавай, удаляй и влавствуй!")
    .setVersion("Powered By Sirotkin Sergey")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/swagger", app, document);

  await app.listen(process.env.PORT ?? 8000);
}

start().then();
