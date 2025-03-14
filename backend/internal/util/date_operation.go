package util

import "time"

// Fungsi untuk menghitung selisih hari kerja (exclude weekend)
func CountWeekdays(startDate, endDate time.Time) int {
	count := 0

	// Loop dari startDate sampai endDate
	for d := startDate; !d.After(endDate); d = d.AddDate(0, 0, 1) {
		// Cek apakah hari saat ini bukan Sabtu (6) atau Minggu (0)
		if d.Weekday() != time.Saturday && d.Weekday() != time.Sunday {
			count++
		}
	}
	return count
}