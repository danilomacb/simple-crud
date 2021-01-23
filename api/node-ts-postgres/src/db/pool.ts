import { Pool } from "pg";

const connectionString = `postgresql://danilomacb:abc@localhost:5432/node_ts_postgres`;

export default new Pool({ connectionString });
