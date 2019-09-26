FROM google/cloud-sdk:264.0.0-alpine

COPY entrypoint.sh /entrypoint.sh
COPY ./tools-kanziw-dev-deploy-keys.json /tools-kanziw-dev-deploy-keys.json

ENTRYPOINT ["/entrypoint.sh"]
