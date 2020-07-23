FROM python:3.7-slim-buster

ENV PYTHONUNBUFFERED 1

RUN apt-get update \
  # dependencies for building Python packages and some others
  && apt-get install -y build-essential python3-dev python3-setuptools \
  # psycopg2 dependencies
  && apt-get install -y libpq-dev \
  # pillow dependencies
  && apt-get install -y libjpeg-dev zlib1g-dev \
  # memcached dependencies
  && apt-get install -y libmemcached-dev \
  # libffi for cffi
  && apt-get install -y libffi-dev \
  # libs for pycurl
  && apt-get install -y libcurl4-openssl-dev libssl-dev libpython3.7-dev libnss3 libnss3-dev \
  # Translations dependencies
  && apt-get install -y gettext \
  # cleaning up unused files
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

RUN addgroup --system django \
    && adduser --system --ingroup django django

# Requirements are installed here to ensure they will be cached.
COPY requirements.txt /requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY ./compose/production/django/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint
RUN chown django /entrypoint

COPY ./compose/production/django/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start
RUN chown django /start

COPY --chown=django:django . /app

USER django

WORKDIR /app

ENTRYPOINT ["/entrypoint"]
