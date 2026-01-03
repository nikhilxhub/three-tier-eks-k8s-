# Building and Orchestrating a Three-Tier Application with Docker and Kubernetes

A practical project demonstrating a three-tier application consisting of a **Frontend**, a **Backend (API)**, and a **MongoDB** database. This project takes you from local containerization to full-scale Kubernetes orchestration.

## 📚 Read the Full Guide on Medium
For a detailed explanation of this project, check out the accompanying blog post:
**[Building and Orchestrating a Three-Tier Application with Docker and Kubernetes](https://medium.com/@no-non-sense-guy/building-and-orchestrating-a-three-tier-application-with-docker-and-kubernetes-9b672c25ebfa)**

---

## 1. Project Flow & Architecture

The project follows a classic three-tier architecture:

1.  **Frontend**: A React/Vite-based UI that users interact with.
2.  **Backend**: A Node.js API that handles business logic and communicates with the database.
3.  **Database**: MongoDB for persistent data storage.

**The Data Flow**:
User interacts with **Frontend** -> Frontend calls **Backend** API (e.g., `POST /todo`) -> Backend authenticates and writes to **MongoDB** -> MongoDB acknowledges -> Backend returns response to Frontend.

---

## 2. Containerization: Dockerfiles

Before running on Kubernetes, the services are containerized using Docker.

### Backend Dockerfile (`./app/backend/Dockerfile`)
The backend uses a multi-stage build to optimize image size and caching:
- **Base**: Node 18 Alpine.
- **Install**: Installs dependencies (using `pnpm` for speed).
- **Build**: Compiles the TypeScript/JS code.
- **Run**: Starts the production server.

### Frontend Dockerfile (`./app/frontend/Dockerfile`)
The frontend is built purely for development in this example (`npm run dev`), but can easily be adapted for production using Nginx.

---

## 3. Usage: Docker Compose (Local Development)

This project includes a `docker-compose.yml` file for quick local testing.

**Why Docker Compose?**
It’s perfect for **local development**. With one command, you can spin up the entire stack.

```bash
docker-compose up --build
```

**Why not use it for production?**
Docker Compose manages containers on a **single machine**. For production reliability, scaling, and auto-healing, we use **Kubernetes**.

---

## 4. Kubernetes Orchestration

The core of this project lies in the Kubernetes manifests found in the `ks8-manifests/` directory.

### The Database Layer (MongoDB)
Located in `ks8-manifests/mongo/`:
- **Secrets (`secrets.yaml`)**: Stores sensitive data like `username` and `password` safely (base64 encoded).
- **Deployment (`deploy.yaml`)**: Manages the Mongo pod.
- **Service (`service.yaml`)**: Exposes Mongo to the backend application within the cluster.

### The Application Layer (Backend & Frontend)
- **Backend Deployment**: Runs the Node.js API with multiple replicas for high availability. 
    - Connects to Mongo using the connection string `mongodb://mongodb-svc:27017/todo`.
- **Frontend Deployment**: Runs the React app.
- **Services**: `ClusterIP` services are used to expose the backend and frontend internally.

### Pro Tip: `apps/v1` vs `v1`
- **`v1`**: Core API group (Pods, Services, ConfigMaps).
- **`apps/v1`**: "Apps" API group (Deployments, StatefulSets).

---

## 5. Deployment Guide (Cloud)

To deploy this to a cloud provider like AWS (EKS), GCP (GKE), or DigitalOcean:

1.  **Push Images to Docker Hub**:
    ```bash
    docker login
    docker build -t your-username/backend-api:v1 ./app/backend
    docker build -t your-username/frontend:v1 ./app/frontend
    docker push your-username/backend-api:v1
    docker push your-username/frontend:v1
    ```
    *Note: Update the image names in the deployment manifests to match your Docker Hub repository.*

2.  **Connect `kubectl`**:
    Configure your local `kubectl` to point to your cloud cluster.

3.  **Create Namespace**:
    ```bash
    kubectl create namespace workshop
    ```

4.  **Apply Secrets & Database**:
    ```bash
    kubectl apply -f ks8-manifests/mongo/secrets.yaml
    kubectl apply -f ks8-manifests/mongo/
    ```

5.  **Apply Application Components**:
    ```bash
    kubectl apply -f ks8-manifests/
    ```

6.  **Expose to Internet**:
    - Change the frontend service type to `LoadBalancer` in `ks8-manifests/frontend-service.yaml`.
    - Apply the change: `kubectl apply -f ks8-manifests/frontend-service.yaml`.
    - Get the external IP: `kubectl get svc -n workshop`.

---

## Summary

This project demonstrates how to:
- Containerize a multi-tier application.
- Orchestrate services using Kubernetes.
- Manage secrets and configuration.
- Bridge the gap between local Docker Compose development and scalable cloud deployment.
