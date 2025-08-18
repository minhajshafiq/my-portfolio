'use client'

import { create } from 'zustand'

interface LoaderState {
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useLoader = create<LoaderState>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}))
