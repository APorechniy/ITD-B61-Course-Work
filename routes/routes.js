const bodyParser = require('body-parser');
const parser = bodyParser.urlencoded({extended: false});

// Подгрузка пула
const pool = require('../data/config');
let users;

// Описание роутов
const router = app => {    
    app.get('/', (request, response) => {
        console.log(`URL: ${request.url}`);
        response.send({
            message: 'Сервер работает'
        });
    });
    app.get(`/users/:id`, (request, response) => {
        const id = request.params.id;
        console.log(`URL: ${request.url}`)
        pool.query(`SELECT * FROM users WHERE id = ${id}`, (error, result) => {
            if (error) throw error;
            if(result[0] == null || result[0] == undefined){
                console.log('Empty!')
            }
            response.send(result)
        })        
    });
    app.get(`/users`, (request, response) => {
        console.log(`URL: ${request.url}`)
        pool.query(`SELECT * FROM users`, (error, result) => {
            if (error) throw error;
            if(result[0] == null || result[0] == undefined){
                console.log('Empty!')
            }
            response.send(result)
            users = result
        })        
    })
    app.get(`/calls`, (request, response) => {
        console.log(`URL: ${request.url}`)
        pool.query(`SELECT * FROM calls`, (error, result) => {
            if (error) throw error;
            if(result[0] == null || result[0] == undefined){
                console.log('Empty!')
            }
            response.send(result)
        })        
    })
    app.get(`/changes`, (request, response) => {
        console.log(`URL: ${request.url}`)
        pool.query(`SELECT * FROM changes`, (error, result) => {
            if (error) throw error;
            if(result[0] == null || result[0] == undefined){
                console.log('Empty!')
            }
            response.send(result)
        })        
    })
    app.get(`/notes/:id`, (request, response) => {
        console.log(`URL: ${request.url}`)
        const id = request.params.id
        pool.query(`SELECT * FROM notes WHERE userId = ${id}`, (error, result) => {
            if (error) throw error;
            if(result[0] == null || result[0] == undefined){
                console.log('Empty!')
            }
            response.send(result)
        })        
    })
    app.get(`/weekends`, (request, response) => {
        console.log(`URL: ${request.url}`)
        pool.query(`SELECT * FROM weekends`, (error, result) => {
            if (error) throw error;
            if(result[0] == null || result[0] == undefined){
                console.log('Empty!')
            }
            response.send(result)
        })        
    })
    app.get("/logs", (request, response) => {
        console.log(`URL: ${request.url}`)
        pool.query(`SELECT * FROM logs`, (error, result) => {
            if(error) throw error;
            response.send(result)
        })
    })
    app.post("/registration", parser, function (request, response) {
        console.log(`URL: ${request.url}`)
        let id = users[users.length - 1].id + 1
        pool.query(`INSERT INTO users (login, password, id) VALUES ('${request.body.login}', '${request.body.pass}', ${id})`, (error, result) => {
            if (error) throw error;
        })        
        response.send(`${request.body.login} - ${request.body.pass}`);
    });    
    app.post("/update-calls", parser, function (request, response) {
        console.log(`URL: ${request.url}`)
        pool.query(`UPDATE calls SET type = '${request.body.type}', start = '${request.body.start}', finish = '${request.body.finish}' WHERE (id = '${request.body.id}');`, (error, result) => {
            if (error) throw error;
        })
    })
    app.post("/delete-calls", parser, function (request, response) {
        console.log(`URL: ${request.url}`)
        pool.query(`DELETE FROM calls WHERE (id = '${request.body.id}');`, (error, result) => {
            if (error) throw error;
        })
    })
    app.post("/add-calls", parser, function (request, response) {
        console.log(`URL: ${request.url}`)
        pool.query(`INSERT INTO calls (id, type, start, finish, userId) VALUES ('${request.body.id}', '${request.body.type}', '${request.body.start}', '${request.body.finish}', ${request.body.userId});`, (error, response) => {
            if (error) throw error;
        })
    })
    app.post("/add-logs", parser, function (request, response) {
        console.log(`URL: ${request.url}`)
        pool.query(`INSERT INTO logs (move, login, prevState, newState) VALUES ('${request.body.move}', '${request.body.login}', '${request.body.prevState}', '${request.body.newState}');`, (error, response) => {
            if (error) throw error;
        })
    })
    app.post("/add-user", parser, function (request, response) {
        console.log(`URL: ${request.url}`)
        let lastUser = users.pop()
        pool.query(`INSERT INTO users (id, name, surname, patronum, login, phone, email, departament, password) VALUES ('${lastUser.id + 1}', '${request.body.name}', '${request.body.surname}', '${request.body.patronum}', '${request.body.login}', '${request.body.phone}', '${request.body.email}', '${request.body.departament}', '${request.body.password}');`, (error, response) => {
            if (error) throw error;
        })
    })
    app.post("/update-user", parser, function (request, response) {
        console.log(`URL: ${request.url}`)
        pool.query(`UPDATE users SET name = '${request.body.name}', surname = '${request.body.surname}', patronum = '${request.body.patronum}', login = '${request.body.login}', phone = '${request.body.name}', email = '${request.body.email}', departament = '${request.body.departament}', password = '${request.body.password}' WHERE (id = '${request.body.id}');
        `, (error, response) => {
            if (error) throw error;
        })
    })
}

module.exports = router;