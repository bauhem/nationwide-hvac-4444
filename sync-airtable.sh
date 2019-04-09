#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

export $(grep -v '^#' "$DIR"/.env | xargs)
node "$DIR"/airtable-cli.js