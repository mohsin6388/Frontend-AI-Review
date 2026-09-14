// Country code → scroller me dikhne wale businesses (naam, tagline, logo)
// Naya country add karna ho to bas yahan ek naya key add karo.

// export const SCROLLER_BUSINESSES_BY_COUNTRY = {
//   IN: [
//     { name: "Godown Cafe", tagline: "Cafe & Restaurant", logo: null },
//     { name: "The Perch RoofTop", tagline: "Gym & Fitness", logo: null },
//     { name: "P3 Salon", tagline: "Beauty & Salon", logo: null },
//     { name: "Vaishnavi Hospital", tagline: "Hospital", logo: null },
//     // { name: "Spice Route", tagline: "Restaurant", logo: null },
//     // { name: "Urban Cuts", tagline: "Salon", logo: null },
//   ],

//   US: [
//     { name: "The Daily Grind", tagline: "Café & Diner", logo: null },
//     { name: "IronCore Fitness", tagline: "Gym & Fitness", logo: null },
//     { name: "Luxe Beauty Bar", tagline: "Beauty & Salon", logo: null },
//     { name: "Bright Smile Dental", tagline: "Dental Clinic", logo: null },
//     { name: "Downtown Diner", tagline: "Restaurant", logo: null },
//     { name: "Sharp Cuts Barber", tagline: "Barbershop", logo: null },
//   ],

//   GB: [
//     { name: "The Corner Café", tagline: "Café & Restaurant", logo: null },
//     { name: "PulseFit Gym", tagline: "Gym & Fitness", logo: null },
//     { name: "Radiance Beauty Studio", tagline: "Beauty & Salon", logo: null },
//     { name: "Crown Dental Clinic", tagline: "Dental Clinic", logo: null },
//     { name: "The Local Kitchen", tagline: "Restaurant", logo: null },
//     { name: "Gentleman's Barber", tagline: "Barbershop", logo: null },
//   ],

//   AE: [
//     { name: "Al Noor Café", tagline: "Café & Restaurant", logo: null },
//     { name: "FitZone Dubai", tagline: "Gym & Fitness", logo: null },
//     { name: "Glow Beauty Lounge", tagline: "Beauty & Salon", logo: null },
//     { name: "Smile Care Dental", tagline: "Dental Clinic", logo: null },
//     { name: "Marina Grill", tagline: "Restaurant", logo: null },
//     { name: "Elite Barber Lounge", tagline: "Barbershop", logo: null },
//   ],
// };

import godown from "../assets/cafe-godown.jpg";
import bridal from "../assets/bridal_makeup.webp";
import vaishnavi from "../assets/vaishnavi.jpg";
import sanger from "../assets/sanger-cafe.jpg";
import san_laurel from "../assets/san-laurel-restaurant-usa.jpg";
import gym_usa from "../assets/usa-gym.jpg";
import dental_clinic from "../assets/dental-clinic-usa.jpg";
import dental_clinic_uk from "../assets/dental-clinic-uk.jpg";
import salon_uk from "../assets/salon-uk.jpg";
import gym_uk from "../assets/gym-uk.jpg";
import cafe_uk from "../assets/cafe-uk.jpg";
import cafe_uae from "../assets/cafe-uae.jpg";
import gym_uae from "../assets/gym-uae.jpg";
import salon_uae from "../assets/salon-uae.jpg";
import dental_uae from "../assets/dental-uae.png";

// Country code → scroller me dikhne wale businesses (naam, tagline, logo)
// Naya country add karna ho to bas yahan ek naya key add karo.

export const SCROLLER_BUSINESSES_BY_COUNTRY = {
  IN: [
    { name: "Godown Cafe", tagline: "Cafe", logo: godown },
    {
      name: "The Perch RoofTop",
      tagline: "Restaurant",
      logo: "https://lh3.googleusercontent.com/grass-cs/ACvplmNy03FGOh2St9P1opK4VKaaEkvujMVtGGTdmMGfqGOoRsPD2p-RgxhsPVK4rz3-uBCrw11zhC3rn_vTTrCq9lvPzFDvgUOqlon6VgiL1X5Pw5VpFDT2fv_bn6iSmtY8CS4VFALfTBCw8_vI=w326-h312-n-k-no",
    },
    { name: "P3 Salon", tagline: "Beauty & Salon", logo: bridal },
    { name: "Vaishnavi Hospital", tagline: "Hospital", logo: vaishnavi },
  ],

  US: [
    { name: "Sanger Country Cafe", tagline: "Cafe & Diner", logo: sanger },
    { name: "San Laurel", tagline: "Restaurant", logo: san_laurel },
    { name: "Grand Slam USA Gym", tagline: "Gym & Fitness", logo: gym_usa },
    {
      name: "Union Dental Center",
      tagline: "Dental Clinic",
      logo: dental_clinic,
    },
  ],

  GB: [
    { name: "Caffeine Culture", tagline: "Cafe", logo: cafe_uk },
    { name: "Topnotch Gyms Soho", tagline: "Gym & Fitness", logo: gym_uk },
    { name: "Unique Hair Studio", tagline: "Beauty & Salon", logo: salon_uk },
    {
      name: "Highbury Dental Clinic",
      tagline: "Dental Clinic",
      logo: dental_clinic_uk,
    },
  ],

  AE: [
    { name: "Single Fin Cafe", tagline: "Cafe & Restaurant", logo: cafe_uae },
    { name: "Embody Fitness", tagline: "Gym & Fitness", logo: gym_uae },
    {
      name: "Ginza Beauty Al Barsha",
      tagline: "Beauty & Salon",
      logo: salon_uae,
    },
    {
      name: "Versailles Dental Clinic",
      tagline: "Dental Clinic",
      logo: dental_uae,
    },
  ],
};

export const DEFAULT_SCROLLER_BUSINESSES = SCROLLER_BUSINESSES_BY_COUNTRY.IN;

export function getScrollerBusinesses(countryCode) {
  return (
    SCROLLER_BUSINESSES_BY_COUNTRY[countryCode] || DEFAULT_SCROLLER_BUSINESSES
  );
}
