default:
    @just --list

install:
    pnpm install

dev:
    pnpm dev

build:
    pnpm build

preview: build
    pnpm preview

lint:
    pnpm lint

format:
    pnpm format
