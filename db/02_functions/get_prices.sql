-- SELECT * FROM get_prices('2022-08-08 04:05:06');
CREATE OR REPLACE FUNCTION get_prices(startdate TIMESTAMP)
RETURNS SETOF prices
AS $$
BEGIN
  RETURN query
    SELECT *
    FROM prices
    WHERE date >= startdate;
END
$$ LANGUAGE plpgsql;