import {Client} from 'pg';

export const client = new Client({
    user: 'postgres',
    password: 'lam.dt',
    host: 'localhost',
    port: 3000,
    database: 'progres',
});
 