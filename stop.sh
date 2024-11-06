#!/bin/bash

set -e

if ! command -v docker &>/dev/null; then
  echo "Error: docker is not installed"
  exit 1
fi

if ! docker compose version &>/dev/null; then
  echo "Error: docker compose is not available"
  exit 1
fi

if [ ! -f "docker-compose.yml" ]; then
  echo "Error: docker-compose.yml file not found"
  exit 1
fi

if ! docker info &>/dev/null; then
  echo "Error: Docker daemon is not running"
  exit 1
fi

echo "Stopping containers..."

if docker compose down; then
  echo "Containers stopped and removed successfully"
else
  echo "Failed to stop containers"
  exit 1
fi
