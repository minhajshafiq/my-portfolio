'use client'

import { useRef, useState } from 'react'
import type { ChangeEvent, ComponentType, FocusEvent, FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { trackEvent } from '@/utils/analytics'
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaEnvelope,
  FaExclamationCircle,
  FaLinkedinIn,
  FaPaperPlane,
} from 'react-icons/fa'
import { SiMalt } from 'react-icons/si'
import { EASE_SMOOTH, fadeUp } from '@/lib/motion'
import { SectionLabel } from '@/components/ui/SectionLabel'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

type FormData = {
  name: string
  email: string
  message: string
  activityType: string
  mainGoal: string
  hasExistingSite: string
}

type FormErrors = Partial<Record<keyof FormData, string>>
type TouchedFields = Partial<Record<keyof FormData, boolean>>

type ContactMethod = {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  href: string
  isPrimary?: boolean
}

const initialFormData: FormData = {
  name: '',
  email: '',
  message: '',
  activityType: '',
  mainGoal: '',
  hasExistingSite: '',
}

function SectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[4%] top-16 h-[clamp(15rem,24vw,28rem)] w-[clamp(15rem,24vw,28rem)] rounded-full bg-[#8C0605]/10 blur-3xl dark:bg-red-400/[0.08] lg:right-[10%] xl:right-[14%]" />

      <div className="absolute bottom-16 left-[2%] h-[clamp(14rem,20vw,24rem)] w-[clamp(14rem,20vw,24rem)] rounded-full bg-[#8C0605]/[0.08] blur-3xl dark:bg-red-400/[0.06] lg:left-[8%]" />

      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/18 to-transparent dark:from-black/20" />

      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white/14 to-transparent dark:from-black/20" />
    </div>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null

  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500"
    >
      <FaExclamationCircle className="h-3.5 w-3.5" />
      {message}
    </p>
  )
}

