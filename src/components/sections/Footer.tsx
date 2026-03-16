const footerLinks = {
  Product: [
    { label: 'The Rituals', href: '#rituals' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '/pricing/' },
    { label: 'Download the App', href: '#download' },
  ],
  Company: [
    { label: 'About Panbuddha', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Support: [
    { label: 'Help Centre', href: '/support/' },
    { label: 'Contact Us', href: 'mailto:hello@mindbodyritual.ca' },
    { label: 'Privacy Policy', href: '/privacy/' },
    { label: 'Terms of Service', href: '/terms/' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[var(--text)] text-white">
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="font-heading font-semibold text-xl text-white hover:text-white/80
                                   transition-opacity inline-block mb-3">
              MindBodyRitual
            </a>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-4 max-w-[200px]">
              25 minutes. Five rituals. One family.
            </p>
            <p className="font-body text-xs text-white/40">
              By Panbuddha · Made in Canada 🇨🇦
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-body font-semibold text-xs uppercase tracking-widest
                             text-white/40 mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-white/70 hover:text-white
                                 transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40 text-center sm:text-left">
            © {new Date().getFullYear()} Panbuddha Inc. All rights reserved.
          </p>

          {/* Social links placeholder */}
          <div className="flex items-center gap-4">
            {['Instagram', 'TikTok', 'Facebook'].map((social) => (
              <a
                key={social}
                href="#"
                className="font-body text-xs text-white/40 hover:text-white/80 transition-colors"
                aria-label={social}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
