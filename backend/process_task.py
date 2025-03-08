from celery_worker import celery_app

@celery_app.task
def dummy_task(x, y):
    return x + y
