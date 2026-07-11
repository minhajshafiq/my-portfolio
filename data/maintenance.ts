export type PlanKey = 'essential' | 'visibility' | 'growth'

// Stripe Payment Links des formules (https://buy.stripe.com/...).
// Laisser à null tant que le lien n'existe pas : la carte retombe alors
// sur le CTA contact actuel, sans mention de paiement.
export const PLAN_PAYMENT_LINKS: Record<PlanKey, string | null> = {
  essential: 'https://buy.stripe.com/cNi6oJc854278RI9Bxcs800',
  visibility: 'https://buy.stripe.com/cNi00lfkhfKP0lc7tpcs801',
  growth: 'https://buy.stripe.com/fZu8wRc85eGLec28xtcs802',
}
