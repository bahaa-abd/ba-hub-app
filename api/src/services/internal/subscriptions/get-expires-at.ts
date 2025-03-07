import { PlanDuration } from '../../../utils/enum';

export const getExpiresAt = (duration: PlanDuration, date = new Date()) => {
  const msInDay = 24 * 60 * 60 * 1000;
  // const freeDaysInMs = freeDays * msInDay
  switch (duration) {
    case PlanDuration.month:
      return new Date(date.getTime() + 30 * msInDay);
    case PlanDuration.year:
      return new Date(date.getTime() + 365 * msInDay);
    default:
      return new Date(date.getTime() + 7 * msInDay);
  }
};
