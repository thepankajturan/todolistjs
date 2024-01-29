const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const date = require(__dirname + '/date');
const ejs = require('ejs');
const port = 3000;
const mongoose = require('mongoose');
const Item = require('./model/todolist');
const WorkItem = require('./model/worklist');

mongoose.connect('mongodb://localhost:27017/todolistDB')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

let newItem = '';

let query;

let workItemQuery;

async function run() {
    try {
          
        app.get('/', async (req, res) => {

            query = await Item.find({});

            let thisDay = date.getDate();

            res.render('list', { thisDay: thisDay, newItem: query })
        })

        app.post('/', async (req, res) => {
            const formData = req.body;

            newItem = formData.itemName;

            if (req.body.listType === 'Work') {
                await WorkItem.create({name: newItem});

                res.redirect('/work');
            } else {
                await Item.create({name: newItem});
                res.redirect('/');
            }



        })

        app.post('/delete', async (req, res) => {
            
            if ( req.body.listType == 'Work List') {
                try {
                    await WorkItem.findByIdAndDelete(req.body.checkedItem)
                    console.log("Successfully Deleted the Item.");
                } catch (e) {
                    console.log(e.message);
                }
                res.redirect('/work')
            } else {
                try {
                    await Item.findByIdAndDelete(req.body.checkedItem)
                    console.log("Successfully Deleted the Item.");
                } catch (e) {
                    console.log(e.message);
                }
                res.redirect('/')
            }
        })

        // Work
        app.get('/work',  async (req, res) => {
            workItemQuery = await WorkItem.find({});

            res.render('list', { thisDay: 'Work List', newItem: workItemQuery })
        })

        app.get('/about', (req, res) => {
            res.render('about');
        })


        // mongoose.connection.close();

        app.listen(port, () => {
            console.log(`Server is running at ${port}`)
        })

    } catch (e) {
        console.log(e.message);
    }

}
run();