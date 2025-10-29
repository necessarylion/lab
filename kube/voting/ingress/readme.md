# Deploying NGINX Ingress + HTTPS on AKS (with Let’s Encrypt)

This guide summarizes all CLI steps we used to deploy an application in Azure Kubernetes Service (AKS) with NGINX Ingress, custom domain, and HTTPS via Let’s Encrypt — without changing the app code.

## Install NGINX Ingress Controller

installs NGINX ingress controller and exposes it through an Azure LoadBalancer

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx \
 --create-namespace \
 --namespace ingress-nginx \
 --set controller.publishService.enabled=true
```

### 🌐 2. Get the Ingress External IP

retrieve the LoadBalancer external IP to use in DNS (e.g., 20.247.232.66)

```bash
kubectl get svc -n ingress-nginx
```

### 🧭 3. Point Your Domain to the IP

Create an A record in your DNS provider (Azure DNS, Cloudflare, etc.):
To connects your domain (kube-nginx.dartondox.dev) to the AKS ingress.

| Type | Host       | IP            |
| ---- | ---------- | ------------- |
| A    | kube-nginx | 20.247.232.66 |

### 🧩 4. Deploy Your Application and Services

Why: deploys backend services (vote, result, etc.) inside the cluster.

```bash
kubectl apply -f <your-app-deployment-and-service>.yaml
```

### ⚙️ 5. Verify All Services Are Healthy

Why: ensures each service has running pods and reachable endpoints.

```bash
kubectl get svc -n voting
kubectl get endpoints -n voting
```

### 🧱 6. Test Internal Connectivity

Why: checks if the ingress controller is responding inside the cluster.

```bash
kubectl run -it curl --image=curlimages/curl --rm --restart=Never -n ingress-nginx \
 -- curl -v http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
```

### ⚡ 7. Fix Azure LoadBalancer Health Probe

Why: allows Azure’s health probe to mark the ingress as healthy so external traffic works.

```bash
kubectl annotate svc ingress-nginx-controller -n ingress-nginx \
 "service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path=/healthz" \
 --overwrite
kubectl rollout restart deployment ingress-nginx-controller -n ingress-nginx
```

### ☁️ 8. Reuse Existing Public IP (to bypass quota limits)

Why: reuses an existing Azure Public IP instead of creating a new one, avoiding quota errors.

```bash
kubectl annotate svc ingress-nginx-controller -n ingress-nginx \
 "service.beta.kubernetes.io/azure-load-balancer-resource-group=lab_infra_rg" \
 "service.beta.kubernetes.io/azure-pip-name=kubernetes-a2a457ac1cea34c26856ce19c18ab34c" \
 --overwrite
kubectl rollout restart deployment ingress-nginx-controller -n ingress-nginx
```

### 🔐 9. Install cert-manager for HTTPS using IOC registry directly

Why: installs cert-manager, which handles automatic TLS certificates via Let’s Encrypt.

```bash
helm install cert-manager oci://quay.io/jetstack/charts/cert-manager \
  --version v1.19.1 \
  --namespace cert-manager \
  --create-namespace \
  --set crds.enabled=true
```

### 🧾 10. Create ClusterIssuer

Why: registers a global Let’s Encrypt ACME issuer used for automatic certificate requests.

```bash
kubectl apply -f cert.yaml
```

### 🔄 11. Apply Ingress with TLS

Why: enables HTTPS with automatic TLS from Let’s Encrypt and routes requests by host/path.

```bash
kubectl apply -f voting-ingress.yaml
```

### 🔍 12. Verify Certificates

Why: confirms the TLS certificate was issued and stored as a Kubernetes secret.

```bash
# get list of certificate issuers
kubectl get clusterissuer

# get all certificates
kubectl get certificate -n voting

# get specific certificate
kubectl describe certificate {name} -n voting
```

### ✅ 13. Final Verification

Why: ensures ingress, services, and controllers are running and healthy.

```bash
kubectl get ingress -n voting
kubectl get svc -n ingress-nginx
kubectl get pods -n ingress-nginx
```

#### 💡 Notes

All DNS records must point to the ingress external IP.
Let’s Encrypt certs auto-renew every 90 days.
Always test HTTP → HTTPS redirect after enabling TLS.
Regex rewrite annotations are essential for apps using absolute paths.
