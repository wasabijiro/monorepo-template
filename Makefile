install:
	@echo "Installing dependencies for all packages..."
	@bun install
	@echo "Installing dependencies for apps/api..."
	@cd apps/api && bun install
	@echo "Installing dependencies for apps/web..."
	@cd apps/web && bun install
	@echo "Installing dependencies for packages/sui..."
	@cd packages/sui && bun install
	@echo "Installing dependencies for packages/logger..."
	@cd packages/logger && bun install
	@echo "All installations completed."

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
