# to support multi platform
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t ajzinkyaw/web2print:latest \
  --push .
