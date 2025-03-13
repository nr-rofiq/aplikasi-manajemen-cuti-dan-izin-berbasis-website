export const cardDataUser = [
	{ title: "Jatah Cuti Tersedia", key: "cuti_tersedia" },
	{ title: "Cuti Terpakai", key: "cuti_terpakai" },
	{ title: "Menunggu", key: "menunggu" },
	{ title: "Disetujui", key: "disetujui" },
] as const;

export const cutiHistory = [
	{
		date: new Date("2025-02-17"),
		type: "Cuti Tahunan",
		duration: 2,
		status: "Disetujui",
	},
	{
		date: new Date("2025-02-11"),
		type: "Cuti Sakit",
		duration: 1,
		status: "Menunggu",
	},
	{
		date: new Date("2025-02-11"),
		type: "Cuti Sakit",
		duration: 1,
		status: "Menunggu",
	},
	{
		date: new Date("2025-02-11"),
		type: "Cuti Sakit",
		duration: 1,
		status: "Menunggu",
	},
	{
		date: new Date("2025-02-10"),
		type: "Cuti Tahunan",
		duration: 9,
		status: "Ditolak",
	},
];

export const dropdownData = [
	{ code: "C01", type: "Cuti Tahunan" },
	{ code: "C02", type: "Cuti Besar" },
	{ code: "C03", type: "Cuti Sakit" },
	{ code: "C04", type: "Cuti Melahirkan" },
	{ code: "C05", type: "Cuti Alasan Penting" },
];

export const statusCuti = ["Disetujui", "Menunggu", "Ditolak"];

export const cutiEmployeesData = [
	{
		name: "Joko",
		date: `${new Date("2025-02-10").toLocaleDateString("id-ID")} ${new Date(
			"2025-02-15"
		).toLocaleDateString("id-ID")}`,
		duration: "5",
		type: "Cuti Tahunan",
		status: "Disetujui",
	},
	{
		name: "Joko",
		date: `${new Date("2025-02-10").toLocaleDateString("id-ID")} ${new Date(
			"2025-02-15"
		).toLocaleDateString("id-ID")}`,
		duration: "5",
		type: "Cuti Tahunan",
		status: "Disetujui",
	},
	{
		name: "Joko",
		date: `${new Date("2025-02-10").toLocaleDateString("id-ID")} ${new Date(
			"2025-02-15"
		).toLocaleDateString("id-ID")}`,
		duration: "5",
		type: "Cuti Tahunan",
		status: "Disetujui",
	},
	{
		name: "Joko",
		date: `${new Date("2025-02-10").toLocaleDateString("id-ID")} ${new Date(
			"2025-02-15"
		).toLocaleDateString("id-ID")}`,
		duration: "5",
		type: "Cuti Tahunan",
		status: "Disetujui",
	},
	{
		name: "Doni",
		date: `${new Date("2025-03-12").toLocaleDateString("id-ID")} ${new Date(
			"2025-03-15"
		).toLocaleDateString("id-ID")}`,
		duration: "3",
		type: "Cuti Sakit",
		status: "Menunggu",
	},
];

export const approvalData = [{ type: "Disetujui" }, { type: "Ditolak" }];

// === Daftar NIP ===
// 1. 200208152025041001
// 2. 200011282025041001
// 3. 200103272025041001
// 4. 199106062025041001
// 5. 199007232025041001
// 6. 197405271994051017

// Default password=bpkp2025