export function Contact({
  narrativeLine,
  narrativeKey,
}: { narrativeLine?: string; narrativeKey?: string } = {}) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})

  const { t } = useTranslation()
  const formRef = useRef<HTMLFormElement>(null)

  const tr = (key: string): string => {
    const value = t(key)
    return Array.isArray(value) ? value.join(' ') : String(value)
  }

  const resolvedNarrative = narrativeLine ?? (narrativeKey ? tr(narrativeKey) : undefined)

  const rawActivityTypeOptions = t('contact.activity_type_options', { returnObjects: true })
  const activityTypeOptions: string[] = Array.isArray(rawActivityTypeOptions)
    ? rawActivityTypeOptions.map(String)
    : []

  const rawMainGoalOptions = t('contact.main_goal_options', { returnObjects: true })
  const mainGoalOptions: string[] = Array.isArray(rawMainGoalOptions) ? rawMainGoalOptions.map(String) : []

  const contactMethods: ContactMethod[] = [
    {
      icon: FaCalendarAlt,
      title: tr('contact.methods.call.title'),
      description: tr('contact.methods.call.description'),
      href: 'https://calendly.com/minhaj-shafiq/30min',
      isPrimary: true,
    },
    {
      icon: FaEnvelope,
      title: tr('contact.email_title'),
      description: 'contact@minhajshafiq.com',
      href: 'mailto:contact@minhajshafiq.com',
    },
    {
      icon: FaLinkedinIn,
      title: tr('contact.linkedin_title'),
      description: tr('contact.methods.linkedin.description'),
      href: 'https://www.linkedin.com/in/minhajshafiq/',
    },
    {
      icon: SiMalt,
      title: tr('contact.malt_title'),
      description: tr('contact.methods.malt.description'),
      href: 'https://www.malt.fr/profile/minhajzubair',
    },
  ]

  const primaryContact = contactMethods.find((method) => method.isPrimary)
  const secondaryContacts = contactMethods.filter((method) => !method.isPrimary)
  const PrimaryIcon = primaryContact?.icon

  const validateName = (name: string) => /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/.test(name.trim())
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
  const validateMessage = (message: string) => message.trim().length >= 10

  // Seuls ces trois champs sont requis — les selects et le radio sont optionnels.
  const REQUIRED_FIELDS = ['name', 'email', 'message'] as const

  const validateField = (name: keyof FormData, value: string): string => {
    if (name === 'name' && !validateName(value)) {
      return tr('errors.invalid_name')
    }

    if (name === 'email' && !validateEmail(value)) {
      return tr('errors.invalid_email')
    }

    if (name === 'message' && !validateMessage(value)) {
      return tr('errors.invalid_message')
    }

    return ''
  }

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {}

    REQUIRED_FIELDS.forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName])

      if (error) {
        nextErrors[fieldName] = error
      }
    })

    return nextErrors
  }

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const fieldName = event.target.name as keyof FormData
    const { value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [fieldName]: value,
    }))

    if (touched[fieldName]) {
      const error = validateField(fieldName, value)

      setErrors((previousErrors) => ({
        ...previousErrors,
        [fieldName]: error,
      }))
    }
  }

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = event.target.name as keyof FormData
    const { value } = event.target

    setTouched((previousTouched) => ({
      ...previousTouched,
      [fieldName]: true,
    }))

    const error = validateField(fieldName, value)

    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: error,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (status === 'sending') return

    const nextErrors = validateForm()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setTouched({
        name: true,
        email: true,
        message: true,
      })
      return
    }

    const nativeFormData = new window.FormData(event.currentTarget)
    const botcheck = nativeFormData.get('botcheck')

    // Champ leurre invisible : une valeur indique très probablement un robot.
    if (typeof botcheck === 'string' && botcheck.trim()) return

    setStatus('sending')

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

      if (!accessKey) {
        setStatus('error')
        window.setTimeout(() => setStatus('idle'), 5000)
        return
      }

      const submissionData = new FormData()
      submissionData.append('name', formData.name.trim())
      submissionData.append('email', formData.email.trim())
      submissionData.append('message', formData.message.trim())
      if (formData.activityType) submissionData.append('activity_type', formData.activityType)
      if (formData.mainGoal) submissionData.append('main_goal', formData.mainGoal)
      if (formData.hasExistingSite) submissionData.append('has_existing_site', formData.hasExistingSite)
      submissionData.append('access_key', accessKey)
      submissionData.append('botcheck', '')
      submissionData.append('subject', `Nouveau message portfolio - ${formData.name.trim()}`)
      submissionData.append('from_name', 'Portfolio Minhaj Zubair')

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submissionData,
      })

      const data = await response.json()

      if (data.success) {
        trackEvent('contact_form_submit', {})
        setStatus('success')
        setFormData(initialFormData)
        setErrors({})
        setTouched({})
        formRef.current?.reset()
      } else {
        trackEvent('form_error', { reason: 'api' })
        setStatus('error')
      }

      window.setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      window.setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const getSubmitContent = () => {
    if (status === 'sending') {
      return (
        <>
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          {tr('contact.sending')}
        </>
      )
    }

    if (status === 'success') {
      return (
        <>
          <FaCheckCircle className="h-5 w-5" />
          {tr('contact.success')}
        </>
      )
    }

    if (status === 'error') {
      return (
        <>
          <FaExclamationCircle className="h-5 w-5" />
          {tr('contact.error')}
        </>
      )
    }

    return (
      <>
        <FaPaperPlane className="h-5 w-5" />
        {tr('contact.send')}
      </>
    )
  }

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-custom-primary py-[clamp(4rem,5.5vw,6.5rem)]"
    >
      <SectionBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-[clamp(2.5rem,4vw,5rem)]">
        <div className="mx-auto w-full max-w-[min(1120px,calc(100vw-5rem))] xl:max-w-[min(1160px,calc(100vw-7rem))] 2xl:max-w-[1160px]">
          {/* Section header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: EASE_SMOOTH }}
            className="relative mb-10 md:mb-12"
          >
            <div className="grid min-h-[clamp(12rem,20vh,17rem)] grid-cols-1 content-end gap-6 pb-9 pt-3 md:grid-cols-12 md:pb-10">
              <div className="md:col-span-8">
                <SectionLabel>{tr('contact.title')}</SectionLabel>

                {resolvedNarrative && (
                  <p className="mb-3 font-serif text-lg italic leading-snug text-custom-secondary md:text-xl">
                    {resolvedNarrative}
                  </p>
                )}

                <h2 className="max-w-[min(820px,100%)] font-serif text-4xl font-medium leading-[1.02] tracking-[-0.025em] text-custom-title sm:text-5xl md:text-[clamp(3rem,5vw,4.6rem)]">
                  {tr('contact.subtitle')}
                </h2>
              </div>

              <div className="md:col-span-4 md:self-end">
                <p className="max-w-sm text-sm leading-6 text-custom-secondary md:text-[15px] md:leading-7">
                  {tr('contact.quick_response_text')}
                </p>

                <div className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>

                  <span className="text-xs font-semibold text-green-600 dark:text-green-400 md:text-sm">
                    {tr('hero.available_for_work')}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-[#8C0605]/30 via-gray-300 to-transparent dark:from-red-400/30 dark:via-white/10" />
          </motion.div>

          <div className="mx-auto grid w-full max-w-[min(1080px,100%)] grid-cols-1 gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch lg:gap-10">
            {/* Contact methods */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.62, ease: EASE_SMOOTH }}
              className="flex h-full flex-col gap-5 lg:min-h-[660px]"
            >
              <div>
                <h3 className="max-w-[16ch] font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-custom-title">
                  {tr('contact.other_means')}
                </h3>
              </div>

              {primaryContact && PrimaryIcon && (
                <motion.a
                  href={primaryContact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('calendly_click', { source_section: 'contact' })}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative block overflow-hidden rounded-[1.75rem] bg-[#8C0605] p-6 text-white shadow-[0_22px_70px_rgba(140,6,5,0.20)] dark:bg-red-400 dark:text-gray-950 md:p-7"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 dark:bg-gray-950/10" />
                  <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-black/10 blur-3xl dark:bg-gray-950/10" />

                  <div className="relative z-10">
                    <div className="mb-6 inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-white/15 bg-white/15 backdrop-blur-md dark:border-gray-950/10 dark:bg-gray-950/10 md:h-14 md:w-14">
                      <PrimaryIcon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>

                    <h4 className="text-2xl font-black leading-tight tracking-[-0.04em]">
                      {primaryContact.title}
                    </h4>

                    <p className="mt-3 max-w-md text-sm leading-6 text-white/80 dark:text-gray-950/75 md:text-[15px]">
                      {primaryContact.description}
                    </p>

                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold">
                      {tr('contact.methods.call.action')}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </motion.a>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {secondaryContacts.map((method, index) => {
                  const MethodIcon = method.icon

                  return (
                    <motion.a
                      key={method.title}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent(
                          method.href.startsWith('mailto:') ? 'email_click' : 'contact_method_click',
                          { source_section: 'contact', method: method.title }
                        )
                      }
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{
                        delay: index * 0.07,
                        duration: 0.45,
                        ease: EASE_SMOOTH,
                      }}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white/76 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.055)] backdrop-blur-md transition-all hover:border-[#8C0605]/25 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-red-400/30"
                    >
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-custom text-[#8C0605] dark:text-red-400">
                        <MethodIcon className="h-4 w-4" />
                      </div>

                      <h4 className="mb-1 truncate text-sm font-black text-custom-title">
                        {method.title}
                      </h4>

                      <p className="truncate text-xs text-custom-secondary">
                        {method.description}
                      </p>

                      <span className="absolute right-4 top-4 text-custom-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#8C0605] dark:group-hover:text-red-400">
                        →
                      </span>
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.08, duration: 0.65, ease: EASE_SMOOTH }}
              className="h-full"
            >
              <div className="relative flex h-full min-h-[660px] flex-col overflow-hidden rounded-[2rem] border border-gray-200 bg-white/76 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.07)] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] md:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(140,6,5,0.08),transparent_34%)] dark:bg-[radial-gradient(circle_at_12%_20%,rgba(248,113,113,0.06),transparent_34%)]" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-8">
                    <h3 className="flex items-center gap-3 font-serif text-3xl font-medium tracking-[-0.02em] text-custom-title md:text-4xl">
                      {tr('contact.contact_form')}
                    </h3>
                  </div>

                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    aria-busy={status === 'sending'}
                    className="flex flex-1 flex-col"
                  >
                    <div hidden aria-hidden="true">
                      <label htmlFor="botcheck">Ne pas remplir ce champ</label>
                      <input id="botcheck" name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-bold text-custom-title"
                        >
                          {tr('contact.name')}
                        </label>

                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          autoComplete="name"
                          required
                          maxLength={50}
                          aria-invalid={Boolean(touched.name && errors.name)}
                          aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                          className={`w-full rounded-2xl border bg-white/70 px-4 py-3.5 text-custom-title outline-none transition-all duration-200 placeholder:text-custom-muted focus:ring-4 dark:bg-white/[0.04] ${errors.name
                              ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10'
                              : 'border-gray-200 focus:border-[#8C0605] focus:ring-[#8C0605]/10 dark:border-white/10 dark:focus:border-red-400 dark:focus:ring-red-400/10'
                            }`}
                          placeholder="John Doe"
                        />

                        {touched.name && <FieldError id="name-error" message={errors.name} />}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-bold text-custom-title"
                        >
                          {tr('contact.email')}
                        </label>

                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          autoComplete="email"
                          required
                          aria-invalid={Boolean(touched.email && errors.email)}
                          aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                          className={`w-full rounded-2xl border bg-white/70 px-4 py-3.5 text-custom-title outline-none transition-all duration-200 placeholder:text-custom-muted focus:ring-4 dark:bg-white/[0.04] ${errors.email
                              ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10'
                              : 'border-gray-200 focus:border-[#8C0605] focus:ring-[#8C0605]/10 dark:border-white/10 dark:focus:border-red-400 dark:focus:ring-red-400/10'
                            }`}
                          placeholder="john@example.com"
                        />

                        {touched.email && <FieldError id="email-error" message={errors.email} />}
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="activityType"
                            className="mb-2 block text-sm font-bold text-custom-title"
                          >
                            {tr('contact.activity_type_label')}{' '}
                            <span className="font-normal text-custom-muted">
                              {tr('contact.optional_tag')}
                            </span>
                          </label>

                          <select
                            id="activityType"
                            name="activityType"
                            value={formData.activityType}
                            onChange={handleInputChange}
                            className="w-full rounded-2xl border border-gray-200 bg-white/70 px-4 py-3.5 text-custom-title outline-none transition-all duration-200 focus:border-[#8C0605] focus:ring-4 focus:ring-[#8C0605]/10 dark:border-white/10 dark:bg-white/[0.04] dark:focus:border-red-400 dark:focus:ring-red-400/10"
                          >
                            <option value="">{tr('contact.activity_type_placeholder')}</option>
                            {activityTypeOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="mainGoal"
                            className="mb-2 block text-sm font-bold text-custom-title"
                          >
                            {tr('contact.main_goal_label')}{' '}
                            <span className="font-normal text-custom-muted">
                              {tr('contact.optional_tag')}
                            </span>
                          </label>

                          <select
                            id="mainGoal"
                            name="mainGoal"
                            value={formData.mainGoal}
                            onChange={handleInputChange}
                            className="w-full rounded-2xl border border-gray-200 bg-white/70 px-4 py-3.5 text-custom-title outline-none transition-all duration-200 focus:border-[#8C0605] focus:ring-4 focus:ring-[#8C0605]/10 dark:border-white/10 dark:bg-white/[0.04] dark:focus:border-red-400 dark:focus:ring-red-400/10"
                          >
                            <option value="">{tr('contact.main_goal_placeholder')}</option>
                            {mainGoalOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <span className="mb-2 block text-sm font-bold text-custom-title">
                          {tr('contact.has_site_label')}{' '}
                          <span className="font-normal text-custom-muted">
                            {tr('contact.optional_tag')}
                          </span>
                        </span>

                        <div className="flex gap-3" role="radiogroup" aria-label={tr('contact.has_site_label')}>
                          {[
                            { value: 'yes', label: tr('contact.has_site_yes') },
                            { value: 'no', label: tr('contact.has_site_no') },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              role="radio"
                              aria-checked={formData.hasExistingSite === option.value}
                              onClick={() =>
                                setFormData((previous) => ({
                                  ...previous,
                                  hasExistingSite: previous.hasExistingSite === option.value ? '' : option.value,
                                }))
                              }
                              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                                formData.hasExistingSite === option.value
                                  ? 'border-[#8C0605] bg-[#8C0605]/10 text-[#8C0605] dark:border-red-400 dark:bg-red-400/10 dark:text-red-400'
                                  : 'border-gray-200 text-custom-secondary hover:border-[#8C0605]/40 dark:border-white/10'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-sm font-bold text-custom-title"
                        >
                          {tr('contact.message')}
                        </label>

                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          rows={5}
                          required
                          minLength={10}
                          aria-invalid={Boolean(touched.message && errors.message)}
                          aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
                          className={`w-full resize-none rounded-2xl border bg-white/70 px-4 py-3.5 text-custom-title outline-none transition-all duration-200 placeholder:text-custom-muted focus:ring-4 dark:bg-white/[0.04] ${errors.message
                              ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10'
                              : 'border-gray-200 focus:border-[#8C0605] focus:ring-[#8C0605]/10 dark:border-white/10 dark:focus:border-red-400 dark:focus:ring-red-400/10'
                            }`}
                          placeholder={tr('contact.message_placeholder')}
                        />

                        {touched.message && <FieldError id="message-error" message={errors.message} />}
                      </div>
                    </div>

                    <div className="mt-auto pt-5">
                      <motion.button
                        type="submit"
                        disabled={status === 'sending'}
                        whileHover={{ y: status === 'sending' ? 0 : -2 }}
                        whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                        // Petit temps fort à l'envoi réussi : le bouton « respire » une fois
                        animate={status === 'success' ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                        transition={{ duration: 0.45, ease: EASE_SMOOTH }}
                        className={`flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-4 font-bold transition-all duration-300 ${status === 'sending'
                            ? 'cursor-not-allowed bg-gray-400 text-gray-700'
                            : status === 'success'
                              ? 'bg-green-500 text-white'
                              : status === 'error'
                                ? 'bg-red-500 text-white'
                                : 'bg-[#8C0605] text-white shadow-[0_18px_35px_rgba(140,6,5,0.22)] hover:bg-[#a70b0a] dark:bg-red-400 dark:text-gray-950 dark:hover:bg-red-300'
                          }`}
                      >
                        {/* Le contenu glisse d'un état à l'autre au lieu de sauter */}
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={status}
                            initial={{ y: 14, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -14, opacity: 0 }}
                            transition={{ duration: 0.2, ease: EASE_SMOOTH }}
                            aria-live="polite"
                            className="flex items-center justify-center gap-2"
                          >
                            {getSubmitContent()}
                          </motion.span>
                        </AnimatePresence>
                      </motion.button>

                      <p className="mt-5 text-center text-xs text-custom-muted">
                        {tr('contact.privacy_note')}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
