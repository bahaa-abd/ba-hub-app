import { ISession } from '../../../database/models/session.model';
import { SessionStatus } from '../../../utils/enum';

function roundUpToNext500(value: number): number {
  return Math.ceil(value / 500) * 500;
}

export const calculateCost = async (
  session: ISession,
  organizationHourlyRate: number,
) => {
  session.status = SessionStatus.ended;
  session.endTime = new Date();
  session.additionalCost = session.desserts.reduce(
    (sum, element) => sum + element.dessert.price * element.count,
    0,
  );

  if (session.totalCost === null) {
    const durationInHours =
      (session.endTime.getTime() - session.startTime.getTime()) / (1000 * 3600);

    session.subtotal =
      Math.max(
        organizationHourlyRate,
        Math.ceil(durationInHours * organizationHourlyRate),
      ) * session.numberOfPersons;

    const rawTotal = session.subtotal + session.additionalCost;
    session.totalCost = roundUpToNext500(rawTotal);
  } else {
    session.totalCost = roundUpToNext500(session.additionalCost);
  }

  await session.save({ validateBeforeSave: false });

  return session;
};
