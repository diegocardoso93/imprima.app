FROM python:3.7.10-alpine3.13 as base

# FROM base as builder
RUN apk add --virtual .build-deps gcc libc-dev g++ jpeg-dev zlib-dev musl-dev libffi-dev openssl-dev make postgresql-dev gfortran openblas-dev lapack-dev \
    mariadb-dev postgresql-libs hdf5-dev
RUN pip install mysqlclient
ENV CRYPTOGRAPHY_DONT_BUILD_RUST=1
RUN pip install poetry
COPY . /src/
WORKDIR /src
RUN python3 -m venv /env && . /env/bin/activate && python3 -m pip install --upgrade pip && pip install setuptools wheel && poetry install -vvv

# FROM base
# COPY --from=builder /env /env
# COPY --from=builder /src /src
# WORKDIR /src
CMD ["/env/bin/gunicorn", "plata.asgi:app", "-b", "0.0.0.0:80", "-k", "uvicorn.workers.UvicornWorker"]
