from celery import Celery

# Use Redis inside Docker network
celery_app = Celery(
    "celery_worker",
    broker="redis://redis:6379/0",  # Docker container name for Redis
    backend="redis://redis:6379/0"
)

import process_task

if __name__ == "__main__":
    celery_app.start()
