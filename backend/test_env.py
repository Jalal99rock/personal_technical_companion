from dotenv import load_dotenv
import os

load_dotenv()

print("DJANGO_SECRET_KEY:", os.getenv('DJANGO_SECRET_KEY'))
print("DB_NAME:", os.getenv('DB_NAME'))
print("All environment variables loaded successfully!")