const { Pool } = require("pg");

const connectionString = `postgresql://danilomacb:abc@localhost:5432/node_js_postgres`;

module.exports = new Pool({ connectionString });
