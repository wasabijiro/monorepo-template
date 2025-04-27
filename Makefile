dev:
	bun run dev

build:
	bun run build

format:
	bun run format

lint:
	bun run lint

typecheck:
	bun run typecheck

checkall: format lint typecheck
