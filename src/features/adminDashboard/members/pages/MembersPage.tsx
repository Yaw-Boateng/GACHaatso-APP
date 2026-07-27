import React, { useState } from "react";
import { useMembers } from "../hooks/useMembers";
import { Member } from "../types";
import { MembersToolbar } from "../components/MembersToolbar";
import { MembersTable } from "../components/MembersTable";
import { MemberCard } from "../components/MemberCard";
import { MemberProfileDrawer } from "../components/MemberProfileDrawer";
import { DeleteMemberModal } from "../components/DeleteMemberModal";
import { AssignLeaderModal } from "../components/AssignLeaderModal";
import { MemberFormModal } from "../components/MemberFormModal";
import { Pagination } from "../../../../components/common/Pagination";

export const MembersPage = () => {
  const { members, loading, pagination, params, setParams, refetch } =
    useMembers();

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [activeModal, setActiveModal] = useState<
    "drawer" | "form" | "role" | "delete" | null
  >(null);

  const handleOpenForm = (member?: Member) => {
    setSelectedMember(member || null);
    setActiveModal("form");
  };

  const handleOpenDrawer = (member: Member) => {
    setSelectedMember(member);
    setActiveModal("drawer");
  };

  const handleOpenRoleModal = (member: Member) => {
    setSelectedMember(member);
    setActiveModal("role");
  };

  const handleOpenDeleteModal = (member: Member) => {
    setSelectedMember(member);
    setActiveModal("delete");
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedMember(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Members Directory
        </h1>
        <p className="text-sm text-slate-500">
          Manage member accounts, profiles, roles, and status.
        </p>
      </div>

      <MembersToolbar
        search={params.search || ""}
        onSearchChange={(search) =>
          setParams((prev) => ({ ...prev, search, page: 1 }))
        }
        roleFilter={params.role || ""}
        onRoleFilterChange={(role) =>
          setParams((prev) => ({ ...prev, role, page: 1 }))
        }
        statusFilter={params.status || ""}
        onStatusFilterChange={(status) =>
          setParams((prev) => ({ ...prev, status, page: 1 }))
        }
        onAddMember={() => handleOpenForm()}
      />

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-sm">
          Loading members directory...
        </div>
      ) : (
        <>
          {/* Desktop View */}
          <MembersTable
            members={members}
            onView={handleOpenDrawer}
            onEdit={handleOpenForm}
            onAssignLeader={handleOpenRoleModal}
            onDelete={handleOpenDeleteModal}
          />

          {/* Mobile Grid View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onView={handleOpenDrawer}
                onEdit={handleOpenForm}
                onAssignLeader={handleOpenRoleModal}
                onDelete={handleOpenDeleteModal}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={pagination.page - 1} // Convert back to 0-indexed for the component
            totalPages={pagination.totalPages}
            onPageChange={(page) =>
              setParams((prev) => ({ ...prev, page: page + 1 }))
            }
          />
        </>
      )}

      {/* Modals & Drawers */}
      <MemberProfileDrawer
        isOpen={activeModal === "drawer"}
        member={selectedMember}
        onClose={handleCloseModal}
      />

      <MemberFormModal
        isOpen={activeModal === "form"}
        member={selectedMember}
        onClose={handleCloseModal}
        onSuccess={refetch}
      />

      <AssignLeaderModal
        isOpen={activeModal === "role"}
        member={selectedMember}
        onClose={handleCloseModal}
        onSuccess={async () => {
          await refetch(); // Await the refetch so members list updates before closing modal
        }}
      />

      <DeleteMemberModal
        isOpen={activeModal === "delete"}
        member={selectedMember}
        onClose={handleCloseModal}
        onSuccess={refetch}
      />
    </div>
  );
};

export default MembersPage;
