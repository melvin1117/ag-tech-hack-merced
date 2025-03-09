# Use Python 3.11.9 slim version for a smaller image size
FROM python:3.11.9-slim

# Set the working directory inside the container
WORKDIR /app

# Install required system dependencies for OpenCV and Redis support
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Start FastAPI (uvicorn) and Celery worker concurrently inside the container
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port 8000 & celery -A celery_worker.celery_app worker --loglevel=info"]
