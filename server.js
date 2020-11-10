// Подгружаем пакет и устанавливаем порт
const express = require('express');
const parser = require('body-parser');
const routes = require('./routes/routes')
const port = 3000;
const app = express();

// Обозначаем парсинг в JSON
app.use(parser.json());
app.use(parser.urlencoded({
    extended: true,
}));

// Отмена CORS защиты
app.use(function (req, res, next) {
    var origins = [
        'http://localhost:9000',
        'http://127.0.0.1:9000'
    ];

    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Вызов роутов
routes(app);

// Запуск сервера
const server = app.listen(port, (error) => {
    if (error) return console.log(`Ошибка: ${error}`); 
    console.log(`Сервер слушает порт: ${server.address().port}`);
});

