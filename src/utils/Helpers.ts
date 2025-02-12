import { Home, Activity, BarChart, Calendar, Settings, HelpCircle, Users, MonitorCog, Clock8,CalendarCheck2,Coffee, Building2 } from 'lucide-react';

const menuItems = [
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Activity", icon: Activity, href: "/activity" },
  { name: "Analytics", icon: BarChart, href: "/analytic" },
  { name: "Presence", icon: Calendar, href: "/presence" },
  { name: "Leaves", icon: Calendar, href: "/leave" },
  { name: "Schedules", icon: Calendar, href: "/schedule" },
  { name: "Settings", icon: Settings, href: "/settings" },
  { name: "Help & Feedback", icon: HelpCircle, href: "/help" },
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
  {name: "NAME", uid: "name", sortable: true},
  {name: "ROLE", uid: "role", sortable: true},
  {name: "TEAM", uid: "team"},
  {name: "EMAIL", uid: "email"},
  {name: "CLOCK IN", uid: "clockIn", sortable: true},
  {name: "CLOCK OUT", uid: "clockOut", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "WFO", uid: "wfo"},
  {name: "WFA", uid: "wfa"},
  {name: "Submission", uid: "submission"},
];

const usersDummy = [
  {
    nip: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "wfo",
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
    clockIn: "08:00",
    clockOut: "17:00",
    
    email: "kristen.cooper@example.com",
  },
  {
    nip: 6,
    name: "Brian Kim",
    role: "P. Manager",
    team: "Management",
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

export { menuItems, topCardList, tableColumns, statusOptions,usersDummy};
