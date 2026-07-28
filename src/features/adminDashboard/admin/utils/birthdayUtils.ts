// utils/birthdayUtils.ts
import { MemberBirthday } from "../services/birthdaysApi";

export interface FormattedBirthdayItem {
  id: string;
  name: string;
  phoneNumber?: string;
  avatar: string;
  dobLabel: string;
  age: number;
  isToday: boolean;
}

export function formatBirthdayItem(member: MemberBirthday, isTodayContext: boolean = false): FormattedBirthdayItem {
  const birthDate = new Date(member.dateOfBirth);
  const today = new Date();

  // Calculate age turning this year
  let age = today.getFullYear() - birthDate.getFullYear();

  // Format initials for avatar placeholder
  const fullName = `${member.firstName} ${member.lastName}`.trim();
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=f472b6&color=fff&bold=true`;

  // Format DOB display (e.g., "Jul 28")
  const dobLabel = birthDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Check if birthday matches today's month and day
  const isToday =
    today.getMonth() === birthDate.getMonth() &&
    today.getDate() === birthDate.getDate();

  return {
    id: member.id,
    name: fullName,
    phoneNumber: member.phoneNumber,
    avatar,
    dobLabel,
    age,
    isToday: isTodayContext || isToday,
  };
}