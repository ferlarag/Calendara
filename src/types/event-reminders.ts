export interface EventAttachment {
  id: string;
  title: string;
  link: string;
}

export interface EventReminders {
  requestUserForConfirmation: boolean;
  requestConfirmationHours?: number;
  remindOneDayBefore: boolean;
  remindTwoDaysBefore: boolean;
  remindOneWeekBefore: boolean;
  remindTwoWeekBefore: boolean;
  remindOneMonthBefore: boolean;
  attachments: EventAttachment[];
}
