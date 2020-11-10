// Подгрузка модуля на работу с БД
const mysql = require('mysql');

// Данные для коннекта к БД
const config = {
    host: 'localhost',  //Сервер БД
    port: 3306,         //Порт
    user: 'root',       //Логин
    password: 'root',   //Пароль
    database: 'phonebase',   //Имя БД
};

// Создание пула
const pool = mysql.createPool(config);

module.exports = pool;



