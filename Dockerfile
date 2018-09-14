# Use base image for device arch with node installed
FROM resin/raspberrypi3-node

RUN apt-get update && apt-get install libcairo2-dev

# create src dir
RUN mkdir -p /usr/src/app/

# set as WORKDIR
WORKDIR /usr/src/app

# Only package.json and pre-install script here for caching purposes
COPY package.json ./

#install node dependencies
RUN JOBS=MAX npm install --production --unsafe-perm && npm cache verify && rm -rf /tmp/*

# Copy all of files here for caching purposes
COPY /src/server ./

# Copy client files
COPY /src/client/ ./wwwroot

RUN chmod +x ./start.sh

# npm start will run server.js by default
CMD ["./start.sh"]
