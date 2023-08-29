import { Pool, QueryResult } from 'pg'

const PG_URI: string = 'postgres://ljquricq:sq_wyiKjyTxEklaClWlxDZXeUreAqIRy@berry.db.elephantsql.com/ljquricq'

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