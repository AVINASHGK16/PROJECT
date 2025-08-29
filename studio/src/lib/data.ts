import type { ServiceProvider } from '@/types';

const providers: ServiceProvider[] = [
  {
    id: '1',
    name: 'Sparky & Co. Electrical',
    type: 'Electrician',
    avatarUrl: 'https://placehold.co/100x100.png',
    location: 'San Francisco, CA',
    experience: 15,
    skills: ['Residential Wiring', 'Commercial Lighting', 'Panel Upgrades', 'EV Charger Installation'],
    certifications: ['Master Electrician', 'Licensed and Insured'],
    bio: 'With over 15 years of experience, Sparky & Co. provides top-notch electrical services for both residential and commercial clients. We pride ourselves on safety, efficiency, and customer satisfaction.',
    projects: [
      { id: 'p1', imageUrl: 'https://placehold.co/600x400.png', caption: 'Modern kitchen lighting installation', dataAiHint: 'kitchen lighting' },
      { id: 'p2', imageUrl: 'https://placehold.co/600x400.png', caption: 'Upgraded electrical panel', dataAiHint: 'electrical panel' },
      { id: 'p3', imageUrl: 'https://placehold.co/600x400.png', caption: 'Commercial office lighting setup', dataAiHint: 'office lighting' },
    ],
    reviews: [
      { id: 'r1', author: 'Jane D.', avatarUrl: 'https://placehold.co/40x40.png', rating: 5, text: 'Absolutely fantastic service! On time, professional, and did a wonderful job on our new kitchen lights.', date: '2023-05-20' },
      { id: 'r2', author: 'John S.', avatarUrl: 'https://placehold.co/40x40.png', rating: 4, text: 'Very reliable. They fixed our breaker issue quickly. A bit pricey, but you get what you pay for.', date: '2023-04-12' },
    ],
    workingHours: 'Mon-Fri, 8:00 AM - 5:00 PM',
    contact: { phone: '555-0101', email: 'contact@sparkyco.com' },
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Flow Masters Plumbing',
    type: 'Plumber',
    avatarUrl: 'https://placehold.co/100x100.png',
    location: 'Oakland, CA',
    experience: 12,
    skills: ['Drain Cleaning', 'Pipe Repair', 'Water Heaters', 'Bathroom Remodeling'],
    certifications: ['Master Plumber', 'Certified Water Heater Technician'],
    bio: 'Flow Masters is your go-to for all plumbing needs. From leaky faucets to full bathroom remodels, we handle it all with expertise and a friendly smile. 24/7 emergency service available.',
    projects: [
      { id: 'p4', imageUrl: 'https://placehold.co/600x400.png', caption: 'Complete bathroom plumbing remodel', dataAiHint: 'bathroom plumbing' },
      { id: 'p5', imageUrl: 'https://placehold.co/600x400.png', caption: 'Tankless water heater installation', dataAiHint: 'water heater' },
    ],
    reviews: [
      { id: 'r3', author: 'Mike R.', avatarUrl: 'https://placehold.co/40x40.png', rating: 5, text: 'Saved us during a midnight emergency. Fast, courteous, and very knowledgeable. Highly recommend!', date: '2023-06-01' },
      { id: 'r4', author: 'Emily B.', avatarUrl: 'https://placehold.co/40x40.png', rating: 5, text: 'They did our entire bathroom remodel. The plumbing work is flawless. Great team to work with.', date: '2023-03-25' },
    ],
    workingHours: '24/7 Emergency Service',
    contact: { phone: '555-0102', email: 'support@flowmasters.com' },
    rating: 5,
  },
  {
    id: '3',
    name: 'Current Affairs Electric',
    type: 'Electrician',
    avatarUrl: 'https://placehold.co/100x100.png',
    location: 'San Jose, CA',
    experience: 8,
    skills: ['Smart Home Installation', 'Security Systems', 'General Repairs', 'Code Compliance'],
    certifications: ['Licensed Electrician'],
    bio: 'Specializing in modern electrical solutions, from smart home automation to ensuring your home is up to code. We are passionate about bringing the latest technology to your home safely.',
    projects: [
      { id: 'p6', imageUrl: 'https://placehold.co/600x400.png', caption: 'Smart home hub installation', dataAiHint: 'smart home' },
      { id: 'p7', imageUrl: 'https://placehold.co/600x400.png', caption: 'Outdoor security camera wiring', dataAiHint: 'security camera' },
    ],
    reviews: [
      { id: 'r5', author: 'Chris T.', avatarUrl: 'https://placehold.co/40x40.png', rating: 5, text: 'Incredibly knowledgeable about smart home tech. Helped me set up my entire system.', date: '2023-05-15' },
      { id: 'r6', author: 'Sarah L.', avatarUrl: 'https://placehold.co/40x40.png', rating: 3, text: 'The job got done, but they were late and communication could have been better.', date: '2023-04-30' },
    ],
    workingHours: 'Mon-Sat, 9:00 AM - 6:00 PM',
    contact: { phone: '555-0103', email: 'hello@currentaffairs.com' },
    rating: 4,
  },
  {
    id: '4',
    name: 'The Pipe Dreamers',
    type: 'Plumber',
    avatarUrl: 'https://placehold.co/100x100.png',
    location: 'San Francisco, CA',
    experience: 20,
    skills: ['Vintage Fixture Restoration', 'Gas Lines', 'Sewer Main Repair', 'Kitchen Plumbing'],
    certifications: ['Master Plumber', 'Gas-Fitter Certified'],
    bio: 'A family-owned business with 20 years of experience serving San Francisco. We specialize in both modern plumbing and the intricacies of older, historic homes. No job is too big or too small.',
    projects: [
      { id: 'p8', imageUrl: 'https://placehold.co/600x400.png', caption: 'Kitchen sink and dishwasher installation', dataAiHint: 'kitchen sink' },
      { id: 'p9', imageUrl: 'https://placehold.co/600x400.png', caption: 'Sewer line replacement project', dataAiHint: 'sewer repair' },
      { id: 'p10', imageUrl: 'https://placehold.co/600x400.png', caption: 'Restored vintage clawfoot tub fixtures', dataAiHint: 'vintage bathroom' },
    ],
    reviews: [
      { id: 'r7', author: 'David P.', avatarUrl: 'https://placehold.co/40x40.png', rating: 5, text: 'True artisans. They understood the plumbing in my Victorian home perfectly.', date: '2023-06-10' },
      { id: 'r8', author: 'Nina G.', avatarUrl: 'https://placehold.co/40x40.png', rating: 4, text: 'Solid work on our gas line. The inspection passed with no issues. Scheduling was a bit of a hassle.', date: '2023-05-05' },
    ],
    workingHours: 'Mon-Fri, 7:30 AM - 4:30 PM',
    contact: { phone: '555-0104', email: 'service@pipedreamers.com' },
    rating: 4.5,
  },
  {
    id: '5',
    name: 'Build It Best Hardware',
    type: 'Hardware Store',
    avatarUrl: 'https://placehold.co/100x100.png',
    location: 'Berkeley, CA',
    bio: 'Your friendly neighborhood hardware store. We have everything you need for your next project, big or small. Our knowledgeable staff is always here to help you find the right tools and materials.',
    reviews: [
      { id: 'r9', author: 'Alex K.', avatarUrl: 'https://placehold.co/40x40.png', rating: 5, text: 'The staff here is incredibly helpful. They helped me find exactly what I needed for a tricky plumbing fix.', date: '2023-06-15' },
      { id: 'r10', author: 'Ben L.', avatarUrl: 'https://placehold.co/40x40.png', rating: 4, text: 'Great selection, but a bit more expensive than the big box stores. You pay for the convenience and expertise.', date: '2023-05-22' },
    ],
    workingHours: 'Mon-Sun, 7:00 AM - 8:00 PM',
    contact: { phone: '555-0105', email: 'info@builditbest.com' },
    rating: 4.5,
    products: [
      { id: 'prod1', name: 'Hammer', price: 15.99, imageUrl: 'https://placehold.co/200x200.png', dataAiHint: 'hammer tool' },
      { id: 'prod2', name: 'Screwdriver Set', price: 24.99, imageUrl: 'https://placehold.co/200x200.png', dataAiHint: 'screwdriver tool' },
      { id: 'prod3', name: 'Power Drill', price: 89.99, imageUrl: 'https://placehold.co/200x200.png', dataAiHint: 'power drill' },
    ],
  },
];

export function getProviders() {
  return providers;
}

export function getProviderById(id: string) {
  return providers.find(p => p.id === id);
}
