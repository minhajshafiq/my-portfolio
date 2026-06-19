'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import {
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaLinkedinIn,
  FaEnvelope,
  FaCalendarAlt,
} from 'react-icons/fa'
import { SiMalt } from 'react-icons/si'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})
  const { t } = useTranslation()
  const formRef = useRef<HTMLFormElement>(null)

  const contactMethods = [
    {
      icon: FaCalendarAlt,
      title: t('contact.methods.call.title') as string,
      description: t('contact.methods.call.description') as string,
      href: 'https://calendly.com/minhaj-shafiq/30min',
      color: 'from-purple-500 to-pink-500',
      isPrimary: true,
    },
    {
      icon: FaEnvelope,
      title: t('contact.email_title') as string,
      description: 'contact@minhajshafiq.com',
      href: 'mailto:contact@minhajshafiq.com',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FaLinkedinIn,
      title: t('contact.linkedin_title') as string,
      description: t('contact.methods.linkedin.description') as string,
      href: 'https://www.linkedin.com/in/minhajshafiq/',
      color: 'from-[#0A66C2] to-blue-600',
    },
    {
      icon: SiMalt,
      title: t('contact.malt_title') as string,
      description: t('contact.methods.malt.description') as string,
      href: 'https://www.malt.fr/profile/minhajzubair',
      color: 'from-[#FC5757] to-red-600',
    },
  ]

  const validateName = (name: string) => /^[a-zA-ZÀ-ÿ\s]{2,50}$/.test(name)
  const validateEmail = (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
  const validateMessage = (message: string) => message.length >= 10

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      let error = ''
      if (!value.trim()) {
        error = t(`errors.${name}`) as string
      } else {
        if (name === 'name' && !validateName(value))
          error = t('errors.invalid_name') as string
        if (name === 'email' && !validateEmail(value))
          error = t('errors.invalid_email') as string
        if (name === 'message' && !validateMessage(value))
          error = t('errors.invalid_message') as string
      }
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target
    if (!touched[name]) {
      setTouched((prev) => ({ ...prev, [name]: true }))
      handleInputChange(e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const newErrors: { [key: string]: string } = {}
    if (!formData.name || !validateName(formData.name))
      newErrors.name = t('errors.invalid_name') as string
    if (!formData.email || !validateEmail(formData.email))
      newErrors.email = t('errors.invalid_email') as string
    if (!formData.message || !validateMessage(formData.message))
      newErrors.message = t('errors.invalid_message') as string

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setStatus('idle')
      setTouched({ name: true, email: true, message: true })
      return
    }

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
      if (!accessKey) {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
        return
      }

      const submissionData = new FormData()
      submissionData.append('name', formData.name)
      submissionData.append('email', formData.email)
      submissionData.append('message', formData.message)
      submissionData.append('access_key', accessKey)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submissionData,
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
        setTouched({})
      } else {
        setStatus('error')
      }

      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="py-20 bg-custom-primary overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-[#8C0605] dark:text-[#FFD6D6] font-mono text-sm tracking-widest uppercase mb-4 block">
              {'>> '}{t('contact.title')}
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-custom-title leading-none mb-6">
              {t('contact.subtitle')}
            </h2>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-full px-5 py-2.5 mt-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-green-600 dark:text-green-400 font-medium">
                {t('hero.available_for_work')}
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left column - Contact methods */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {t('contact.other_means')}
              </h3>

              {/* Primary contact - Réserver un appel */}
              {contactMethods.filter(m => m.isPrimary).map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="block group relative p-5 rounded-2xl transition-all duration-300 overflow-hidden bg-[#8C0605] text-white"
                >
                  <div className="inline-flex p-3 rounded-xl mb-3 bg-white/20">
                    <method.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-bold mb-1 text-white">{method.title}</h4>
                  <p className="text-sm text-white/80">{method.description}</p>
                  <div className="absolute top-5 right-5 transition-transform duration-300 group-hover:translate-x-1 text-white/70">
                    →
                  </div>
                </motion.a>
              ))}

              {/* Secondary contacts - Email, LinkedIn, Malt */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {contactMethods.filter(m => !m.isPrimary).map((method, index) => (
                  <motion.a
                    key={method.title}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index + 1) * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group relative p-4 rounded-2xl transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg"
                  >
                    <div className={`inline-flex p-3 rounded-xl mb-3 bg-gradient-to-br ${method.color}`}>
                      <method.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold mb-1 text-gray-900 dark:text-white text-sm">
                      {method.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {method.description}
                    </p>
                    <div className="absolute top-4 right-4 transition-transform duration-300 group-hover:translate-x-1 text-gray-400">
                      →
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Info card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900 dark:bg-black p-6 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">⚡</span>
                  <h4 className="text-white font-bold">{t('contact.quick_response')}</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('contact.quick_response_text')}
                </p>
              </motion.div>
            </motion.div>

            {/* Right column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="text-2xl">✉️</span>
                  {t('contact.contact_form')}
                </h3>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 transition-all duration-200 outline-none ${
                        errors.name
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-gray-200 dark:border-gray-700 focus:border-[#8C0605] dark:focus:border-[#FFD6D6]'
                      }`}
                      placeholder="John Doe"
                    />
                    {touched.name && errors.name && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <FaExclamationCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 transition-all duration-200 outline-none ${
                        errors.email
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-gray-200 dark:border-gray-700 focus:border-[#8C0605] dark:focus:border-[#FFD6D6]'
                      }`}
                      placeholder="john@example.com"
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <FaExclamationCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t('contact.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-2 transition-all duration-200 outline-none resize-none ${
                        errors.message
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-gray-200 dark:border-gray-700 focus:border-[#8C0605] dark:focus:border-[#FFD6D6]'
                      }`}
                      placeholder={t('contact.message_placeholder') as string}
                    />
                    {touched.message && errors.message && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <FaExclamationCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                    whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                      status === 'sending'
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : status === 'success'
                        ? 'bg-green-500 text-white'
                        : status === 'error'
                        ? 'bg-red-500 text-white'
                        : 'bg-[#8C0605] hover:bg-[#8C0605]/90 text-white'
                    }`}
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t('contact.sending')}
                      </>
                    ) : status === 'success' ? (
                      <>
                        <FaCheckCircle className="w-5 h-5" />
                        {t('contact.success')}
                      </>
                    ) : status === 'error' ? (
                      <>
                        <FaExclamationCircle className="w-5 h-5" />
                        {t('contact.error')}
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="w-5 h-5" />
                        {t('contact.send')}
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Privacy note */}
                <p className="text-center text-gray-400 text-xs mt-4">
                  🔒 {t('contact.privacy_note')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
