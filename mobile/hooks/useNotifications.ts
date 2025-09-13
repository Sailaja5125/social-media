import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../utils/api";

export const useNotifications = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const {
    data: notificationsData,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["notification"],
    queryFn: () => api.get("/notification/"),
    select: (res) => res.data.notification,
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: (notificationId: string) => api.delete(`/notification/${notificationId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notification"] }),
  });

  const deleteNotification = (notificationId: string) => {
    deleteNotificationMutation.mutate(notificationId);
  };

  return {
    notifications: notificationsData || [],
    isLoading,
    error,
    refetch,
    isRefetching,
    deleteNotification,
    isDeletingNotification: deleteNotificationMutation.isPending,
  };
};