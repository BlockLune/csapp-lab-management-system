# CSAPP Lab Management System

This is a hands-on project from NJUPT's practice week. During this week I built a lab management system using Spring & NextJS.

![Student Dashboard](./docs/images/student-dashboard.webp)

[(Click here to see the gallery)](./docs/gallery.md)

## Architecture

I built the backend, a RESTful API service, using Spring Boot. The API is protected with Spring Security and uses basic authentication and JWT. I use PostgreSQL as the database where I store information about labs, system users and their roles (teacher, student). The system uses an S3-compatible service to store lab materials and student solutions.

I built the frontend with NextJS. I use the Radix UI library to build components, Formik to handle forms, and Framer Motion for some animations.

## Deployment

### Backend

As mentioned above, the backend of the system uses PostgreSQL and an S3-compatible service. The design gives the system a high degree of flexibility. If you want to use your own services, please check out and modify the environment variables in the `.env' file of the backend project.

### Frontend

The frontend is a standard NextJS project. Check out the [NextJS documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more information.

### Docker Compose

I provide a `docker-compose.yml` file to deploy the whole system completely locally. It will not only start both the frontend and the backend of the system, of course. but also a local PostgreSQL server and a MinIO server. Here are the steps:

Before you start, make sure you have Docker installed on your machine. See the [Docker documentation](https://docs.docker.com/engine/install/) for installation instructions.

Create a directory for the project and run the following command to download the `docker-compose.yml` file:

```bash
curl -fsSLO https://raw.githubusercontent.com/BlockLune/csapp-lab-management-system/refs/heads/main/docker-compose.yml
```

In the same directory, create an `.env` file with the following content:

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

And then run the following command to start:

```bash
docker compose up -d
```

As you can see, there are a lot of credentials to fill in the `.env` file. I provide a script named `deploy.sh` to generate these credentials. Run the following command to download the script:

```bash
curl -fsSLO https://raw.githubusercontent.com/BlockLune/csapp-lab-management-system/refs/heads/main/deploy.sh
```

I also provide a script named `start.sh` to start the services:

```bash
curl -fsSLO https://raw.githubusercontent.com/BlockLune/csapp-lab-management-system/refs/heads/main/start.sh
```

And a script named `stop.sh` to stop the services:

```bash
curl -fsSLO https://raw.githubusercontent.com/BlockLune/csapp-lab-management-system/refs/heads/main/stop.sh
```

## Util Scripts

In NJUPT, students need to use the system to view lab information and submit lab solutions, but they also need to ssh to the school server to do their labs. So, here comes a script for quick batch creation of student accounts in this system and in the server. All you need to do is make sure that a file named `students.csv` exists in your current directory and run the following script (see the comments within the script for more details):

```bash
sudo python add_students.py
```

Notice: The CSV file should contain columns:

- student_id: Student's ID that will be used as both this system's username and Unix username
- password: Student's password that will be set for both this system's and Unix account

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

## Other Resources

Here are two documents from another of my curriculum labs (Software Engineering), which describe the requirements and design of this system. Some parts of the design are not implemented in this project, but they can be used as a reference for future improvements.

- [Software Requirements Specification](./docs/software-requirements-specification.md)
- [Software Design Specification](./docs/software-design-specification.md)

These documents are written in Chinese, with the help of my teammates:

- [@KorNeh](https://github.com/KorNeh)
- [@SJMAHAHA](https://github.com/SJMAHAHA)
- [@haozihuilaile](https://github.com/haozihuilaile)
- [@shandian233](https://github.com/shandian233)
