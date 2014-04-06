CREATE TABLE Session {
  id varchar(32) NOT NULL PRIMARY KEY,
  dogID varchar(32) NOT NULL FOREIGN KEY,
  location varchar (32) NOT NULL,
  canister varchar (32) NOT NULL,
  handler varchar(32) NOT NULL,
  sample_number int NOT NULL,
  sample_info int NOT NULL,
  time varchar(32) NOT NULL,
  duration varchar(32) NOT NULL
}