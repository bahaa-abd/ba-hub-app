import { InternalError, NotFoundError } from '../../../core/ApiError';
import { organizationRepository } from '../../../database/repositories/organization.repository';
import { paymentRepository } from '../../../database/repositories/payment.repository';
import { planRepository } from '../../../database/repositories/plan.repository';
import { subscriptionRepository } from '../../../database/repositories/subscription.repository';
import { ISubscriptionCreateSchema } from '../../../schemas/subscription.schema';
import { SubscriptionStatus, PaymentStatus } from '../../../utils/enum';
import { needRecord } from '../../../utils/record';
import { getExpiresAt } from './get-expires-at';

export async function createSubscriptionService(
  data: ISubscriptionCreateSchema,
) {
  const organization = needRecord(
    await organizationRepository.findById(data.organizationId),
    new NotFoundError('Organization not found'),
  );

  const plan = needRecord(
    await planRepository.findById(data.planId),
    new NotFoundError('Plan not found'),
  );

  data.expiresDate = data.expiresDate ?? getExpiresAt(plan.duration);

  data.status = data.status ?? SubscriptionStatus.active;

  const subscription = await subscriptionRepository.insert(data);
  if (subscription === null) {
    throw new InternalError();
  }

  organization.recentSubscriptionId = subscription.id;
  await organizationRepository.patchById(organization.id, organization);

  await paymentRepository.insert({
    status: PaymentStatus.success,
    amount: data.price ?? plan.price,
    subscriptionId: subscription.id,
    organizationId: organization.id,
  });

  return subscription;
}
