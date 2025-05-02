PROJECT_NAME=monorepo-template-web

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

create-package:
  @read -p "Enter package name: " pkg_name; \
  ./scripts/create-package.sh $$pkg_name

shadcn-add:
  @read -p "Enter component name: " component_name; \
  cd packages/shadcn && bunx --bun shadcn@canary add $$component_name

pages-build:
  bun run pages:build

pages-preview:
  bun run pages:preview

pages-deploy:
  bun run pages:deploy --project-name $(PROJECT_NAME)
