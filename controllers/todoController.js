var mongoose = require('mongoose');

//connect to db
mongoose.connect('mongodb://test:test@ds047792.mlab.com:47792/todo');

//create a schema 
var todoSchema = new mongoose.Schema({
    item: String
});

//create model of that schema
var Todo = mongoose.model('Todo', todoSchema);

//for post requests
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});


module.exports = function (app) {

    app.get('/todo', function (req, res) {
        //get data from db and pass to the view
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', {
                todos: data
            });
        });

    });

    app.post('/todo', urlencodedParser, function (req, res) {
        //get data from the view and add it to the db
        var newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function (req, res) {
        //delete requested item from db
        Todo.find({
            item: req.params.item.replace(/\-/g, " ")
        }).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        });

    });

};
