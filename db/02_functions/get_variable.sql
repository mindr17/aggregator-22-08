-- SELECT * FROM get_variable('lastSyncDate');
CREATE OR REPLACE FUNCTION get_variable(variableName VARCHAR)
RETURNS VARCHAR
AS $$
  SELECT MAX(value)
  FROM variables
  WHERE name = variableName;
$$ LANGUAGE SQL;