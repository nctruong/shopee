
## Commands
### Docker build
``` 
docker build -t willnguyen/auth-service .
```
### Publish NPM 
```
npm version patch

npm publish --access public 
npm unpublish @willnguyen/common --force
```

### Kafka
```
kubectl exec -it kafka-c56c74c6d-bnf7w -- /bin/bash
/opt/bitnami/kafka/bin/kafka-topics.sh --create --topic shopee --bootstrap-server localhost:9092

/opt/bitnami/kafka/bin/kafka-console-consumer.sh --topic product.created --from-beginning --bootstrap-server localhost:9092

```

### Debug
```
kubectl exec -it prometheus-9b998bffb-rjmjt -n monitoring -- /bin/sh
kubectl delete pod -l app=prometheus -n monitoring
```
## Ingress
https://kubernetes.github.io/ingress-nginx/deploy/#quick-start

## Integrate Tailwindcss
https://tailwindcss.com/docs/installation/framework-guides/nextjs
