from celery import Celery

# Configure Celery: Redis is the broker, and MongoDB is used as the result backend.
celery_app = Celery(
    "worker",
    broker="redis://redis:6379/0",
    backend="mongodb://mongo:27017/celery_results"
)

@celery_app.task
def dummy_task(x, y):
    return x + y
