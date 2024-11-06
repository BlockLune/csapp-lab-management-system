# CSAPP Lab Management System

This is a hands-on project from NJUPT's practice week. During this week I built a lab management system using Spring & NextJS.

## Architecture

I built the backend, a RESTful API service, using Spring Boot. The API is protected with Spring Security and uses basic authentication and JWT. I use PostgreSQL as the database where I store information about labs, system users and their roles (teacher, student). The system uses an S3-compatible service to store lab materials and student solutions.

I built the frontend with NextJS. I use the Radix UI library to build components, Formik to handle forms, and Framer Motion for some animations.

## Deployment

### Backend

As mentioned above, the system uses PostgreSQL and an S3-compatible service. The design gives the system a high degree of flexibility. If you want to use your own services, please check out and modify the environment variables in the `.env' file of the backend project.

I also provide a `docker-compose.yml` file to deploy the system completely locally. It will start a local PostgreSQL server and a MinIO server. Here are the steps:

Before you start, make sure you have Docker installed on your machine. See the Docker [documentation](https://docs.docker.com/engine/install/) for installation instructions.

Create a directory for the backend project and run the following command to download the `docker-compose.yml` file:

```bash
curl -fsSL https://raw.githubusercontent.com/BlockLune/csapp-lab-management-system/refs/heads/main/docker-compose.yml
```

In the same directory, create an `.env` file with the following content

```text
CSAPP_LAB_MANAGEMENT_SYSTEM_POSTGRES_DB=
CSAPP_LAB_MANAGEMENT_SYSTEM_POSTGRES_USER=
CSAPP_LAB_MANAGEMENT_SYSTEM_POSTGRES_PASSWORD=

CSAPP_LAB_MANAGEMENT_SYSTEM_MINIO_ROOT_USER=
CSAPP_LAB_MANAGEMENT_SYSTEM_MINIO_ROOT_PASSWORD=
CSAPP_LAB_MANAGEMENT_SYSTEM_MINIO_ACCESS_KEY_ID=
CSAPP_LAB_MANAGEMENT_SYSTEM_MINIO_SECRET_ACCESS_KEY=
CSAPP_LAB_MANAGEMENT_SYSTEM_MINIO_BUCKET_NAME=

CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_USERNAME=
CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_PASSWORD=
```

And then run the following command to start

```bash
docker-compose up -d
```

As you can see, there are a lot of credentials to fill in the `.env` file. I provide a script to generate these credentials. Run the following command to download the script:

```bash
curl -fsSL https://raw.githubusercontent.com/BlockLune/csapp-lab-management-system/refs/heads/main/deploy.sh
```

I also provide a script to start the services:

```bash
curl -fsSL https://raw.githubusercontent.com/BlockLune/csapp-lab-management-system/refs/heads/main/start.sh
```

And to stop the services:

```bash
curl -fsSL https://raw.githubusercontent.com/BlockLune/csapp-lab-management-system/refs/heads/main/stop.sh
```

### Frontend

The frontend is a standard NextJS project. Check out the [NextJS documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more information.

## Development Notes

- File structure in S3-Compatible Service:

```text
labs/
└── {labId}/
    ├── materials/
    │   └── {fileName}
    └── solutions/
        └── {studentId}/
            └── {fileName}
```

- Error / exception handling are done in the `GlobalExceptionHandler`.
- Basically the `deleteFile` interface of the OSS service always returns 200 (OK), since if the file exists, it will be deleted, and if it doesn't exist, it is some kind of "deleted".
- MinIO needs path-style access.
