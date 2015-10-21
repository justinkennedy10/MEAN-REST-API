apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list

apt-get update

apt-get install -y mongodb-org

service mongod start

apt-get update

apt-get install nodejs

apt-get install npm

nodejs server.js
