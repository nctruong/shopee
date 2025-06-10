# Kubernetes Dashboard

## Install
https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/
```
# Add kubernetes-dashboard repository
helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
# Deploy a Helm Release named "kubernetes-dashboard" using the kubernetes-dashboard chart
helm upgrade --install kubernetes-dashboard kubernetes-dashboard/kubernetes-dashboard --create-namespace --namespace kubernetes-dashboard
```

Forward `kubectl -n kubernetes-dashboard port-forward svc/kubernetes-dashboard-kong-proxy 8443:443`
Create service account to log in:
```
kubectl create serviceaccount kubeui
kubectl create token kubeui
kubectl create clusterrolebinding kubeui \
  --clusterrole=cluster-admin \
  --serviceaccount=default:kubeui
```
