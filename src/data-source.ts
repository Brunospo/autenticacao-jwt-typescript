import "reflect-metadata"
import "dotenv/config"

import { DataSource, DataSourceOptions } from "typeorm"
import { SeederOptions } from "typeorm-extension"
import { MainSeeder } from "./seeds/MainSeeder"

const options: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    seeds: [MainSeeder]
}

export const AppDataSource = new DataSource(options)
