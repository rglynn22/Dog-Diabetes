DROP TABLE Session;
DROP TABLE ScentWheelSession;
DROP TABLE Dog;

CREATE TABLE Dog (
  id varchar(64) NOT NULL PRIMARY KEY,
  name varchar(32) NOT NULL,
  age int NOT NULL,
  breed varchar(32),
  start_date varchar(64)  
);

CREATE TABLE Session (
  id varchar(64) NOT NULL PRIMARY KEY,
  dogID varchar(64) REFERENCES dog(id),
  location varchar (32) NOT NULL,
  canister varchar (32) NOT NULL,
  handler varchar(32) NOT NULL,
  sample_number int NOT NULL,
  sample_info varchar(64),
  sample_time varchar(32) NOT NULL,
  record_date varchar(64) NOT NULL,
  duration varchar(32),
  successes int,
  misses int,
  false_alerts int,
  total_trials int,
  notes text
);

CREATE TABLE ScentWheelSession (
  id varchar(64) NOT NULL PRIMARY KEY,
  dogID varchar(64) REFERENCES dog(id),
  handler varchar(32) NOT NULL,
  sample_number int NOT NULL,
  sample_info varchar(64),
  sample_time varchar(32) NOT NULL,
  can1 varchar(32) NOT NULL,
  can2 varchar(32) NOT NULL,
  can3 varchar(32) NOT NULL,
  can4 varchar(32) NOT NULL,
  record_date varchar(64) NOT NULL,
  duration varchar(32),
  session_string text, 
  notes text
);


INSERT INTO dog (id, name, age) VALUES ('1','Fido', '3');
INSERT INTO dog (id, name, age) VALUES ('2','Spot', '5');
