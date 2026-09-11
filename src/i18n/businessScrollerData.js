// Country code → scroller me dikhne wale businesses (naam, tagline, logo)
// Naya country add karna ho to bas yahan ek naya key add karo.

export const SCROLLER_BUSINESSES_BY_COUNTRY = {
  IN: [
    { name: "The Brew House", tagline: "Café & Restaurant", logo: null },
    { name: "Fitzone Fitness", tagline: "Gym & Fitness", logo: null },
    { name: "Glow Studio", tagline: "Beauty & Salon", logo: null },
    { name: "City Dental Care", tagline: "Dental Clinic", logo: null },
    { name: "Spice Route", tagline: "Restaurant", logo: null },
    { name: "Urban Cuts", tagline: "Salon", logo: null },
  ],

  US: [
    { name: "The Daily Grind", tagline: "Café & Diner", logo: null },
    { name: "IronCore Fitness", tagline: "Gym & Fitness", logo: null },
    { name: "Luxe Beauty Bar", tagline: "Beauty & Salon", logo: null },
    { name: "Bright Smile Dental", tagline: "Dental Clinic", logo: null },
    { name: "Downtown Diner", tagline: "Restaurant", logo: null },
    { name: "Sharp Cuts Barber", tagline: "Barbershop", logo: null },
  ],

  GB: [
    { name: "The Corner Café", tagline: "Café & Restaurant", logo: null },
    { name: "PulseFit Gym", tagline: "Gym & Fitness", logo: null },
    { name: "Radiance Beauty Studio", tagline: "Beauty & Salon", logo: null },
    { name: "Crown Dental Clinic", tagline: "Dental Clinic", logo: null },
    { name: "The Local Kitchen", tagline: "Restaurant", logo: null },
    { name: "Gentleman's Barber", tagline: "Barbershop", logo: null },
  ],

  AE: [
    { name: "Al Noor Café", tagline: "Café & Restaurant", logo: null },
    { name: "FitZone Dubai", tagline: "Gym & Fitness", logo: null },
    { name: "Glow Beauty Lounge", tagline: "Beauty & Salon", logo: null },
    { name: "Smile Care Dental", tagline: "Dental Clinic", logo: null },
    { name: "Marina Grill", tagline: "Restaurant", logo: null },
    { name: "Elite Barber Lounge", tagline: "Barbershop", logo: null },
  ],
};

export const DEFAULT_SCROLLER_BUSINESSES = SCROLLER_BUSINESSES_BY_COUNTRY.IN;

export function getScrollerBusinesses(countryCode) {
  return SCROLLER_BUSINESSES_BY_COUNTRY[countryCode] || DEFAULT_SCROLLER_BUSINESSES;
}