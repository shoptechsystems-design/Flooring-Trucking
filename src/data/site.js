export const SITE = {
  brand: 'Lil Man Big Van',
  legal: 'Flooring For All LLC',
  usdot: '4327224',
  mc: 'MC-1689088',
  city: 'Winston-Salem, NC',
  zip: '27107',
  phones: [
    { label: '(336) 955-6193', href: 'tel:+13369556193' },
    { label: '(817) 678-4346', href: 'tel:+18176784346' },
  ],
  emails: ['Lilman.bigvan@gmail.com', 'Nathanw.logistics@gmail.com'],
}

export const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'Freight', href: '#freight' },
  { label: 'Flooring', href: '#flooring' },
  { label: 'About', href: '#about' },
  { label: 'Service Area', href: '#area' },
  { label: 'Contact', href: '#contact' },
]

export const FREIGHT_LIST = [
  '26-ft Box Truck',
  'Sprinter Van',
  'Local Delivery',
  'Triad Coverage',
  'North Carolina',
  'Regional Freight',
  'Expedited Transportation',
  'Dedicated Loads',
]

export const FLOOR_LIST = [
  'LVP Installation',
  'LVP Removal',
  'Carpet Removal',
  'Flooring Demolition',
  'Glue-Down Flooring Removal',
  'Subfloor Preparation',
  'Residential Flooring',
  'Commercial Flooring',
]

export const FLOOR_SERVICES = [
  { t: 'LVP Installation', d: 'Professional installation of luxury vinyl plank flooring.' },
  { t: 'LVP Removal', d: 'We remove existing LVP flooring when a space needs to be replaced or renovated.' },
  { t: 'Glue-Down Flooring Removal', d: 'We can remove glued-down flooring and prepare the area for the next stage of the project.' },
  { t: 'Carpet Removal', d: 'Complete carpet removal for residential and commercial spaces.' },
  { t: 'Demolition & Tear-Out', d: 'Efficient flooring demolition and removal before new flooring installation.' },
  { t: 'Subfloor Preparation', d: 'Prepare the existing surface so the new flooring can be installed properly.' },
]

export const FLOOR_STEPS = [
  { n: '01', t: 'Contact Us', d: 'Tell us about your flooring project.', tag: 'Existing floor' },
  { n: '02', t: 'Free Estimate', d: 'We review the project and provide an estimate.', tag: 'Reviewing the space' },
  { n: '03', t: 'Demolition / Preparation', d: 'Remove existing flooring when needed and prepare the space.', tag: 'Tear-out & prep' },
  { n: '04', t: 'Installation', d: 'Install the new flooring and complete the project professionally.', tag: 'New LVP floor' },
]

export const FREIGHT_STEPS = [
  { n: '01', t: 'Request a Quote', d: 'Send us your shipment details.' },
  { n: '02', t: 'Review', d: 'We review the freight, equipment requirements, pickup, and delivery.' },
  { n: '03', t: 'Book', d: 'Confirm the transportation details.' },
  { n: '04', t: 'Deliver', d: 'We handle the shipment professionally from pickup to delivery.' },
]

export const EQUIPMENT = {
  truck: {
    key: 'truck',
    name: '26-Ft Box Truck',
    d: 'Ideal for larger shipments, palletized freight, deliveries, and regional transportation.',
    specs: ['Larger shipments', 'Palletized freight', 'Regional transportation'],
  },
  van: {
    key: 'van',
    name: 'Sprinter Van',
    d: 'Flexible capacity for smaller shipments, expedited freight, and time-sensitive deliveries.',
    specs: ['Smaller shipments', 'Expedited freight', 'Time-sensitive deliveries'],
  },
}

export const CITIES = ['Winston-Salem', 'Greensboro', 'High Point', 'Kernersville', 'Lexington', 'Clemmons']

export const WHY = [
  { t: 'Local Knowledge', d: 'Based in Winston-Salem and familiar with the Triad and surrounding markets.' },
  { t: 'Reliable Service', d: 'Professional communication and dependable service from start to finish.' },
  { t: 'Multiple Capabilities', d: 'Transportation, flooring installation, removal, and demolition under one roof.' },
  { t: 'Free Quotes & Estimates', d: 'No-pressure pricing to help customers understand their project or transportation needs.' },
]

export const FLOORING_FIELDS = [
  { name: 'name', label: 'Name', required: true, autoComplete: 'name' },
  { name: 'phone', label: 'Phone', type: 'tel', required: true, autoComplete: 'tel' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'address', label: 'Project Address', autoComplete: 'street-address' },
  {
    name: 'flooring_type',
    label: 'Type of Flooring',
    type: 'select',
    options: ['LVP (luxury vinyl plank)', 'Carpet', 'Glue-down flooring', 'Tile', 'Hardwood / laminate', 'Not sure'],
  },
  { name: 'removal', label: 'What needs to be removed?', placeholder: 'e.g. old LVP, carpet, glue residue' },
  { name: 'sqft', label: 'Approximate Square Footage', inputMode: 'numeric', placeholder: 'e.g. 850' },
  { name: 'photos', label: 'Upload Photos', type: 'file' },
  {
    name: 'contact_method',
    label: 'Preferred Contact Method',
    type: 'radio',
    options: ['Phone call', 'Text', 'Email'],
    full: true,
  },
  { name: 'message', label: 'Message', type: 'textarea', full: true },
]

export const FREIGHT_FIELDS = [
  { name: 'company', label: 'Company Name', autoComplete: 'organization' },
  { name: 'name', label: 'Contact Name', required: true, autoComplete: 'name' },
  { name: 'phone', label: 'Phone', type: 'tel', required: true, autoComplete: 'tel' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'pickup', label: 'Pickup Location', required: true, placeholder: 'City, state or address' },
  { name: 'delivery', label: 'Delivery Location', required: true, placeholder: 'City, state or address' },
  { name: 'equipment', label: 'Equipment Needed', type: 'select', options: ['26-ft Box Truck', 'Sprinter Van', 'Not sure, need advice'] },
  { name: 'pickup_date', label: 'Pickup Date', type: 'date' },
  { name: 'commodity', label: 'Commodity' },
  { name: 'pieces', label: 'Number of Pallets / Pieces' },
  { name: 'weight', label: 'Weight', placeholder: 'e.g. 2,400 lbs' },
  { name: 'dimensions', label: 'Dimensions', placeholder: 'L x W x H' },
  { name: 'message', label: 'Additional Details', type: 'textarea', full: true },
]
