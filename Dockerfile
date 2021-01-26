FROM node:alpine AS builder
RUN npm i -g typescript react-scripts
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM node:alpine
COPY --from=builder /app/build /app
RUN npm install -g serve
CMD serve /app