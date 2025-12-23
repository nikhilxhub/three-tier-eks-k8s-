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


Pro Tip: You don't actually have to type them one by one! You can run this command to apply everything in the folder at once, and Kubernetes will figure it out:--->  " kubectl apply -f ."

in backend-deployment.yaml in line 26.. it is image of backend from(dockerhub)