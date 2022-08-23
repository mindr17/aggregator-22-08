The following is an instruction how to deploy business data database.

1. Install PostgreSQL.
2. Install PostgreSQL Explorer extension to VSC.
3. Open PSQL shell and run the following:
   SELECT 'CREATE DATABASE aggregator' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'aggregator')\gexec
4. Open Query window in PSQLE on server and run sql file contents in the following order (F5 to run SQL):
   01_tables
   02_functions