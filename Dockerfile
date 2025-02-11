# Stage de build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build

# Stage final
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
COPY .env ./

# Swagger docs
COPY ./src/routes ./src/routes

# Sequelize
COPY .sequelizerc ./
COPY ./src/database ./src/database

RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
