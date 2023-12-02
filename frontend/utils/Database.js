const { Pool } = require("pg");

class Database {
  constructor() {
    this.pool = new Pool({
      // connectionString: process.env.POSTGRES_URL + "?sslmode=require",
      host: process.env.POSTGRES_URL,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    });
  }

  async query(text, params) {
    let client;
    try {
      client = await this.pool.connect();
      const result = await client.query(text, params);
      return result.rows;
    } catch (error) {
      console.error("Error - Database query: ", error);
      throw error;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  async insert(table, values) {
    const columns = Object.keys(values).join(", ");
    const params = Object.values(values);
    const placeholders = Object.keys(values)
      .map((_, index) => `$${index + 1}`)
      .join(", ");
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;
    return this.query(query, params);
  }

  async update(table, values, where) {
    const sets = Object.keys(values)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const params = [...Object.values(values), ...Object.values(where)];
    const whereClause = Object.keys(where)
      .map(
        (key, index) => `${key} = $${index + Object.keys(values).length + 1}`
      )
      .join(" AND ");
    const query = `UPDATE ${table} SET ${sets} WHERE ${whereClause} RETURNING *`;
    return this.query(query, params);
  }

  async remove(table, where) {
    const whereClause = Object.keys(where)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(" AND ");
    const params = Object.values(where);
    const query = `DELETE FROM ${table} WHERE ${whereClause} RETURNING *`;
    return this.query(query, params);
  }

  async select(table, where) {
    const whereClause = Object.keys(where)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(" AND ");
    const params = Object.values(where);
    const query = `SELECT * FROM ${table} WHERE ${whereClause}`;
    return this.query(query, params);
  }
}

module.exports = Database;
