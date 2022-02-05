#!/usr/bin/env just --justfile
# https://github.com/casey/just

set shell := ["bash", "-uc"]
set dotenv-load := true

_default:
	@just --dump



install:
	fd -tf -e ts -E '*.d.ts' -X deno cache --unstable --no-check --reload

run:
	@fd -tf -e ts -E '*.d.ts' -X deno cache --unstable --no-check || true
	@echo "█ "
	@fd -tf -e ts -E '*.d.ts' -x deno cache --unstable || true; echo
	@deno run --unstable --no-check --allow-all src/mod.ts
watch:
	watchexec --clear --restart --watch=src --exts=ts -- just run
