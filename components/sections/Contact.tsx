'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, Mail, Linkedin, CheckCircle, AlertCircle, ExternalLink, Calendar, Circle } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import FadeIn from '@/components/ui/FadeIn'
import Container from '@/components/ui/Container'

gsap.registerPlugin(ScrollTrigger)

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})
  const { t } = useTranslation()

  // Fonctions de validation
  const validateName = (name: string) => /^[a-zA-Z\s]{2,50}$/.test(name)
  const validateEmail = (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
  const validateMessage = (message: string) => message.length >= 10

  // Références pour les animations GSAP
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contactMethodsRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (touched[name]) {
      let error = ""
      if (!value.trim()) {
        error = t(`errors.${name}`) as string
      } else {
        if (name === "name" && !validateName(value)) error = t("errors.invalid_name") as string
        if (name === "email" && !validateEmail(value)) error = t("errors.invalid_email") as string
        if (name === "message" && !validateMessage(value)) error = t("errors.invalid_message") as string
      }
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    if (!touched[name]) {
      setTouched(prev => ({ ...prev, [name]: true }))
      handleInputChange(e)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')


    const newErrors: { [key: string]: string } = {}
    if (!formData.name || !validateName(formData.name)) newErrors.name = t("errors.invalid_name") as string
    if (!formData.email || !validateEmail(formData.email)) newErrors.email = t("errors.invalid_email") as string
    if (!formData.message || !validateMessage(formData.message)) newErrors.message = t("errors.invalid_message") as string

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setStatus('idle')
      setTouched({ name: true, email: true, message: true })
      return
    }

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
      if (!accessKey) {
        console.error('Clé Web3Forms manquante')
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
        return
      }

      const submissionData = new FormData()
      submissionData.append("name", formData.name)
      submissionData.append("email", formData.email)
      submissionData.append("message", formData.message)
      submissionData.append("access_key", accessKey)

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
        setTouched({})
      } else {
        console.error('Erreur Web3Forms:', data)
        setStatus('error')
      }
      
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const contactMethods = [
    {
      icon: Calendar,
      title: 'Réserver un appel',
      value: 'Calendrier de disponibilités',
      href: 'https://cal.com/minhajshafiq',
      isExternal: true,
      isPrimary: true
    },
    {
      icon: Mail,
      title: t('contact.email_title') as string,
      value: 'minhaj.shafiq@icloud.com',
      href: 'mailto:minhaj.shafiq@icloud.com',
      isExternal: true
    },
    {
      icon: Linkedin,
      title: t('contact.linkedin_title') as string,
      value: 'Profil LinkedIn',
      href: 'https://www.linkedin.com/in/minhajshafiq/',
      isExternal: true
    },
    {
      icon: ExternalLink,
      title: t('contact.malt_title') as string,
      value: 'Profil Malt',
      href: 'https://www.malt.fr/profile/minhajzubair',
      isExternal: true
    }
  ]


  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }

    if (contactMethodsRef.current) {
      gsap.fromTo(contactMethodsRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
      )
    }

    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-custom-primary relative overflow-hidden">
      {/* Effet de particules */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <Container size="xl">
        {/* En-tête */}
        <FadeIn delay={0.2}>
          <div ref={headerRef} className="text-center mb-16">
            {/* Badge de disponibilité */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full">
                <Circle className="w-2 h-2 fill-green-500 text-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  {t('hero.available_for_work')}
                </span>
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 relative">
              {t('contact.title')}
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-[#8C0605] dark:bg-[#FFD6D6] rounded-full"></span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-4xl lg:max-w-6xl mx-auto">
                     {/* Méthodes de contact */}
           <div ref={contactMethodsRef} className="space-y-8 h-fit mx-auto lg:mx-0 max-w-xl md:max-w-2xl lg:max-w-none">
             <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
               {t('contact.other_means')}
             </h3>
             
             <div className="space-y-4 md:space-y-6">
               {contactMethods.map((method) => (
                 <a
                   key={method.title}
                   href={method.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   className={`contact-method group flex items-center gap-4 p-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer ${
                     method.isPrimary
                       ? 'bg-[#8C0605] dark:bg-[#FFD6D6] border-2 border-[#8C0605] dark:border-[#FFD6D6] shadow-lg'
                       : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                   }`}
                 >
                   <div className={`p-3 rounded-lg transition-colors duration-300 ${
                     method.isPrimary
                       ? 'bg-white/20 dark:bg-gray-900/20 group-hover:bg-white/30 dark:group-hover:bg-gray-900/30'
                       : 'bg-[#8C0605]/10 dark:bg-[#FFD6D6]/10 group-hover:bg-[#8C0605]/20 dark:group-hover:bg-[#FFD6D6]/20'
                   }`}>
                     <method.icon className={`w-6 h-6 group-hover:scale-110 transition-transform duration-300 ${
                       method.isPrimary
                         ? 'text-white dark:text-gray-900'
                         : 'text-[#8C0605] dark:text-[#FFD6D6]'
                     }`} />
                   </div>
                   <div className="flex-1">
                     <h4 className={`font-semibold transition-colors duration-300 ${
                       method.isPrimary
                         ? 'text-white dark:text-gray-900 group-hover:text-white/90 dark:group-hover:text-gray-800'
                         : 'text-gray-900 dark:text-white group-hover:text-[#8C0605] dark:group-hover:text-[#FFD6D6]'
                     }`}>
                       {method.title}
                     </h4>
                     <p className={method.isPrimary
                       ? 'text-white/80 dark:text-gray-900/80'
                       : 'text-gray-600 dark:text-gray-300'
                     }>
                       {method.value}
                     </p>
                   </div>
                   {method.isExternal && (
                     <ExternalLink className={`w-4 h-4 transition-colors duration-300 ${
                       method.isPrimary
                         ? 'text-white/70 dark:text-gray-900/70 group-hover:text-white dark:group-hover:text-gray-900'
                         : 'text-gray-400 group-hover:text-[#8C0605] dark:group-hover:text-[#FFD6D6]'
                     }`} />
                   )}
                 </a>
               ))}
             </div>

             {/* Informations supplémentaires */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
               <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                 {t('contact.quick_response')}
               </h4>
               <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {t('contact.quick_response_text')}
                </p>
             </div>
           </div>

                     {/* Formulaire de contact */}
           <div className="space-y-8 h-fit mx-auto lg:mx-0 max-w-xl md:max-w-2xl lg:max-w-none">
             <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
               {t('contact.contact_form')}
             </h3>
             
             <div ref={formRef} className="bg-white dark:bg-gray-800 p-6 md:p-8 lg:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 relative overflow-hidden">
               {/* Effet de brillance */}
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8C0605]/5 dark:via-[#FFD6D6]/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
               
               <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 relative z-10">
               {/* Champ nom */}
               <div className="relative">
                 <input
                   type="text"
                   id="name"
                   name="name"
                   value={formData.name}
                   onChange={handleInputChange}
                   onBlur={handleBlur}
                   required
                   className={`peer w-full px-4 pt-5 pb-2 border rounded-lg bg-white dark:bg-gray-900 outline-none transition-all duration-200 focus:border-[#8C0605] dark:focus:border-[#FFD6D6] focus:ring-2 focus:ring-[#8C0605]/20 dark:focus:ring-[#FFD6D6]/20 border-gray-300 dark:border-gray-600 hover:border-[#8C0605]/50 dark:hover:border-[#FFD6D6]/50 ${errors.name ? "border-red-400" : ""}`}
                   placeholder=" "
                   aria-invalid={!!errors.name}
                   aria-describedby="name-error"
                 />
                 <label htmlFor="name"
                        className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#8C0605] dark:peer-focus:text-[#FFD6D6]">
                   {t('contact.name')}
                 </label>
                 {touched.name && errors.name && (
                   <p id="name-error" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                     {errors.name}
                   </p>
                 )}
               </div>

               {/* Champ email */}
               <div className="relative">
                 <input
                   type="email"
                   id="email"
                   name="email"
                   value={formData.email}
                   onChange={handleInputChange}
                   onBlur={handleBlur}
                   required
                   className={`peer w-full px-4 pt-5 pb-2 border rounded-lg bg-white dark:bg-gray-900 outline-none transition-all duration-200 focus:border-[#8C0605] dark:focus:border-[#FFD6D6] focus:ring-2 focus:ring-[#8C0605]/20 dark:focus:ring-[#FFD6D6]/20 border-gray-300 dark:border-gray-600 hover:border-[#8C0605]/50 dark:hover:border-[#FFD6D6]/50 ${errors.email ? "border-red-400" : ""}`}
                   placeholder=" "
                   aria-invalid={!!errors.email}
                   aria-describedby="email-error"
                 />
                 <label htmlFor="email"
                        className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#8C0605] dark:peer-focus:text-[#FFD6D6]">
                   {t('contact.email')}
                 </label>
                 {touched.email && errors.email && (
                   <p id="email-error" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                     {errors.email}
                   </p>
                 )}
               </div>

               {/* Champ message */}
               <div className="relative">
                 <textarea
                   id="message"
                   name="message"
                   value={formData.message}
                   onChange={handleInputChange}
                   onBlur={handleBlur}
                   required
                   rows={5}
                   className={`peer w-full px-4 pt-5 pb-2 border rounded-lg bg-white dark:bg-gray-900 outline-none transition-all duration-200 focus:border-[#8C0605] dark:focus:border-[#FFD6D6] focus:ring-2 focus:ring-[#8C0605]/20 dark:focus:ring-[#FFD6D6]/20 border-gray-300 dark:border-gray-600 hover:border-[#8C0605]/50 dark:hover:border-[#FFD6D6]/50 resize-none ${errors.message ? "border-red-400" : ""}`}
                   placeholder=" "
                   aria-invalid={!!errors.message}
                   aria-describedby="message-error"
                 />
                 <label htmlFor="message"
                        className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#8C0605] dark:peer-focus:text-[#FFD6D6]">
                   {t('contact.message')}
                 </label>
                 {touched.message && errors.message && (
                   <p id="message-error" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                     {errors.message}
                   </p>
                 )}
               </div>

                             {/* Bouton d'envoi */}
               <button
                 ref={submitButtonRef}
                 type="submit"
                 disabled={status === 'sending'}
                 className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold transition-colors duration-200 ${
                   status === 'sending'
                     ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                     : 'bg-[#8C0605] text-white hover:bg-[#8C0605]/90 cursor-pointer'
                 }`}
               >
                {status === 'sending' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t('contact.sending')}
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {t('contact.success')}
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    {t('contact.error')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('contact.send')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        </div>
      </Container>
    </section>
  )
}
