package db

import "blocklune/csapp-lab-management-system-api/model"

func InsertLabInfo(name string, description string) error {
	query := `
    INSERT INTO my_lab_info_table (name, description)
    VALUES ($1, $2)
    `

	stmt, err := db.Prepare(query)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(name, description)
	if err != nil {
		return err
	}

	return nil
}

func GetAllLabInfo() ([]model.LabInfo, error) {
	var labInfos []model.LabInfo

	query := `
    SELECT * FROM my_lab_info_table
    `

	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var labInfo model.LabInfo
		err := rows.Scan(&labInfo.Id, &labInfo.Name, &labInfo.Description)
		if err != nil {
			return nil, err
		}
		labInfos = append(labInfos, labInfo)
	}

	return labInfos, nil
}

func GetLabInfoById(id int) (model.LabInfo, error) {
	var labInfo model.LabInfo

	query := `
    SELECT * FROM my_lab_info_table
    WHERE id = $1
    `

	row := db.QueryRow(query, id)
	err := row.Scan(&labInfo.Id, &labInfo.Name, &labInfo.Description)
	if err != nil {
		return model.LabInfo{}, err
	}

	return labInfo, nil
}

func initLabInfoTable() {
	checkStatusQuery := `
    SELECT COUNT(*) FROM my_lab_info_table
    `

	var count int
	row := db.QueryRow(checkStatusQuery)
	err := row.Scan(&count)
	if err != nil {
		panic(err)
	}
	if count > 0 {
		return
	}

	var dataLab = model.LabInfo{
		Id:          1,
		Name:        "Data Lab",
		Description: "Students implement simple logical, two's complement, and floating point functions, but using a highly restricted subset of C. For example, they might be asked to compute the absolute value of a number using only bit-level operations and straightline code. This lab helps students understand the bit-level representations of C data types and the bit-level behavior of the operations on data.",
	}
	var bombLab = model.LabInfo{
		Id:          2,
		Name:        "Bomb Lab",
		Description: "A binary bomb is a program provided to students as an object code file. When run, it prompts the user to type in 6 different strings. If any of these is incorrect, the bomb explodes, printing an error message and logging the event on a grading server. Students must defuse their own unique bomb by disassembling and reverse engineering the program to determine what the 6 strings should be. The lab teaches students to understand assembly language, and also forces them to learn how to use a debugger. It's also great fun. A legendary lab among the CMU undergrads.",
	}
	var attackLab = model.LabInfo{
		Id:          3,
		Name:        "Attack Lab",
		Description: "Students are given a pair of unique custom-generated x86-64 binary executables, called targets, that have buffer overflow bugs. One target is vulnerable to code injection attacks. The other is vulnerable to return-oriented programming attacks. Students are asked to modify the behavior of the targets by developing exploits based on either code injection or return-oriented programming. This lab teaches the students about the stack discipline and teaches them about the danger of writing code that is vulnerable to buffer overflow attacks.",
	}
	var architectureLab = model.LabInfo{
		Id:          4,
		Name:        "Architecture Lab",
		Description: "Students are given a small default Y86-64 array copying function and a working pipelined Y86-64 processor design that runs the copy function in some nominal number of clock cycles per array element (CPE). The students attempt to minimize the CPE by modifying both the function and the processor design. This gives the students a deep appreciation for the interactions between hardware and software.",
	}

	err = InsertLabInfo(dataLab.Name, dataLab.Description)
	if err != nil {
		panic(err)
	}

	err = InsertLabInfo(bombLab.Name, bombLab.Description)
	if err != nil {
		panic(err)
	}

	err = InsertLabInfo(attackLab.Name, attackLab.Description)
	if err != nil {
		panic(err)
	}

	err = InsertLabInfo(architectureLab.Name, architectureLab.Description)
	if err != nil {
		panic(err)
	}
}
