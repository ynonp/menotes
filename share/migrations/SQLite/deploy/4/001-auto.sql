-- 
-- Created by SQL::Translator::Producer::SQLite
-- Created on Fri Dec  6 13:16:29 2013
-- 

;
BEGIN TRANSACTION;
--
-- Table: notebooks
--
CREATE TABLE notebooks (
  id INTEGER PRIMARY KEY NOT NULL,
  name text NOT NULL
);
--
-- Table: notes
--
CREATE TABLE notes (
  id INTEGER PRIMARY KEY NOT NULL,
  notebook_id integer NOT NULL,
  title text NOT NULL,
  text text NOT NULL,
  FOREIGN KEY (notebook_id) REFERENCES notebooks(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX notes_idx_notebook_id ON notes (notebook_id);
COMMIT;
