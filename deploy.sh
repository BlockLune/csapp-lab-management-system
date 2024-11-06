#!/bin/bash

generate_random_string() {
  length=$1
  openssl rand -hex $((length / 2))
}

if ! command -v openssl &>/dev/null; then
  echo "Error: OpenSSL is not installed. Please install OpenSSL first."
  exit 1
fi

if [ -f ".env" ]; then
  echo "The .env configuration file already exists!"
else
  echo "Generating secure credentials using OpenSSL..."

  cat >.env <<EOF
CSAPP_LAB_MANAGEMENT_SYSTEM_POSTGRES_DB=csapp_lab_management_system
CSAPP_LAB_MANAGEMENT_SYSTEM_POSTGRES_USER=postgres
CSAPP_LAB_MANAGEMENT_SYSTEM_POSTGRES_PASSWORD=$(generate_random_string 32)

CSAPP_LAB_MANAGEMENT_SYSTEM_MINIO_ROOT_USER=minioadmin
CSAPP_LAB_MANAGEMENT_SYSTEM_MINIO_ROOT_PASSWORD=$(generate_random_string 32)
CSAPP_LAB_MANAGEMENT_SYSTEM_MINIO_ACCESS_KEY_ID=$(generate_random_string 20)
CSAPP_LAB_MANAGEMENT_SYSTEM_MINIO_SECRET_ACCESS_KEY=$(generate_random_string 32)
CSAPP_LAB_MANAGEMENT_SYSTEM_MINIO_BUCKET_NAME=csapp-lab-management-system

CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_USERNAME=teacher
CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_PASSWORD=$(generate_random_string 16)
EOF

  chmod 600 .env

  cp .env .env.backup
  chmod 600 .env.backup

  echo "Environment configuration file has been generated!"
  echo "Please check the .env file for configuration details"
  echo "Backup file has been saved as .env.backup"
  echo "Please keep these credentials safe!"

  echo "Initial Teacher Account Information:"
  echo "Username: $(grep CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_USERNAME .env | cut -d= -f2)"
  echo "Password: $(grep CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_PASSWORD .env | cut -d= -f2)"
fi
