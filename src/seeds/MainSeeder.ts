import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { UserSeeder } from "./UserSeeder";

// Essa classe é para fazer com que a execução das seeds tenham uma ordem

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    await runSeeder(dataSource, UserSeeder)
    // Aqui poderia ter await runSeeder(dataSource, ClientSeeder)
  }
  
}