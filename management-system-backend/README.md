# Management System Backend

This is a management system designed for NJUPT labs, built with Spring.

## Configuration

1. MySQL database (`application.properties`)
2. Aliyun OSS (`application.properties`, Environment Variables)

## Development Notes

- File structure in OSS:

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
