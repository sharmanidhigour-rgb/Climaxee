"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MessageCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Using EmailJS - you'll need to set up EmailJS account
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "service_himanshu",
          template_id: "template_contact",
          user_id: "YOUR_EMAILJS_PUBLIC_KEY",
          template_params: {
            to_email: "sharmahimanshu40000@gmail.com",
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setSubmitStatus("idle"), 3000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="px-4 md:px-8 py-16 md:py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Get In Touch</h2>
        <p className="text-slate-400 text-center mb-12 text-balance">
          Have a project in mind? Let's discuss your game development needs
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Email Card */}
          <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-cyan-500/50 transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Mail className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Email</h3>
            </div>
            <p className="text-slate-400 mb-4">Send me an email directly</p>
            <a
              href="mailto:sharmahimanshu40000@gmail.com"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              sharmahimanshu40000@gmail.com
            </a>
          </Card>

          {/* Phone Card */}
          <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-cyan-500/50 transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Phone className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Phone</h3>
            </div>
            <p className="text-slate-400 mb-4">Call me for urgent matters</p>
            <a href="tel:+919783388579" className="text-cyan-400 hover:text-cyan-300 font-semibold transition">
              +91 9783388579
            </a>
          </Card>

          {/* WhatsApp Card */}
          <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-cyan-500/50 transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">WhatsApp</h3>
            </div>
            <p className="text-slate-400 mb-4">Quick chat on WhatsApp</p>
            <a
              href="https://wa.me/919783388579"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
            >
              Message on WhatsApp
            </a>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="bg-slate-800/50 border-slate-700 p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition"
                placeholder="Project inquiry"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            {submitStatus === "success" && (
              <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                Error sending message. Please try again or contact me directly.
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  )
}
