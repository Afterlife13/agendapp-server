import mysql from 'mysql';
import keys from './keys';

const pool = mysql.createConnection(keys.database);

pool.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("Conected to DB");
});

export default pool;