# CSAPP Lab Management System

This is a hands-on project from NJUPT's practice week. During this week I built a lab management system using Spring & NextJS.

## Architecture

### Back end

I built the backend, a RESTful API service, using Spring Boot. The API is protected with Spring Security and uses basic authentication and JWT. I use PostgreSQL as the database where I store information about labs, system users and their roles (teacher, student). The system uses an S3-compatible service to store lab materials and student solutions.

### Front end

I built the frontend with NextJS. I use the Radix UI library to build components, Formik to handle forms, and Framer Motion for some animations.

## Configuration

As mentioned above, the system uses PostgreSQL and an S3-compatible service. The design gives the system a high degree of flexibility. If you want to test locally, you can use Docker to start these services.

1. PostgreSQL

Create the container with:

```bash
docker run --rm --name postgres-server -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

A database named with `csapp_db` is required. You can use the following command to create it:

```bash
psql -U postgres --host=localhost --port=5432
```

```sql
CREATE DATABASE csapp_db;
```

2. Any S3-Compatible Service

The command below starts a MinIO server, which is an open-source S3-compatible service:

```bash
docker run --rm --name minio-server -p 9000:9000 -p 9001:9001 quay.io/minio/minio server /data --console-address ":9001"
```

Open the console at `http://localhost:9001` and create a bucket. Also prepare an access key and a secret key.

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
