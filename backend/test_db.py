from sqlalchemy import text
from app.db.connection import engine

try:
    with engine.connect() as connection:
        result = connection.execute(text("select version();"))

        print(result.fetchone())
        print("\n Database connection sucess")

except Exception as e:
    print(e)        