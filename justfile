#!/usr/bin/env just --justfile
# https://github.com/casey/just

set shell := ["bash", "-uc"]

_default:
	@just --dump



install:
	fd -tf -e ts -E '*.d.ts' -X deno cache --unstable --no-check --reload

run:
	-@fd -tf -e ts -E '*.d.ts' -X deno cache --unstable --no-check
	-@fd -tf -e ts -E '*.d.ts' -x deno cache --unstable
	-@deno run --unstable --no-check --allow-all src/mod.ts
watch:
	watchexec --clear --restart --watch=src --exts=ts --shell=bash -- 'echo -e "█ \n" && just run'

serve:
	miniserve --header 'Cache-Control: no-cache, no-store, must-revalidate' --interfaces=127.0.0.1 --port=14023 dist
