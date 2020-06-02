import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
const fs = require('fs');
const ini = require('ini');
console.log(__dirname+'/../../../secrets.ini');
const config = ini.parse(fs.readFileSync(__dirname+'/../../../secrets.ini', 'utf-8'));

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var BSONRegExp = mongodb.BSONRegExp;
const uri = "mongodb+srv://" + config.username + ":" + config.password + "@"+config.dburl+".mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
	if(err)console.log("Connection failed du to :", err);
	var db = client.db("garden");
    var collection = db.collection("plants");
    
    var query = {
        "color": "green"
    };
    
    collection.find(query).toArray((err,docs)=>{
		console.log(err,docs);
		client.close();
	});
	
});