import { footer } from '@/content'

export function Footer() {
  return (
    <footer className="bg-[var(--text)] text-white">
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="font-heading font-semibold text-xl text-white hover:text-white/80
                                   transition-opacity inline-block mb-3">
              {footer.brand}
            </a>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-4 max-w-[200px]">
              {footer.tagline}
            </p>
            <p className="font-body text-xs text-white/40">
              {footer.madeBy}
            </p>
          </div>

          {/* Links */}
          {Object.entries(footer.links).map(([section, links]) => (
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

          <div className="flex items-center gap-4">
            {footer.socialLinks.map((social) => (
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
