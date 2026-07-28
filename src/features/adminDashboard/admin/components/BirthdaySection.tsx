// components/BirthdaySection.tsx
import React, { useState, useEffect } from "react";
import { Cake, Send, Loader2 } from "lucide-react";
import { formatBirthdayItem, FormattedBirthdayItem } from "../utils/birthdayUtils";
import { Badge } from "./Badge";
import { birthdaysApi } from "../api/birthdaysApi";

export const BirthdaySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"today" | "month">("today");
  const [todayBirthdays, setTodayBirthdays] = useState<FormattedBirthdayItem[]>([]);
  const [monthBirthdays, setMonthBirthdays] = useState<FormattedBirthdayItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBirthdays = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [todayRes, monthRes] = await Promise.all([
          birthdaysApi.getTodayBirthdays(),
          birthdaysApi.getThisMonthBirthdays(),
        ]);

        if (isMounted) {
          setTodayBirthdays(todayRes.map((m) => formatBirthdayItem(m, true)));
          setMonthBirthdays(monthRes.map((m) => formatBirthdayItem(m)));
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load birthdays.");
          console.error(err);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchBirthdays();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayedList = activeTab === "today" ? todayBirthdays : monthBirthdays;

  const handleSendWish = (member: FormattedBirthdayItem) => {
    if (member.phoneNumber) {
      window.open(`tel:${member.phoneNumber}`);
      // Or route to an internal SMS modal/action handler
    } else {
      alert(`Sending birthday wish to ${member.name}`);
    }
  };

  return (
    <div className="bg-[rgb(var(--bg-secondary))] border border-[rgb(var(--border-primary))] rounded-2xl p-5 shadow-xs space-y-4">
      {/* Header with Title and Tabs */}
      <div className="flex flex-col gap-3 border-b border-[rgb(var(--border-primary))] pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cake className="text-pink-500" size={18} />
            <h3 className="text-sm font-bold text-[rgb(var(--text-primary))]">
              Birthdays
            </h3>
          </div>
          <Badge variant="primary">{displayedList.length} Total</Badge>
        </div>

        {/* Tab Toggle: Today vs This Month */}
        <div className="flex bg-[rgb(var(--bg-tertiary))] p-1 rounded-xl border border-[rgb(var(--border-primary))] text-xs font-semibold">
          <button
            onClick={() => setActiveTab("today")}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
              activeTab === "today"
                ? "bg-[rgb(var(--bg-secondary))] text-pink-500 shadow-xs"
                : "text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))]"
            }`}
          >
            Today ({todayBirthdays.length})
          </button>
          <button
            onClick={() => setActiveTab("month")}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
              activeTab === "month"
                ? "bg-[rgb(var(--bg-secondary))] text-pink-500 shadow-xs"
                : "text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))]"
            }`}
          >
            This Month ({monthBirthdays.length})
          </button>
        </div>
      </div>

      {/* Body List Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-6 text-[rgb(var(--text-muted))] space-y-2">
          <Loader2 className="animate-spin text-pink-500" size={20} />
          <span className="text-xs">Fetching birthdays...</span>
        </div>
      ) : error ? (
        <p className="text-xs text-red-500 text-center py-4">{error}</p>
      ) : displayedList.length === 0 ? (
        <div className="text-center py-6 text-xs text-[rgb(var(--text-muted))]">
          No birthdays {activeTab === "today" ? "today" : "this month"}. 🎉
        </div>
      ) : (
        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
          {displayedList.map((member) => (
            <div
              key={member.id}
              className="p-3 rounded-xl bg-[rgb(var(--bg-tertiary))] border border-[rgb(var(--border-primary))] flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-pink-500/30"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate text-[rgb(var(--text-primary))]">
                    {member.name}
                  </p>
                  <p className="text-[10px] text-[rgb(var(--text-muted))]">
                    {member.dobLabel} • Turning {member.age}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                {member.isToday ? (
                  <Badge variant="success">TODAY</Badge>
                ) : (
                  <Badge variant="neutral">{member.dobLabel}</Badge>
                )}

                {member.isToday && (
                  <button
                    onClick={() => handleSendWish(member)}
                    className="p-1 text-pink-500 hover:bg-pink-500/10 rounded-md transition-colors cursor-pointer"
                    aria-label={`Send birthday wish to ${member.name}`}
                    title="Send wish"
                  >
                    <Send size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};