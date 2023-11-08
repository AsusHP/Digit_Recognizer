FROM python:3.10

RUN apt-get update && apt-get install -y libgl1-mesa-glx

WORKDIR /app

COPY ./deploy /app

RUN pip install --no-cache-dir -r requirements.txt

CMD ["gunicorn", "-b", "0.0.0.0:7860", "app:app"]
