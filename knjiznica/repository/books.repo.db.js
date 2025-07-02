const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'myBooks',
    password: 'PostgreSQL_vml',
    port: 5432,
});

module.exports = {
    query: async (SQL, params) => {
        try {
            const result = await pool.query(SQL, params);
            return result.rows;
        } catch (err) {
            console.error('Database query error:', err);
            throw err;
        }
    }
};