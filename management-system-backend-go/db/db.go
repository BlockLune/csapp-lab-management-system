package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

var db *sql.DB

func InitDb() {
	dbHost := os.Getenv("CSAPP_LAB_MANAGEMENT_SYSTEM_POSTGRES_HOST")
	dbPort := os.Getenv("CSAPP_LAB_MANAGEMENT_SYSTEM_POSTGRES_PORT")
	dbName := os.Getenv("CSAPP_LAB_MANAGEMENT_SYSTEM_POSTGRES_DB")
	dbUser := os.Getenv("CSAPP_LAB_MANAGEMENT_SYSTEM_POSTGRES_USER")
	dbPassword := os.Getenv("CSAPP_LAB_MANAGEMENT_SYSTEM_POSTGRES_PASSWORD")

	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", dbHost, dbPort, dbUser, dbPassword, dbName)

	var err error
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully connected to database!")

	createLabInfoTable()
	createSystemUserTable()
	createRoleTable()

	fmt.Println("Successfully created tables!")

	initLabInfoTable()
	fmt.Println("Successfully initialized lab info table!")

	initTeacher()
	fmt.Println("Successfully initialized teacher!")
}

func createLabInfoTable() {
	query := `
	CREATE TABLE IF NOT EXISTS my_lab_info_table (
		id SERIAL PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		description TEXT NOT NULL
	)
	`

	_, err := db.Exec(query)
	if err != nil {
		panic(fmt.Sprintf("Error Creating Lab Info Table: %v", err))
	}
}

func createSystemUserTable() {
	query := `
	CREATE TABLE IF NOT EXISTS my_system_user_table (
		id SERIAL PRIMARY KEY,
		username VARCHAR(255) NOT NULL UNIQUE,
		password VARCHAR(255) NOT NULL
	)
	`

	_, err := db.Exec(query)
	if err != nil {
		panic(fmt.Sprintf("Error Creating System User Table: %v", err))
	}
}

func createRoleTable() {
	query := `
	CREATE TABLE IF NOT EXISTS my_role_table (
		user_id INT NOT NULL,
		role VARCHAR(255) NOT NULL,
		FOREIGN KEY (user_id) REFERENCES my_system_user_table(id)
	)
	`

	_, err := db.Exec(query)
	if err != nil {
		panic(fmt.Sprintf("Error Creating Role Table: %v", err))
	}
}

func initTeacher() {
	checkStatusQuery := `
	SELECT COUNT(*) FROM my_system_user_table`

	var count int
	row := db.QueryRow(checkStatusQuery)
	err := row.Scan(&count)
	if err != nil {
		panic(fmt.Sprintf("Error Initializing Teacher: %v", err))
	}
	if count > 0 {
		return
	}

	initTeacherUsername := os.Getenv("CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_USERNAME")
	initTeacherPassword := os.Getenv("CSAPP_LAB_MANAGEMENT_SYSTEM_INIT_TEACHER_PASSWORD")

	if initTeacherUsername == "" || initTeacherPassword == "" {
		panic("Error Initializing Teacher: No username or password provided")
	}

	createUserQuery := `
	INSERT INTO my_system_user_table (username, password)
	VALUES ($1, $2)
	`

	_, err = db.Exec(createUserQuery, initTeacherUsername, initTeacherPassword)
	if err != nil {
		panic(fmt.Sprintf("Error Initializing Teacher: %v", err))
	}

	user, err := GetSystemUserByUsername(initTeacherUsername)
	if err != nil {
		panic(fmt.Sprintf("Error Initializing Teacher: %v", err))
	}

	assignRoleQuery := `
	INSERT INTO my_role_table (user_id, role)
	VALUES ($1, $2)
	`

	_, err = db.Exec(assignRoleQuery, user.Id, "TEACHER")
	if err != nil {
		panic(fmt.Sprintf("Error Initializing Teacher: %v", err))
	}
}
