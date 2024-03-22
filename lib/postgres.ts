import postgres from "postgres";

if (!process.env.POSTGRESQL_URL) {
  throw new Error("POSTGRESQL_URL is not set");
}

const sql = postgres(process.env.POSTGRESQL_URL);

export default sql;
