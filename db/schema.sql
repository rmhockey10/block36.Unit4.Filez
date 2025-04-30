-- TODO
--this deletes the table if it currenlty exists
DROP TABLE IF EXISTS  folders CASCADE;
DROP TABLE IF EXISTS files;

\echo Creating table named folders...
CREATE TABLE folders (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

\echo Creating table named files...
CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    size INTEGER NOT NULL,
    folder_id INTEGER NOT NULL REFERENCES folders (id) ON DELETE CASCADE,
    UNIQUE (name, folder_id)
);

--REFERENCES is the syntax used to designate this table's column as the foreign key to the other table.
--The name that comes after REFERENCES is the name of the table it links to and following that are
--parenthesis which hold the column's name it's linked to.
-- ON DELETE CASCADE is the syntax used to delete everything in the foreign key's table when the main
--table gets deleted.