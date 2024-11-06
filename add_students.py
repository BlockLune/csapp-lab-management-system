#!/usr/bin/env python

"""
Script for batch creating student accounts in both API system and local Unix system.

This script reads student information (student ID and password) from a CSV file and:
1. Sends POST requests to register students in the remote API system
2. Creates corresponding local Unix accounts if API registration succeeds

The CSV file should contain columns:
- student_id: Student's ID that will be used as both API username and Unix username
- password: Student's password that will be set for both API and Unix account

Required environment variables:
- CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_USERNAME: Teacher's username for API authentication
- CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_PASSWORD: Teacher's password for API authentication

Note:
- Must be run with root privileges
- Requires useradd and chpasswd commands available on the system
- CSV file path is set to 'students.csv' by default
- API endpoint is set to 'http://localhost:8080/api/teachers/students' by default
"""

import os
import csv
import requests
import subprocess
from dotenv import load_dotenv
from requests.auth import HTTPBasicAuth

CSV_FILE_PATH = "students.csv"
API_URL = "http://localhost:8080/api/teachers/students"
USERNAME = os.getenv("CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_USERNAME")
PASSWORD = os.getenv("CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_PASSWORD")


def create_unix_user(username, password):
    try:
        check_user = subprocess.run(
            ["id", username], stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )

        if check_user.returncode == 0:
            print(f"User {username} already exists")
            return False

        create_user = subprocess.run(
            ["useradd", "-m", username], stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )

        if create_user.returncode != 0:
            print(f"Failed to create user {username}: {create_user.stderr.decode()}")
            return False

        set_password = subprocess.Popen(
            ["chpasswd"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )

        set_password.communicate(input=f"{username}:{password}".encode())

        if set_password.returncode != 0:
            print(f"Failed to set password for {username}")
            return False

        print(f"Successfully created Unix user {username}")
        return True

    except Exception as e:
        print(f"Error creating Unix user {username}: {str(e)}")
        return False


def read_csv_and_send_requests():
    try:
        with open(CSV_FILE_PATH, "r") as file:
            csv_reader = csv.DictReader(file)

            for row in csv_reader:
                data = {"studentId": row["student_id"], "rawPassword": row["password"]}

                try:
                    response = requests.post(
                        API_URL,
                        json=data,
                        auth=HTTPBasicAuth(str(USERNAME), str(PASSWORD)),
                    )

                    if response.status_code == 200:
                        print(f"Successfully added {row['student_id']} to API")
                        if create_unix_user(row["student_id"], row["password"]):
                            print(f"Completed setup for {row['student_id']}")
                        else:
                            print(f"Failed to create Unix user for {row['student_id']}")
                    else:
                        print(f"Failed to add {row['student_id']} to API")

                except requests.exceptions.RequestException as e:
                    print(f"Failed to request ({row['student_id']}): {str(e)}")

    except FileNotFoundError:
        print(f"Not found：{CSV_FILE_PATH}")
    except Exception as e:
        print(f"Error：{str(e)}")


if __name__ == "__main__":
    if os.geteuid() != 0:
        print("This script must be run as root")
        exit(1)

    load_dotenv()
    read_csv_and_send_requests()
