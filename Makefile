IMAGE = aaqua/web-e2e-prod
TAG := latest

build:
	docker build -t $(IMAGE):$(TAG) .
	docker volume create aaqua-web-e2e-prod_cache
	docker volume create aaqua-web-e2e-prod_npm

clean:
	docker image rm -f $(IMAGE):$(TAG)
	docker volume rm -f aaqua-web-e2e-prod_cache
	docker volume rm -f aaqua-web-e2e-prod_npm

shell:
	docker run -it --rm \
	-h web-e2e-prod \
	-v ~/.npmrc:/home/circleci/project/.npmrc \
	-v aaqua-web-e2e-prod_cache:/home/circleci/.cache \
	-v aaqua-web-e2e-prod_npm:/home/circleci/.npm \
	$(IMAGE):$(TAG)

.DEFAULT_GOAL := build
