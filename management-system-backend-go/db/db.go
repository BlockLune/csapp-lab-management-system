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

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully connected to database!")
}
