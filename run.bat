docker rmi sjps-web-admin
docker image prune
docker build -t sjpswebadmin-v2 .
docker images
docker stop sjps-web-admin-site
docker container prune
docker run --name "sjps-web-admin-site" -d -p 4003:80 sjpswebadmin-v2
docker ps
curl localhost:4003
