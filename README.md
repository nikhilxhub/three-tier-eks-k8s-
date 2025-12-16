# three-tier-eks-k8s-
docker build -t my-app .
docker run -p 3000:3000 my-app
docker logs <container_id>

docker images

docker compose up --build


push to registry

docker tag my-backend:latest my-dockerhub-username/my-backend:latest
docker push my-dockerhub-username/my-backend:latest

docker tag my-frontend:latest my-dockerhub-username/my-frontend:latest
docker push my-dockerhub-username/my-frontend:latest
