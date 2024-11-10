package db

import (
	"blocklune/csapp-lab-management-system-api/model"
)

func GetSystemUserByUsername(username string) (model.SystemUser, error) {
	var systemUser model.SystemUser

	query := `
	SELECT * FROM my_system_user_table
	WHERE username = $1
	`

	row := db.QueryRow(query, username)
	err := row.Scan(&systemUser.Id, &systemUser.UserName, &systemUser.Password)
	if err != nil {
		return model.SystemUser{}, err
	}

	return systemUser, nil
}
