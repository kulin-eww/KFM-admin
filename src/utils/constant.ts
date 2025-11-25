export const LENGTH = {
  PHONE_NUMBER_LENGTH: 10,
  POSTAL_CODE_LENGTH: 6,
  MAX_STRING_LENGTH: 70,
  MIN_STRING_LENGTH: 2,
  MAX_NUMBER_LENGTH: 20,
  MIN_NUMBER_LENGTH: 1,
  MAX_PASSWORD_LENGTH: 15,
  MIN_PASSWORD_LENGTH: 8,
  MAX_FILE_SIZE: 5 * 1024 * 1024,
};

export const REGEX = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i,
  START_END_SPACE: /^\S.*\S$|^\S{1}$/,
  NUMBERS_ONLY: /^[0-9]+$/,
  DECIMAL_ONLY: /^[0-9]+(\.[0-9]{1,2})?$/,
};

export const BOOKING_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  DISPATCHED: "dispatched",
  DELIVERED: "delivered",
  PICKEDUP: "pickedup",
  DELIVERED_DUMP: "delivered_dump",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const REPLACEMENT_REQUEST_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
};

export const PAYMENT_STATUS = {
  SUCCESS: "success",
  FAILED: "failed",
  PENDING: "pending",
};
