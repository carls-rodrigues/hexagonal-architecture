FROM node:16.9.0

WORKDIR /app/src
ENV PATH="/app/bin:${PATH}"

RUN apt-get update

CMD ["tail", "-f", "/dev/null"]