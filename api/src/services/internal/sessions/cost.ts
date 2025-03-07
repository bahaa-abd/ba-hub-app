import { ISession } from '../../../database/models/session.model';
import { SessionStatus } from '../../../utils/enum';

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

    // Total cost including additional cost
    session.totalCost = session.subtotal + session.additionalCost;
  } else {
    session.totalCost = session.additionalCost;
  }
  await session.save({ validateBeforeSave: false });

  return session;
};
