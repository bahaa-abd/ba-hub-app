export enum Gender {
  Male,
  Female,
}

export enum SubscriptionStatus {
  pending = "pending",
  active = "active",
  expired = "expired",
  cancelled = "cancelled",
}

export enum SessionStatus {
  started = "started",
  ended = "ended",
  cancelled = "cancelled",
}

export enum DessertType {
  drink = "drink",
  meal = "meal",
}

export enum DessertTypeAr {
  مشروب = "drink",
  وجبة = "meal",
}

export enum PlanDuration {
  month = "month",
  year = "year",
  free = "free",
}

export enum SubscriptionOrderStatus {
  approved = "approved",
  refused = "refused",
  pending = "pending",
}

export enum OrganizationStatus {
  approved = "approved",
  refused = "refused",
  pending = "pending",
}

export enum Role {
  admin = "ADMIN",
  user = "USER",
}

export enum PaymentStatus {
  failed = "failed",
  pending = "pending",
  success = "success",
}

export enum LanguageCode {
  ar = "ar",
  en = "en",
}
