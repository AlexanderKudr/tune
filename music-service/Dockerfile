FROM python:3.12.2-slim
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY . .

RUN pip install --upgrade pip
RUN pip install pipenv

COPY Pipfile .
COPY Pipfile.lock .

RUN pipenv install
RUN pipenv install --pre yt-dlp

WORKDIR /app/src

CMD ["pipenv", "run", "server"]