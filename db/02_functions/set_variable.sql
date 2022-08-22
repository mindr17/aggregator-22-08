-- CALL set_variable('lastSyncDate', '2022-08-08 04:05:06');
CREATE OR REPLACE PROCEDURE set_variable(name VARCHAR, value VARCHAR)
AS $$
  INSERT INTO variables VALUES
  (DEFAULT, name, value)
  ON CONFLICT (name) DO UPDATE 
    SET value = excluded.value;
$$ LANGUAGE SQL;