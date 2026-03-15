docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -f Dockerfile.slim \
  -t ajzinkyaw/web2print:slim \
  --push .
