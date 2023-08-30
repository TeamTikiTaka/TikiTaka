import { Pool, QueryResult } from 'pg'
import dotenv from 'dotenv'
dotenv.config()
const PG_URI: string = `${process.env.PG_URI}`

const pool = new Pool({
  connectionString: PG_URI
});

type QueryCallback = (err: Error, result: QueryResult) => void;

module.exports = {
  query: (text: string, params: any[], callback: QueryCallback) => {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};