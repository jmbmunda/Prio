# Makefile for Docker-based Next.js development

dev:
	docker-compose -f docker-compose.dev.yml up

build:	
	docker-compose -f docker-compose.dev.yml up --build

stop:
	docker-compose -f docker-compose.dev.yml down

rebuild:
	docker-compose -f docker-compose.dev.yml up --build --force-recreate

logs:
	docker-compose -f docker-compose.dev.yml logs -f

clean:
	docker-compose -f docker-compose.dev.yml down --volumes --remove-orphans
