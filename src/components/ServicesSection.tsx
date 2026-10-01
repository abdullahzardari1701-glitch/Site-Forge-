import React from 'react';
import { 
  Palette, 
  Code, 
  Smartphone, 
  Building, 
  Zap, 
  FolderGit2, 
  ShoppingBag, 
  RefreshCw, 
  Search, 
  MessageSquare, 
  MapPin, 
  Share2, 
  Cpu,
  ArrowRight
} from 'lucide-react';

interface ServicesSectionProps {
  onStartRequest: () => void;
}

const SERVICES_LIST = [
  {
    num: '01',
    title: 'Website Design & UI/UX',
    description: 'Clean, modern typography, intentional color palettes, and intuitive user interfaces tailored to your brand personality.',
    icon: Palette,
  },
  {
    num: '02',
    title: 'Website Development',
    description: 'Standards-compliant, fast-loading frontend and backend code built with modern frameworks for long-term stability.',
    icon: Code,
  },
  {
    num: '03',
    title: 'Responsive Mobile Optimization',
    description: 'Every layout is engineered mobile-first so your clients have a seamless experience across iPhones, Androids, tablets, and desktops.',
    icon: Smartphone,
  },
  {
    num: '04',
    title: 'Business & Corporate Websites',
    description: 'Establish high trust with structured company profiles, service catalogs, team highlights, and inquiry capture funnels.',
    icon: Building,
  },
  {
    num: '05',
    title: 'High-Converting Landing Pages',
    description: 'Single-page lead generation sites optimized for campaigns, promotions, product waitlists, and direct customer contact.',
    icon: Zap,
  },
  {
    num: '06',
    title: 'Portfolio & Creative Showcases',
    description: 'Visual galleries and project case studies that showcase your past work with crisp photography and fast loading speeds.',
    icon: FolderGit2,
  },
  {
    num: '07',
    title: 'E-commerce & Catalog Stores',
    description: 'Product listings, category filters, secure shopping carts, and direct payment or WhatsApp ordering integrations.',
    icon: ShoppingBag,
  },
  {
    num: '08',
    title: 'Website Redesign & Modernization',
    description: 'Upgrade outdated or slow websites to clean, high-performance modern architectures without losing your existing content.',
    icon: RefreshCw,
  },
  {
    num: '09',
    title: 'Basic Search Engine Optimization (SEO)',
    description: 'Proper title tags, meta descriptions, semantic HTML headings, OpenGraph preview cards, and Google search readiness.',
    icon: Search,
  },
  {
    num: '10',
    title: 'Contact & WhatsApp Direct Integration',
    description: 'Allow customers to message you immediately on WhatsApp or call your mobile with a single tap from any device.',
    icon: MessageSquare,
  },
  {
    num: '11',
    title: 'Google Maps & Local Store Embed',
    description: 'Integrated interactive maps, shop directions, working hours, and physical address details to drive foot traffic.',
    icon: MapPin,
  },
  {
    num: '12',
    title: 'Social Media & Channel Links',
    description: 'Seamless linking to your official Instagram, Facebook, YouTube, LinkedIn, and other channels for cross-platform audience growth.',
    icon: Share2,
  },
  {
    num: '13',
    title: 'Custom Web Solutions',
    description: 'Need specific forms, database management, client portals, or specialized calculators? We engineer tailored workflows.',
    icon: Cpu,
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onStartRequest }) => {
  return (
    <section id="services" className="py-20 bg-[#080c14] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            Professional Web Capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Website Creation Services
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            We focus on practical, dependable digital solutions that help your business get found, build trust, and receive real inquiries.
          </p>
        </div>

        {/* Services Bento-List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.num}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-cyan-400/80 font-semibold tracking-wider">
                      {service.num}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/60">
                  <button
                    onClick={onStartRequest}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  >
                    <span>Request this service</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Realistic Promise Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Realistic & Transparent Delivery</h4>
            <p className="text-xs text-slate-400 max-w-xl">
              We do not make exaggerated claims. You receive clear timelines, direct communication with developer Abdullah Zardari, and a website configured to your exact specifications.
            </p>
          </div>
          <button
            onClick={onStartRequest}
            className="px-5 py-2.5 text-xs font-bold text-cyan-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            Start Your Request
          </button>
        </div>

      </div>
    </section>
  );
};
