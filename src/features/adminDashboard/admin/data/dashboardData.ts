export interface BirthdayMember {
  id: string;
  name: string;
  role: string;
  age: number;
  avatar: string;
  status: "TODAY" | "Tomorrow" | "In 3 Days";
  statusVariant: "danger" | "warning" | "neutral";
}

export interface MissingAttendanceLeader {
  id: string;
  name: string;
  group: string;
  memberCount: number;
  avatar: string;
  unmarkedService: string;
}

export const MOCK_BIRTHDAYS: BirthdayMember[] = [
  {
    id: "1",
    name: "Grace Mensah",
    role: "Choir",
    age: 28,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    status: "TODAY",
    statusVariant: "danger",
  },
  {
    id: "2",
    name: "Emmanuel Osei",
    role: "Youth Leader",
    age: 32,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: "Tomorrow",
    statusVariant: "warning",
  },
  {
    id: "3",
    name: "Sarah Appiah",
    role: "Ushering",
    age: 25,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    status: "In 3 Days",
    statusVariant: "neutral",
  },
];

export const MOCK_MISSING_ATTENDANCE: MissingAttendanceLeader[] = [
  {
    id: "1",
    name: "Kofi Boateng",
    group: "Cell Group A",
    memberCount: 18,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    unmarkedService: "Sunday Service",
  },
  {
    id: "2",
    name: "David Kwakye",
    group: "Youth Ministry",
    memberCount: 42,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    unmarkedService: "Tuesday Service",
  },
];