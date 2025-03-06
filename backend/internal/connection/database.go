package connection

// Koneksi ke database
import (
	"backend/internal/config"
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func GetDatabase(conf config.Database) *sql.DB {

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", conf.User, conf.Pass, conf.Host, conf.Port, conf.Name)

	db, err := sql.Open("mysql", dsn)
	// db, err := sql.Open("mysql", conf.User + ":" + conf.Pass + "@tcp(" + conf.Host + ":" + conf.Port + ")/" + conf.Name + "?parseTime=true")

	if err != nil {
		log.Fatal("failed to open connnection: ", err.Error())
	}

	err = db.Ping()
	if err != nil {
		log.Fatal("failed to ping connnection: ", err.Error())
	}

	return db
}