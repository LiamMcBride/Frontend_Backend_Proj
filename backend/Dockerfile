FROM python:3
WORKDIR /app
RUN apt update
RUN pip install poetry
COPY poetry.lock .
COPY pyproject.toml .
RUN poetry install
COPY . .
WORKDIR /app/DjangoRestAPI
EXPOSE 8000
CMD poetry run ./manage.py runserver 0.0.0.0:8000