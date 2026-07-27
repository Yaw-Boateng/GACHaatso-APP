import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Member, MemberFilterParams } from '../types';
import { membersApi } from '../api/members';

export const useMembers = (initialParams: MemberFilterParams = { page: 1, limit: 10 }) => {
  const [params, setParams] = useState<MemberFilterParams>(initialParams);
  const queryClient = useQueryClient();

  // Convert API parameters (0-based for Spring Boot)
  const apiParams = {
    search: params.search || undefined,
    role: params.role || undefined,
    status: params.status || undefined,
    page: params.page ? params.page - 1 : 0,
    size: params.limit || 10,
  };

  // Main fetch query using TanStack Query
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['members', params],
    queryFn: () => membersApi.getMembers(apiParams),
    // Fix in useMembers.ts
select: (res) => {
  // Handle optional wrapper objects (e.g. res.data.data vs res.data)
  const pageData = res.data?.content ? res.data : res.data?.data || res.data || {};
  
  return {
    members: (pageData.content || (Array.isArray(pageData) ? pageData : [])) as Member[],
    pagination: {
      total: pageData.totalElements ?? 0,
      page: (pageData.number ?? 0) + 1,
      limit: pageData.size ?? 10,
      totalPages: pageData.totalPages ?? 1,
    },
  };
},
  });

  // Reusable helper for local CRUD mutations
  const invalidateMembers = () => {
    queryClient.invalidateQueries({ queryKey: ['members'], exact: false });
  };

  const createMutation = useMutation({
    mutationFn: ({ data, file }: { data: Partial<Member>; file?: File | null }) =>
      membersApi.createMember(data, file),
    onSuccess: invalidateMembers,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data, file }: { id: string; data: Partial<Member>; file?: File | null }) =>
      membersApi.updateMember(id, data, file),
    onSuccess: invalidateMembers,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => membersApi.deleteMember(id),
    onSuccess: invalidateMembers,
  });

  return {
    members: data?.members || [],
    loading: isLoading,
    actionLoading: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    error: error ? (error as any)?.response?.data?.message || 'Failed to load members' : null,
    pagination: data?.pagination || { total: 0, page: 1, limit: 10, totalPages: 1 },
    params,
    setParams,
    refetch,
    createMember: (data: Partial<Member>, file?: File | null) => createMutation.mutateAsync({ data, file }),
    updateMember: (id: string, data: Partial<Member>, file?: File | null) => updateMutation.mutateAsync({ id, data, file }),
    deleteMember: (id: string) => deleteMutation.mutateAsync(id),
  };
};