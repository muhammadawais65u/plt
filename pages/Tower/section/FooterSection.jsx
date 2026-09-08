"use client";

export default function FooterSection() {
  return (
    <footer className="bg-black text-white py-8 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Company Info */}
          <div className="md:col-span-3">
            <div className="text-lg leading-tight">
              PLT Tower Srl<br />
              <span className="text-xs inline-block">
                a part of{' '}
                <a 
                  href="https://www.pltenergia.it/EN/Home#ilgruppo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  PLT holding Srl
                </a>
              </span>
            </div>
          </div>
          
          {/* Legal Info */}
          <div className="md:col-span-9 pt-3 leading-relaxed">
            <div className="text-sm">
              <span className="text-nowrap">VAT 04455950404 - </span>
              <span className="text-nowrap">© 2026 plttower.com</span>
              <span className="text-nowrap"> - </span>
              <a 
                href="/privacy-policy" 
                className="text-white/60 hover:text-white transition-colors"
              >
                PRIVACY POLICY
              </a>
              <span className="text-nowrap"> - </span>
              <a 
                href="/cookie-policy" 
                className="text-white/60 hover:text-white transition-colors"
              >
                COOKIE POLICY
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
