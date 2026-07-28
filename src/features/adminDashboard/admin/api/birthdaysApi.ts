import apiClient from '../../../../services/apiClient';

export interface MemberBirthday {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth: string;
}

export const birthdaysApi = {
  getTodayBirthdays: async (): Promise<MemberBirthday[]> => {
    const response = await apiClient.get('/admin/birthdays/today');
    return response.data?.data || response.data || [];
  },

  getThisMonthBirthdays: async (): Promise<MemberBirthday[]> => {
    const response = await apiClient.get('/admin/birthdays/this-month');
    return response.data?.data || response.data || [];
  },
};