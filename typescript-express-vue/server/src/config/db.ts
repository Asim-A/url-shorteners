import sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export default class Database {
  database: sequelize.Sequelize;

  constructor() {
    this.database = new sequelize({
      dialect: "sqlite",
      storage: "./db.sqlite",
    });

    this.database
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });

    this.database.sync({
      // Using 'force' will drop any table defined in the models and create them again.
      // force: true,
    });
  }
}
