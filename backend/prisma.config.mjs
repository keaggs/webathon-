// Prisma 7 config – CLI loads this for schema path, migrations, and DATABASE_URL.
// See https://pris.ly/d/prisma-config
import { defineConfig, env } from "prisma/config";
require("dotenv").config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL || "file:./dev.db"
  },
});
