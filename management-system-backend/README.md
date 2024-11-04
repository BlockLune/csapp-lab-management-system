# Management System Backend

This is a management system designed for NJUPT labs, built with Spring.

## Configuration

1. PostgreSQL
2. Any S3-Compatible Service

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
