#!/bin/bash

generate_random_string() {
    length=$1
    tr -dc 'A-Za-z0-9!@#$%^&*()_+' < /dev/urandom | head -c $length
}

generate_username() {
    length=$1
    tr -dc 'a-z0-9' < /dev/urandom | head -c $length
}

cat > .env << EOF
# PostgreSQL Configuration
CSAPP_LAB_MANAGEMENT_SYSTEM_POSTGRES_DB=csapp_lab_management_system
CSAPP_LAB_MANAGEMENT_SYSTEM_POSTGRES_USER=$(generate_username 8)
CSAPP_LAB_MANAGEMENT_SYSTEM_POSTGRES_PASSWORD=$(generate_random_string 32)

# MinIO Configuration
CSAPP_LAB_MANAGEMENT_SYSTEM_MINIO_ROOT_USER=$(generate_username 8)
CSAPP_LAB_MANAGEMENT_SYSTEM_MINIO_ROOT_PASSWORD=$(generate_random_string 32)
CSAPP_LAB_MANAGEMENT_SYSTEM_MINIO_ACCESS_KEY_ID=$(generate_random_string 20)
CSAPP_LAB_MANAGEMENT_SYSTEM_MINIO_SECRET_ACCESS_KEY=$(generate_random_string 32)
CSAPP_LAB_MANAGEMENT_SYSTEM_MINIO_BUCKET_NAME=csapp-lab-management-system

# Initial Teacher Account Configuration
CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_USERNAME=teacher
CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_PASSWORD=$(generate_random_string 16)
EOF

chmod 600 .env

echo "Environment configuration file has been generated!"
echo "Please check the .env file for configuration details"
echo "Please keep these credentials safe!"

if [ -f "docker-compose.yml" ]; then
    echo "Do you want to start the services? (y/n)"
    read -r response
    if [ "$response" = "y" ]; then
        docker-compose up -d
        echo "Services have been started!"
    fi
fi

echo "Initial Teacher Account Information:"
echo "Username: $(grep CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_USERNAME .env | cut -d= -f2)"
echo "Password: $(grep CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_PASSWORD .env | cut -d= -f2)"

