import React, { useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Trash2,
  CheckCircle2,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import {
  useApproveUser,
  useRejectUser,
  useDeleteUser,
  useAssignLeader,
} from "../hooks/useAdminMutations";
import {
  useApprovedLeaders,
  usePendingUsers,
  useLeaderMembers,
  useUnassignedMembers,
} from "../hooks/useAdminQueries";

const LeaderDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"approved" | "pending">(
    "approved",
  );
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);
  const [selectedUnassignedMember, setSelectedUnassignedMember] =
    useState<string>("");

  // Queries
  const { data: approvedLeaders = [], isLoading: isLoadingLeaders } =
    useApprovedLeaders();
  const { data: pendingUsers = [], isLoading: isLoadingPending } =
    usePendingUsers();
  const { data: leaderMembers = [], isLoading: isLoadingMembers } =
    useLeaderMembers(selectedLeaderId);
  const { data: unassignedMembers = [] } = useUnassignedMembers();

  // Mutations
  const approveMutation = useApproveUser();
  const rejectMutation = useRejectUser();
  const deleteMutation = useDeleteUser();
  const assignMutation = useAssignLeader();

  const handleAssign = async () => {
    if (!selectedLeaderId || !selectedUnassignedMember) return;
    await assignMutation.mutateAsync({
      memberId: selectedUnassignedMember,
      leaderId: selectedLeaderId,
    });
    setSelectedUnassignedMember("");
  };

  return (
    <div className="space-y-8 p-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-5 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <Users size={20} />
            <span className="text-sm font-bold uppercase tracking-wider">
              Administration
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Leader Management
          </h2>
          <p className="text-gray-500 text-sm">
            Approve, monitor, and assign members to leaders
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("approved")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === "approved"
                ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Approved Leaders ({approvedLeaders.length})
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === "pending"
                ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Pending Requests ({pendingUsers.length})
          </button>
        </div>
      </header>

      {activeTab === "approved" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Approved Leaders List */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Leaders
            </h3>
            {isLoadingLeaders ? (
              <div className="flex justify-center p-6">
                <Loader2 className="animate-spin text-indigo-600" />
              </div>
            ) : approvedLeaders.length === 0 ? (
              <p className="text-sm text-gray-500">
                No approved leaders found.
              </p>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {approvedLeaders.map((leader) => (
                  <div
                    key={leader.id}
                    onClick={() => setSelectedLeaderId(leader.id)}
                    className={`p-3 rounded-xl cursor-pointer border transition-all ${
                      selectedLeaderId === leader.id
                        ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20"
                        : "border-gray-100 dark:border-gray-800 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {leader.firstName} {leader.lastName}
                    </div>
                    <div className="text-xs text-gray-500">{leader.email}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Assigned Members Details & Hierarchy */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              {selectedLeaderId
                ? "Assigned Group Members"
                : "Select a Leader to View Members"}
            </h3>

            {selectedLeaderId && (
              <>
                {/* Assignment Control */}
                <div className="flex gap-2 mb-6">
                  <select
                    value={selectedUnassignedMember}
                    onChange={(e) =>
                      setSelectedUnassignedMember(e.target.value)
                    }
                    className="flex-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
                  >
                    <option value="">Select unassigned member...</option>
                    {unassignedMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.firstName} {m.lastName} ({m.email})
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAssign}
                    disabled={
                      !selectedUnassignedMember || assignMutation.isPending
                    }
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm disabled:opacity-50"
                  >
                    Assign Member
                  </button>
                </div>

                {/* Members List */}
                {isLoadingMembers ? (
                  <div className="flex justify-center p-6">
                    <Loader2 className="animate-spin text-indigo-600" />
                  </div>
                ) : leaderMembers.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No members currently assigned to this leader.
                  </p>
                ) : (
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {leaderMembers.map((member) => (
                      <div
                        key={member.id}
                        className="py-3 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {member.firstName} {member.lastName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        /* Pending Leader Requests List */
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
            Pending User Approvals
          </h3>
          {isLoadingPending ? (
            <div className="flex justify-center p-6">
              <Loader2 className="animate-spin text-indigo-600" />
            </div>
          ) : pendingUsers.length === 0 ? (
            <p className="text-sm text-gray-500">
              No pending leader requests found.
            </p>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {pendingUsers.map((user) => (
                <div
                  key={user.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {user.email} • Role: {user.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => approveMutation.mutate(user.id)}
                      disabled={approveMutation.isPending}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <UserCheck size={14} /> Approve
                    </button>
                    <button
                      onClick={() => rejectMutation.mutate(user.id)}
                      disabled={rejectMutation.isPending}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <UserX size={14} /> Reject
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(user.id)}
                      disabled={deleteMutation.isPending}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeaderDashboard;
