import { Home, Activity, BarChart, Calendar, Settings, HelpCircle, Clock8,CalendarCheck2,Coffee, Building2 } from 'lucide-react';

const menuItems = [
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Activity", icon: Activity, href: "/activity" },
  { name: "Analytics", icon: BarChart, href: "/analytic" },
  { name: "Settings", icon: Settings, href: "/settings" },
  // { name: "Presence", icon: Calendar, href: "/presence" },
  // { name: "Leaves", icon: Calendar, href: "/leave" },
  // { name: "Schedules", icon: Calendar, href: "/schedule" },
  { name: "Help & Feedback", icon: HelpCircle, href: "/help" },
];

const subItems = [
  { name: "Profil",  href: "/presence" },
  { name: "Security",  href: "/presence" },
  { name: "Application", href: "/presence" },
  { name: "Team Member",  href: "/presence" },
  { name: "Notifikasi",  href: "/presence" },
  { name: "Data Eksport",  href: "/presence" },
  { name: "Version", href: "/presence" }, 
];


const topCardList = [
  {
    title: "Absence",
    img: "/images/fruit-1.jpeg",
    count: "5",
    color: "danger",
    icon: Clock8,
  },
  {
    title: "Submissions",
    img: "/images/fruit-2.jpeg",
    count: "2",
    color: "warning",
    icon: CalendarCheck2,

  },
  {
    title: "Work From Anywhere",
    img: "/images/fruit-3.jpeg",
    count: "1",
    color: "primary",
    icon: Coffee,
  },
  {
    title: "Work From Office",
    img: "/images/fruit-3.jpeg",
    count: "24",
    color: "success",
    icon:Building2 ,
  },
];

const tableColumns = [
  {name: "NIP", uid: "nip", sortable: true},
  {name: "NAMA", uid: "name", sortable: true},
  {name: "JABATAN", uid: "role", sortable:true},
  {name: "APLIKASI", uid: "team", sortable: true},
  {name: "JADWAL", uid: "schedule", sortable: true},
  {name: "SPD", uid: "spd", sortable: true},
  {name: "EMAIL", uid: "email"},
  {name: "HARI", uid: "day"},
  {name: "WAKTU", uid: "time"},
  {name: "TANGGAL", uid: "date"},
  {name: "TANGGAL AWAL ", uid: "date1"},
  {name: "TANGGAL AKHIR ", uid: "date2"},
  {name: "JAM AWAL", uid: "time1", sortable: true},
  {name: "JAM AKHIR", uid: "time2", sortable: true},
  {name: "CLOCK IN", uid: "clockIn", sortable: true},
  {name: "CLOCK OUT", uid: "clockOut", sortable: true},
  {name: "KETERANGAN", uid: "keterangan"},
  {name: "KOREKSI", uid: "koreksi"},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "", uid: "actions"},
];

const statusOptions = [
  {name: "WFO", uid: "wfo"},
  {name: "WFA", uid: "wfa"},
  {name: "Submission", uid: "submission"},
];
const statusOptionsCuti = [
  {name: "Disetujui", uid: "wfo"},
  {name: "Tidak disetujui", uid: "wfa"},
  {name: "Menunggu", uid: "submission"},
];

const usersDummy = [
  {
    nip: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "WFH",
    time: "08.16",
    clockIn: "08:00",
    clockOut: "17:00",
    email: "tony.reichert@example.com",
  },
  {
    nip: 2,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "wfa",
    time: "08.16",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "zoey.lang@example.com",
  },
  {
    nip: 3,
    name: "Jane Fisher",
    role: "Sr. Dev",
    team: "Development",
    status: "wfo",
    time: "08.16",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "jane.fisher@example.com",
  },
  {
    nip: 4,
    name: "William Howard",
    role: "C.M.",
    team: "Marketing",
    status: "submission",
    time: "08.16",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "william.howard@example.com",
  },
  {
    nip: 5,
    name: "Kristen Copper",
    role: "S. Manager",
    team: "Sales",
    status: "wfo",
    time: "08.16",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "kristen.cooper@example.com",
  },
  {
    nip: 6,
    name: "Brian Kim",
    role: "P. Manager",
    team: "Management",
    time: "08.16",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "brian.kim@example.com",
    status: "wfo",
  },
  {
    nip: 7,
    name: "Michael Hunt",
    role: "Designer",
    team: "Design",
    status: "wfa",
    time: "08.16",
    clockIn: "08:00",
    clockOut: "17:00",
    email: "michael.hunt@example.com",
  },
  {
    nip: 8,
    name: "Samantha Brooks",
    role: "HR Manager",
    team: "HR",
    status: "wfo",
    time: "08.16",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "samantha.brooks@example.com",
  },
  {
    nip: 9,
    name: "Frank Harrison",
    role: "F. Manager",
    team: "Finance",
    status: "submission",
    time: "08.16",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "frank.harrison@example.com",
  },
  {
    nip: 10,
    name: "Emma Adams",
    role: "Ops Manager",
    team: "Operations",
    status: "wfo",
    time: "08.16",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "emma.adams@example.com",
  },
  {
    nip: 11,
    name: "Brandon Stevens",
    role: "Jr. Dev",
    team: "Development",
    status: "wfo",
    time: "08.16",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "brandon.stevens@example.com",
  },
  {
    nip: 12,
    name: "Megan Richards",
    role: "P. Manager",
    team: "Product",
    status: "wfa",
    time: "08.16",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "megan.richards@example.com",
  },
  {
    nip: 13,
    name: "Oliver Scott",
    role: "S. Manager",
    team: "Security",
    status: "wfo",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "oliver.scott@example.com",
  },
  {
    nip: 14,
    name: "Grace Allen",
    role: "M. Specialist",
    team: "Marketing",
    status: "wfo",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "grace.allen@example.com",
  },
  {
    nip: 15,
    name: "Noah Carter",
    role: "IT Specialist",
    team: "I. Technology",
    status: "wfa",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "noah.carter@example.com",
  },
  {
    nip: 16,
    name: "Ava Perez",
    role: "Manager",
    team: "Sales",
    status: "wfo",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "ava.perez@example.com",
  },
  {
    nip: 17,
    name: "Liam Johnson",
    role: "Data Analyst",
    team: "Analysis",
    status: "wfo",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "liam.johnson@example.com",
  },
  {
    nip: 18,
    name: "Sophia Taylor",
    role: "QA Analyst",
    team: "Testing",
    status: "wfo",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "sophia.taylor@example.com",
  },
  {
    nip: 19,
    name: "Lucas Harris",
    role: "Administrator",
    team: "Information Technology",
    status: "wfa",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "lucas.harris@example.com",
  },
  {
    nip: 20,
    name: "Mia Robinson",
    role: "Coordinator",
    team: "Operations",
    status: "wfo",
    clockIn: "08:00",
    clockOut: "17:00",

    email: "mia.robinson@example.com",
  },
];

const columnAct = [
  { name: "NAME/NIP", uid: "name" },
  { name: "TANGGAL", uid: "tanggal" },
  { name: "CLOCK-IN", uid: "clockin" },
  { name: "CLOCK-OUT", uid: "clockout" },
  { name: "KETERANGAN", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export {
  menuItems,
  topCardList,
  tableColumns,
  statusOptions,
  statusOptionsCuti,
  usersDummy,
  columnAct,
  subItems,
};
