# FROM node:alpine
# WORKDIR /app
# COPY . .
# WORKDIR /app/my-app
# RUN npm install
# RUN npm install react-scripts
# EXPOSE 3000
# # CMD ["npm", "start" ]
# #CMD npm start 0.0.0.0:3000
# CMD ['npm', 'start']

# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /app

COPY package.json ./
RUN npm install
EXPOSE 3000
COPY . .
CMD npm start 0.0.0.0:3000