FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8-slim

RUN apt-get update && apt-get install -y curl gcc libc-dev libjpeg-dev default-libmysqlclient-dev libssl-dev cython libpq-dev;
# Install Poetry
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

# Copy using poetry.lock* in case it doesn't exist yet
COPY ./pyproject.toml ./alembic.ini ./poetry.lock* /app/

RUN poetry install --no-root --no-dev

COPY ./app /app/app
COPY ./migrations /app/migrations


# FROM python:3.8-slim as base

# # FROM base as builder
# RUN apt-get update && apt-get install gcc libc-dev g++ libjpeg-dev libzlib-dev libffi-dev libopenssl-dev make libpostgresql-dev gfortran libopenblas-dev liblapack-dev \
#     libmariadb-dev libpostgresql-libs libhdf5-dev
# RUN pip install mysqlclient
# ENV CRYPTOGRAPHY_DONT_BUILD_RUST=1
# RUN pip install poetry
# COPY . /src/
# WORKDIR /src
# RUN python3 -m venv /env && . /env/bin/activate && python3 -m pip install --upgrade pip && pip install cython && pip install setuptools wheel && poetry install -vvv

# # FROM base
# # COPY --from=builder /env /env
# # COPY --from=builder /src /src
# # WORKDIR /src
# CMD ["/env/bin/gunicorn", "plata.asgi:app", "-b", "0.0.0.0:80", "-k", "uvicorn.workers.UvicornWorker"]
