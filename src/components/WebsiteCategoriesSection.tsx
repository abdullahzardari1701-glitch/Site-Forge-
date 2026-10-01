import React, { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  UserCheck, 
  ShoppingBag, 
  UtensilsCrossed, 
  Sparkles, 
  Gem, 
  Home, 
  GraduationCap, 
  BookOpen, 
  HeartHandshake, 
  Stethoscope, 
  Hotel, 
  Compass, 
  Store, 
  Layers, 
  ArrowRight,
  Check
} from 'lucide-react';

interface WebsiteCategoriesSectionProps {
  onRequestCategory: (categoryName: string) => void;
}

interface CategoryInfo {
  name: string;
  group: 'all' | 'business' | 'retail' | 'services' | 'personal' | 'organizations';
  icon: any;
  description: string;
  popularFeatures: string[];
}

const CATEGORIES: CategoryInfo[] = [
  {
    name: 'Business Website',
    group: 'business',
    icon: Building2,
    description: 'Corporate company websites with service portfolios, inquiry forms, and professional branding.',
    popularFeatures: ['Lead capture forms', 'Service showcases', 'Client testimonials', 'WhatsApp CTA'],
  },
  {
    name: 'Portfolio Website',
    group: 'personal',
    icon: Briefcase,
    description: 'Visual showcases for designers, photographers, architects, developers, and creative professionals.',
    popularFeatures: ['Project case studies', 'High-res gallery', 'Resume download', 'Contact form'],
  },
  {
    name: 'Personal Website',
    group: 'personal',
    icon: UserCheck,
    description: 'Personal brands, consultants, authors, speakers, and executives establishing an online authority.',
    popularFeatures: ['Biography section', 'Speaking & media', 'Social media links', 'Newsletter sign-up'],
  },
  {
    name: 'E-commerce Website',
    group: 'retail',
    icon: ShoppingBag,
    description: 'Online stores with catalog browsing, shopping carts, checkout, inventory, and payment gateways.',
    popularFeatures: ['Product filters', 'Secure checkout', 'Order tracking', 'Payment integration'],
  },
  {
    name: 'Restaurant Website',
    group: 'services',
    icon: UtensilsCrossed,
    description: 'Mouth-watering digital food menus, table reservation requests, location map, and direct orders.',
    popularFeatures: ['Interactive menu', 'Table reservation form', 'Opening hours', 'Google Maps link'],
  },
  {
    name: 'Salon & Beauty Website',
    group: 'services',
    icon: Sparkles,
    description: 'Chic websites for beauty parlours, hair salons, spas, and makeup artists with service rate cards.',
    popularFeatures: ['Service price list', 'Before/after gallery', 'WhatsApp booking', 'Stylist profiles'],
  },
  {
    name: 'Jewellery Website',
    group: 'retail',
    icon: Gem,
    description: 'Luxury design showcases for gold, diamond, silver, and artisanal custom jewelry collections.',
    popularFeatures: ['Luxury dark/gold theme', 'Hallmark verification info', 'Custom order inquiries', 'High-zoom images'],
  },
  {
    name: 'Real Estate Website',
    group: 'business',
    icon: Home,
    description: 'Property listings, luxury villa showcases, commercial land details, and agent contact funnels.',
    popularFeatures: ['Property specifications', 'Amenities list', 'Virtual tour embeds', 'Direct agent calling'],
  },
  {
    name: 'Educational Website',
    group: 'organizations',
    icon: GraduationCap,
    description: 'Coaching centers, academies, tuition institutes, and e-learning platforms presenting courses.',
    popularFeatures: ['Course curriculum', 'Faculty directory', 'Admission inquiry', 'Fee details'],
  },
  {
    name: 'School / Madarsa Website',
    group: 'organizations',
    icon: BookOpen,
    description: 'Official portals for schools, madarsas, and seminaries with notice boards and admission forms.',
    popularFeatures: ['Notice board', 'Academic calendar', 'Admission guidelines', 'Donation / fee info'],
  },
  {
    name: 'NGO / Organization Website',
    group: 'organizations',
    icon: HeartHandshake,
    description: 'Charitable trusts, foundations, and community non-profits sharing mission and collecting support.',
    popularFeatures: ['Mission & vision', 'Project reports', 'Volunteer application', 'Bank / UPI details'],
  },
  {
    name: 'Doctor / Clinic Website',
    group: 'services',
    icon: Stethoscope,
    description: 'Doctors, dentists, medical specialists, and clinics with appointment scheduling and timings.',
    popularFeatures: ['Doctor credentials', 'Treatment details', 'Appointment request', 'Clinic timings & map'],
  },
  {
    name: 'Hotel Website',
    group: 'services',
    icon: Hotel,
    description: 'Hotels, resorts, homestays, and boutique lodges with room photography and booking inquiries.',
    popularFeatures: ['Room types & rates', 'Photo gallery', 'Check-in rules', 'Direct WhatsApp booking'],
  },
  {
    name: 'Travel Website',
    group: 'services',
    icon: Compass,
    description: 'Tour operators, travel agencies, and cab services featuring tour packages and custom itineraries.',
    popularFeatures: ['Tour package cards', 'Itinerary timeline', 'Instant quote request', 'Customer reviews'],
  },
  {
    name: 'Local Shop Website',
    group: 'retail',
    icon: Store,
    description: 'Local retail shops, hardware, electronics, clothing, and grocery stores reaching local buyers.',
    popularFeatures: ['Product catalog', 'Shop photos & timings', 'Google Maps link', 'Direct call button'],
  },
  {
    name: 'Custom Website',
    group: 'all',
    icon: Layers,
    description: 'Bespoke web applications, SaaS dashboards, booking engines, or unique multi-functional platforms.',
    popularFeatures: ['Tailored workflow', 'Custom integrations', 'API connections', 'Scalable database'],
  },
];

export const WebsiteCategoriesSection: React.FC<WebsiteCategoriesSectionProps> = ({
  onRequestCategory,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredCategories = CATEGORIES.filter(c => {
    if (activeFilter === 'all') return true;
    return c.group === activeFilter;
  });

  return (
    <section id="categories" className="py-20 bg-[#0b0f17] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              Tailored Solutions
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Website Categories We Build
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl">
              Every category is built with the specific features, layouts, and call-to-actions that your industry requires.
            </p>
          </div>

          {/* Interactive filter tabs (Buttons allowed by constitution) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {[
              { id: 'all', label: 'All (16)' },
              { id: 'business', label: 'Business' },
              { id: 'retail', label: 'Retail & Stores' },
              { id: 'services', label: 'Services' },
              { id: 'personal', label: 'Personal & Portfolio' },
              { id: 'organizations', label: 'Institutions' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-cyan-400 text-cyan-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCategories.map(cat => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-cyan-400 mb-4 group-hover:bg-cyan-500 group-hover:text-cyan-950 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-1.5">
                    {cat.popularFeatures.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <Check className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3">
                  <button
                    onClick={() => onRequestCategory(cat.name)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-cyan-400 hover:text-cyan-950 transition-colors cursor-pointer group/btn"
                  >
                    <span>Request This Website</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
