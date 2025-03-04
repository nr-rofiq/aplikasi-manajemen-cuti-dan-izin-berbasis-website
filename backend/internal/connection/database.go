package connection

// Koneksi ke database
import (
	"backend/internal/config"
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func GetDatabase(conf config.Database) *sql.DB {

	db, err := sql.Open("mysql", conf.User + ":" + conf.Pass + "@tcp(" + conf.Host + ":" + conf.Port + ")/" + conf.Name + "?parseTime=true")

	if err != nil {
		log.Fatal("failed to open connnection: ", err.Error())
	}

	err = db.Ping()
	if err != nil {
		log.Fatal("failed to ping connnection: ", err.Error())
	}

	return db
}