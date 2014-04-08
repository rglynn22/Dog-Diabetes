var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();

var dogQuery = 'CREATE TABLE Dog (
  id varchar(32) NOT NULL PRIMARY KEY,
  name varchar(32) NOT NULL,
  age int NOT NULL
);';

var sessionQuery = 'CREATE TABLE Session (
  id varchar(32) NOT NULL PRIMARY KEY,
  dogID varchar(32) NOT NULL FOREIGN KEY,
  location varchar (32) NOT NULL,
  canister varchar (32) NOT NULL,
  handler varchar(32) NOT NULL,
  sample_number int NOT NULL,
  sample_info int NOT NULL,
  time varchar(32) NOT NULL,
  duration varchar(32) NOT NULL
);';
query = client.query(dogQuery + sessionQuery);
query.on('end', function() { client.end(); });