-- Convert schema '/Users/ynonperek/WebstormProjects/test/leumi/04/Menotes/share/migrations/_source/deploy/3/001-auto.yml' to '/Users/ynonperek/WebstormProjects/test/leumi/04/Menotes/share/migrations/_source/deploy/4/001-auto.yml':;

;
BEGIN;

;
CREATE TABLE notebooks (
  id INTEGER PRIMARY KEY NOT NULL,
  name text NOT NULL
);

;
CREATE TABLE notes (
  id INTEGER PRIMARY KEY NOT NULL,
  notebook_id integer NOT NULL,
  title text NOT NULL,
  text text NOT NULL,
  FOREIGN KEY (notebook_id) REFERENCES notebooks(id) ON DELETE CASCADE ON UPDATE CASCADE
);

;
CREATE INDEX notes_idx_notebook_id ON notes (notebook_id);

;

COMMIT;

