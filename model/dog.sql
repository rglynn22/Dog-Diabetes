CREATE TABLE Dog (
  id varchar(32) NOT NULL PRIMARY KEY,
  name varchar(32) NOT NULL,
  age int NOT NULL
);

INSERT INTO Dog (id, name, age) 
VALUES
('1', 'FIDO', '7');