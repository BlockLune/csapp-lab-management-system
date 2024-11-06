#!/bin/bash

set -e

if [ ! -f ".env" ]; then
  echo "Error: .env configuration file not found"
  echo "Note: you can run deploy.sh to generate the .env file"
  exit 1
fi

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

echo "Starting containers..."

if docker compose up -d; then
  echo "Containers started successfully"

  echo -e "\nRunning containers:"
  docker compose ps
else
  echo "Failed to start containers"
  exit 1
fi
