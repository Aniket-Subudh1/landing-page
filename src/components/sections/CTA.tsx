'use client'

import React from 'react'
import Card from '../ui/Card'

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Arjit Mohanty',
      title: 'Swastik Pg , Bhubaneswar',
      avatar: '/avatars/arjit.png', // replace with actual image path
      quote: `Earlier rent collection was full headache... tenants delay, I keep sending reminders, and complaints were all over WhatsApp.

With EasyMyPG app, rent comes on time and complaints are tracked automatically. For me, it’s so easy now — I just open the app and everything is clear.`
    },
    {
      name: 'Ananta Sahu',
      title: 'Gharapna PG Operator, Mumbai',
      avatar: '/avatars/ananta.png',
      quote: `Handling 50+ tenants in Mumbai was total mess with Excel and calls. Since I joined EasyMyPG waitlist and got access, life is simple.

Rent reminders go automatically, tenants pay on time, even their complaints come in-app. I actually save time and tenants also feel system is professional.`
    },
    {
      name: 'Riya Verma',
      title: 'Riya PG Operator, Bengaluru',
      avatar: '/avatars/riya.png',
      quote: `I love how friendly this app is. Before, tenants kept calling me for small issues and I had no proper record. Now they raise it in the app, and I track everything easily.

Rent is smooth, no tension of late payments. Finally feels like I’m running my PG smart, not struggling daily.`
    }
  ]

  return (
    <section className="py-20 md:-mt-24 -mt-16 bg-white">
      <div className="max-w-5xl  mx-auto text-center px-6">
        {/* Heading */}
        <h2 className="text-xl sm:text-4xl lg:text-4xl  text-[#1c0a28] leading-snug mb-16">
          <span className="text-lg sm:text-5xl lg:text-4xl text-[#1c0a28]">
          <em className="italic font-normal"> "15x</em> More <em className="italic font-normal">Revenue</em>. <em className="italic font-normal">15x</em> Less <em className="italic font-normal">Stress</em>.
          </span>
          <br />
          <span className="mt-2 block text-[#1c0a28]">One Super App for Your PG."</span>
        </h2>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {testimonials.map((t, i) => (
            <Card key={i} className="p-6 rounded-2xl border border-gray-200 shadow-sm bg-white">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.title}</div>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                "{t.quote}"
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
