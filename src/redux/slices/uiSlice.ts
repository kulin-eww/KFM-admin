import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  timestamp: string;
  isRead: boolean;
}

interface UIState {
  anchorElId: string | null;
  isNotificationOpen: boolean;
  notifications: Notification[];
}

const initialState: UIState = {
  anchorElId: null,
  isNotificationOpen: false,
  notifications: [
    {
      id: '1',
      title: 'New Booking Request',
      message: 'You have received a new booking request for container #CTR-001. Please review and respond.',
      type: 'info',
      timestamp: '2 minutes ago',
      isRead: false,
    },
    {
      id: '2',
      title: 'Payment Received',
      message: 'Payment of SAR 1,500 has been received for booking #BKG-2024-001.',
      type: 'success',
      timestamp: '1 hour ago',
      isRead: false,
    },
    {
      id: '3',
      title: 'Driver Assignment',
      message: 'Driver Ahmed Al-Rashid has been assigned to your booking #BKG-2024-002.',
      type: 'info',
      timestamp: '3 hours ago',
      isRead: true,
    },
    {
      id: '4',
      title: 'Container Maintenance',
      message: 'Container #CTR-005 requires maintenance. Please schedule inspection.',
      type: 'warning',
      timestamp: '1 day ago',
      isRead: true,
    },
    {
      id: '5',
      title: 'Booking Completed',
      message: 'Your booking #BKG-2024-003 has been completed successfully.',
      type: 'success',
      timestamp: '2 days ago',
      isRead: true,
    },
  ],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAnchorElId(state, action: PayloadAction<string | null>) {
      state.anchorElId = action.payload;
    },
    setNotificationOpen(state, action: PayloadAction<boolean>) {
      state.isNotificationOpen = action.payload;
    },
    markNotificationAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    markAllNotificationsAsRead(state) {
      state.notifications.forEach(notification => {
        notification.isRead = true;
      });
    },
    addNotification(state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'isRead'>>) {
      const newNotification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: 'Just now',
        isRead: false,
      };
      state.notifications.unshift(newNotification);
    },
  },
});

export const {
  setAnchorElId,
  setNotificationOpen,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  addNotification
} = uiSlice.actions;
export default uiSlice.reducer;
