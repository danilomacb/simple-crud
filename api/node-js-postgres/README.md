```bash
# Don't forgot to create database before running
CREATE DATABASE node_js_postgres;

# And create this table in the database
CREATE TABLE elements (
    id SERIAL PRIMARY KEY,
    content VARCHAR(100)
);

# After that, you will need install the node dependencies
npm i

# Now you can run the project
npm start

# Or you can run with nodemon to development
npm run dev
```
