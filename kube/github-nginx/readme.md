# Nginx image

## Build

```bash
docker build -t ghcr.io/necessarylion/lab:nginx .
```

## Docker login

```bash
echo {PAT} | docker login ghcr.io -u necessarylion --password-stdin
```

## Push

```bash
docker push ghcr.io/necessarylion/lab:nginx
```

## Create dockerconfigjson to add in secret

please note that we do not need to encode base64 for the object

```bash
echo -n '{"auths":{"ghcr.io":{"username":"<USERNAME>","password":"<PAT>","auth":"'"$(echo -n '<USERNAME>:<PAT>' | base64)"'"}}}'

```
