CREATE TABLE Session (
  id varchar(64) NOT NULL PRIMARY KEY,
  dogID varchar(64) REFERENCES dog(id),
  location varchar (32) NOT NULL,
  canister varchar (32) NOT NULL,
  handler varchar(32) NOT NULL,
  sample_number int NOT NULL,
  sample_info int NOT NULL,
  time varchar(32) NOT NULL,
  duration varchar(32),
  successes int,
  misses int,
  false_alerts int,
  total_trials int
);