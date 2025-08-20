.PHONY: build run logs stop clean

build:
	docker compose build

run:
	docker compose up -d

logs:
	docker compose logs -f app

stop:
	docker compose down

clean:
	docker compose down -v --remove-orphans
	docker image prune -f