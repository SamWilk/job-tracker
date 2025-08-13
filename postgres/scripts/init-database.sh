#!/bin/bash

# ==============================
# Run all .sql files in subfolders against Postgres
# ==============================

# Load variables from .env file (must contain PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE)
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo "❌ No .env file found. Please create one with PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE."
  exit 1
fi

# Directory containing the SQL files (change if needed)
SQL_DIR="../sql-scripts"


# Check if directory exists
if [ ! -d "$SQL_DIR" ]; then
  echo "❌ Directory $SQL_DIR not found."
  exit 1
fi

# Loop through all .sql files in subdirectories
find "$SQL_DIR" -type f -name "*.sql" | sort | while read -r sql_file; do
  echo "▶️ Running: $sql_file"
  PGPASSWORD="$PGPASSWORD" \
psql \
  --host="$PGHOST" \
  --port="${PGPORT:-5432}" \
  --username="$PGUSER" \
  --dbname="$PGDATABASE" \
  --file="$sql_file" 


  if [ $? -ne 0 ]; then
    echo "❌ Error executing $sql_file"
    exit 1
  fi
done

echo "✅ All SQL scripts executed."
