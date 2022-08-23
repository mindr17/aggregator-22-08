-- SELECT * FROM get_news('2022-08-08 04:05:06');
CREATE OR REPLACE FUNCTION get_news(startdate TIMESTAMP)
RETURNS SETOF news
AS $$
BEGIN
  RETURN query
    SELECT *
    FROM news
    WHERE date >= startdate;
END
$$ LANGUAGE plpgsql;