import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST ?? "localhost",
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  username: process.env.POSTGRES_USER ?? "postgres",
  password: process.env.POSTGRES_PASSWORD ?? "root",
  database: process.env.POSTGRES_DB ?? "test_news",
  entities: ['./src/**/*.model{.ts,.js}'],
  migrations: ['./src/migrations/*{.js,.ts}'],
  synchronize: false})

export default AppDataSource;
