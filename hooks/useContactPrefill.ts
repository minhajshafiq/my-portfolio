'use client'

import { create } from 'zustand'

type PlanKey = 'essential' | 'visibility' | 'growth'

interface ContactPrefillState {
  requestedPlan: PlanKey | null
  requestPrefill: (plan: PlanKey) => void
  clearPrefill: () => void
}

export const useContactPrefill = create<ContactPrefillState>((set) => ({
  requestedPlan: null,
  requestPrefill: (plan) => set({ requestedPlan: plan }),
  clearPrefill: () => set({ requestedPlan: null }),
}))
