import database from "../config/db";
import sequelize from "sequelize";

// Database connection instance
let databaseInstance = new database().database;

export interface UrlInterface {
  shortenedUrl: string;
  shortenedUrlSuffix: string;
  actualUrl: string;
}

export const UrlShortner: sequelize.Model<UrlInterface, {}> =
  databaseInstance.define<UrlInterface, {}>(
    "UrlShortner",
    {
      id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      shortenedUrl: {
        type: sequelize.STRING,
        allowNull: false,
      },
      shortenedUrlSuffix: {
        type: sequelize.STRING,
        allowNull: false,
      },
      actualUrl: {
        type: sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
