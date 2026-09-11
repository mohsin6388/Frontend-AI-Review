import { Coffee, Dumbbell, Scissors, Stethoscope, Utensils } from "lucide-react";
import godown from "../assets/cafe-godown.jpg"
import bridal from "../assets/bridal_makeup.webp"
import vaishnavi from "../assets/vaishnavi.jpg"
import sanger from "../assets/sanger-cafe.jpg"
import san_laurel from "../assets/san-laurel-restaurant-usa.jpg"
import gym_usa from "../assets/usa-gym.jpg"
import dental_clinic from "../assets/dental-clinic-usa.jpg"
import dental_clinic_uk from "../assets/dental-clinic-uk.jpg"
import salon_uk from "../assets/salon-uk.jpg"
import gym_uk from "../assets/gym-uk.jpg"
import cafe_uk from "../assets/cafe-uk.jpg"
import cafe_uae from "../assets/cafe-uae.jpg"
import gym_uae from "../assets/gym-uae.jpg"
import salon_uae from "../assets/salon-uae.jpg"
import dental_uae from "../assets/dental-uae.png"

// Business "type" ke hisab se visual style (icon, gradient, badge color) —
// yeh country-independent hai, sirf ek jagah define hota hai.
export const BUSINESS_TYPES = {
  cafe: {
    icon: Coffee,
    gradient: "linear-gradient(135deg, #3A2418 0%, #6B4226 100%)",
    badgeColor: "#F2A65A",
  },
  fitness: {
    icon: Dumbbell,
    gradient: "linear-gradient(135deg, #1A1F2E 0%, #2E3648 100%)",
    badgeColor: "#9B8CF0",
  },
  restaurant: {
    icon: Utensils,
    gradient: "linear-gradient(135deg, #3A2418 0%, #6B4226 100%)",
    badgeColor: "#F2A65A",
  },
  beauty: {
    icon: Scissors,
    gradient: "linear-gradient(135deg, #3A1F2E 0%, #5C2E42 100%)",
    badgeColor: "#F0729C",
  },
  dental: {
    icon: Stethoscope,
    gradient: "linear-gradient(135deg, #16302B 0%, #234A40 100%)",
    badgeColor: "#4ECDC4",
  },
   hospital: {
    icon: Stethoscope,
    gradient: "linear-gradient(135deg, #16302B 0%, #234A40 100%)",
    badgeColor: "#4ECDC4",
  },
};

// Country code → un businesses ki list jo showcase me dikhengi.
// Naya country add karna ho to bas yahan ek naya key add karo — component me kuch nahi badalna.
export const BUSINESSES_BY_COUNTRY = {
  IN: [
    {
      type: "cafe",
      name: "Godown Cafe",
      category: "Cafe",
      rating: 4.3,
      reviews: 648,
      review: "Fantastic for customer reviews",
      customer: "Aarav Mehta",
      image: godown,
    },
    {
      type: "restaurant",
      name: "The Perch RoofTop",
      category: "Restaurant",
      rating: 4.9,
      reviews: 101,
      review: "Best Review System to our customer it's easy to take customer feedback",
      customer: "Aryan Singh",
      image: "https://lh3.googleusercontent.com/grass-cs/ACvplmNy03FGOh2St9P1opK4VKaaEkvujMVtGGTdmMGfqGOoRsPD2p-RgxhsPVK4rz3-uBCrw11zhC3rn_vTTrCq9lvPzFDvgUOqlon6VgiL1X5Pw5VpFDT2fv_bn6iSmtY8CS4VFALfTBCw8_vI=w326-h312-n-k-no",
    },
    {
      type: "beauty",
      name: "P3 Salon",
      category: "Beauty & Salon",
      rating: 4.7,
      reviews: 180,
      review: "Loved the service! Highly recommended.",
      customer: "Puja Gupta",
      image: bridal,
    },
    {
      type: "hospital",
      name: "Vaishnavi Hospital",
      category: "Hospital",
      rating: 4.4,
      reviews: 324,
      review: "Great for understanding patient needs and improving reviews with Review Ninja Pro!",
      customer: "Dr. V.K. Dixit",
      image: vaishnavi,
    },
  ],






  US: [
    { type: "cafe", name: "Sanger Country Cafe", category: "Cafe & Diner", rating: 4.7, reviews: 76, review: "Fantastic for customer reviews to analyze and increase visit.", customer: "Emily Johnson", image: sanger },
   {
      type: "restaurant",
      name: "San Laurel",
      category: "Restaurant",
      rating: 4.4,
      reviews: 336,
      review: "Best Review System to our customer it's easy to take customer feedback",
      customer: "Chef José Andrés",
      image: san_laurel,
    },

    { type: "fitness", name: "Grand Slam USA Gym", category: "Gym & Fitness", rating: 4.8, reviews: 95, review: "Great for growing our gym and getting more customer reviews!", customer: "Michael Carter", image:gym_usa },
    // { type: "beauty", name: "Luxe Beauty Bar", category: "Beauty & Salon", rating: 4.9, reviews: 298, review: "Left feeling amazing, will definitely be back.", customer: "Sophia Reyes", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=80" },
    { type: "dental", name: "Union Dental Center", category: "Dental Clinic", rating: 4.9, reviews: 909, review: "Great for understanding patient needs and improving customer reviews with Review Ninja Pro!", customer: "Daniel Brooks", image: dental_clinic },
  ],

  GB: [
    { type: "cafe", name: "Caffeine Culture", category: "Cafe", rating: 5, reviews: 137, review: "Brilliant for improving customer reviews!", customer: "Oliver Hughes", image: cafe_uk },
    { type: "fitness", name: "Topnotch Gyms Soho", category: "Gym & Fitness", rating: 4.8, reviews: 368, review: "Brilliant for growing our gym and getting more customer reviews!", customer: "Charlotte Bennett", image: gym_uk},
    { type: "beauty", name: "Unique Hair Studio", category: "Beauty & Salon", rating: 4.8, reviews: 256, review: "Really pleased with the results—it’s helped increase our sales!, absolutely brilliant.", customer: "Amelia Clarke", image: salon_uk },
    { type: "dental", name: "Highbury Dental Clinic", category: "Dental Clinic", rating: 5, reviews: 101, review: "Brilliant for understanding patient needs and improving customer reviews with Review Ninja Pro!", customer: "James Whitfield", image: dental_clinic_uk },
  ],

  AE: [
   
    { type: "cafe", name: "Single Fin Cafe", category: "Cafe & Restaurant", rating: 4.8, reviews: 1170, review: "Fantastic for customer reviews to analyze and increase visit.", customer: "Ahmed Al Farsi", image: cafe_uae },
    { type: "fitness", name: "Embody Fitness", category: "Gym & Fitness", rating: 4.9, reviews: 240, review: "Great for growing our gym and getting more customer reviews!", customer: "Layla Hassan", image: gym_uae },
    { type: "beauty", name: "Ginza Beauty Al Barsha", category: "Beauty & Salon", rating: 4.9, reviews: 297, review: "Really pleased with the results—it’s helped increase our sales!, absolutely brilliant.", customer: "Fatima Al Zaabi", image: salon_uae },
    { type: "dental", name: "Versailles Dental Clinic", category: "Dental Clinic", rating: 4.9, reviews: 350, review:  "Great for understanding patient needs and improving customer reviews with Review Ninja Pro!", customer: "Omar Khalid", image: dental_uae },
  ],
};

// Fallback agar kisi country ka data na mile
export const DEFAULT_BUSINESSES = BUSINESSES_BY_COUNTRY.IN;