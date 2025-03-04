package db

import (
	"database/sql"
	"testing"

	_ "github.com/go-sql-driver/mysql"
)

func TestEmpty(t *testing.T) {
	
}

func TestOpenConnection(t *testing.T) {
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3307)/project_it_bpkp")
	if err != nil {
		panic(err)
	}
	defer db.Close()


}