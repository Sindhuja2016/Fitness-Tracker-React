import {Search, Users, Calendar,ChevronDown,} from "lucide-react";
import yoga from '../assets/images/yoga.jpg'
import running from '../assets/images/running.jpg'
import fitandfine from '../assets/images/fitandfine.jpg'
import flexyoga from '../assets/images/flexyoga.jpg'
import fullbodystrengthen from '../assets/images/fullbodystrengthen.jpg'
import lowerbodystrength from '../assets/images/lowerbodystrength.jpg'
import plank1 from '../assets/images/plank1.jpg'
import plank from '../assets/images/plank.jpg'
import plank3 from '../assets/images/planks3.jpg'
import walking2 from '../assets/images/walking2.jpg'
import cycling from '../assets/images/cycling.jpg'
import suryanamas from '../assets/images/suryanamas.jpg'
import run1 from '../assets/images/run1.jpg'
import runspeed from '../assets/images/run-speed.jpg'
import run2 from '../assets/images/run2.jpg'
import sprint1 from '../assets/images/sprinter-start.jpeg'
import sprinter2 from '../assets/images/sprinter2.jpg' 
import squat from '../assets/images/squat.jpg'
import strengthtrain from '../assets/images/strengthtraining-2.jpg'
import strengthtrain2 from "../assets/images/strength-train.jpg"
import pullup1 from "../assets/images/pullup1.jpg"
import krb from "../assets/images/krb.jpg"
import hydrationhero from '../assets/images/hydrationhero.jpg'
import drinkwater from "../assets/images/drinkwater.jpg"
import sleep8hours from "../assets/images/sleep8hours.jpg"
import healthyhabits from "../assets/images/healthyhabits.jpg"
import digitaldetox from "../assets/images/digitaldetox.jpg"
import meditation from "../assets/images/meditation.jpg"
import gratitudejournal from "../assets/images/gratitudejournal.jpg"
import deepbreathing from "../assets/images/deepbreathing.jpg"
import eatfruits from "../assets/images/eatfruits.jpg"
import nosugar from "../assets/images/nosugar.jpg"
import stressfree from "../assets/images/stressfree.jpg"
import mindfullness from "../assets/images/mindfullness.jpg"
import healthybf from "../assets/images/healthybf.jpg"
import cleaneating from "../assets/images/cleaneating.jpg"
import mealprep from "../assets/images/mealprep.jpg"
import sixam from "../assets/images/sixam.jpg"
import read from "../assets/images/read.jpg"
import improve from "../assets/images/improve.jpg"
import learnnew from "../assets/images/learnnew.jpg"
import journal from "../assets/images/journal.jpg"
import nojunk from "../assets/images/nojunk.jpg"
import utilisetime from "../assets/images/utilisetime.jpeg"
import selfcare from "../assets/images/selfcare.jpg"

export const challenges = [
  {
    id: 1,
    title: "30-Day Morning Yoga",
    category: "Yoga",
    level: "Beginner",
    participants: "1.2K",
    duration: "30 Days" ,
    description: "Find your balance, calm your mind, and strengthen your body — one pose at a time.",
    image: yoga,
    type:"Free",
  },
  {
    id: 2,
    title: "Run 100 Miles",
    category: "Running",
    level: "Intermediate",
    participants: "4.7K",
    duration: "60 Days" ,
    description: "Build your endurance and cross that finish line. A structured plan for every runner",
    image: runspeed,
    type:"Free",
  },
  {
    id: 3,
    title: "Strength Training Bootcamp",
    category: "Strength",
    level: "Advanced",
    participants: "3.7K ",
    duration:  "60 Days",
    description: "Push your limits with progressive overload training designed to build real strength",
    image:plank1,
    type:"Premium",
  },
  {
  id: 4,
  title: "10K Steps Challenge",
  category: "Walking",
  level: "Intermediate",
  participants: "1.5K",
  duration: "90 Days" ,
  image: walking2,
  description:
    "Build endurance and speed with structured running sessions designed to help you complete a 10K steps",
    type:"Free",

},

{
  id: 5,
  title: "Full Body Strength Builder",
  category: "Strength",
  level: "Advanced",
  participants: 980,
  duration: "64 Days",
  image: fullbodystrengthen,
  description:
    "Increase muscle strength and overall fitness through progressive resistance training workouts.",
    type:"Free",
},

{
  id: 6,
  title: "21-Day Cycling Sprint",
  category: "Cycling",
  level: "Beginner",
  participants: 740,
  duration: "21 Days" ,
  image: cycling,
  description:
    "Improve stamina and cardiovascular health with daily cycling goals and performance tracking.",
    type:"Free",
},
{
    id: 7,
    title: "Daily Surya Namaskar",
    category: "Yoga",
    level: "Intermediate",
    participants: "3K",
    duration: "30 Days",
    image: suryanamas,
    description:"Provide a step-by-step breakdown of all 12 poses",
    type:"Free",

  },
   {
    id: 11,
    title: "Couch to 5K",
    category: "Running",
    level: "Beginner",
    participants: "5K",
    duration: "42 Days",
    image: run1,
    description:"If it doesn't challenge you, it doesn't change you",
    type:"Free"
  },
  {
    id: 12,
    title: "Run Every Day",
    category: "Running",
    level: "Intermediate",
    participants: "1.1K Joined",
    duration: "30 Days",
    image: running,
    description: "Lace up and hit the road for 30 days straight!",
    type:"Free"
  },
  {
    id: 13,
    title: "50 KM Running Challenge",
    category: "Running",
    level: "Intermediate",
    participants: "900 ",
    duration: "30 Days",
    image: run2 ,
    description:"Run today for a stronger tomorrow",
    type:"Premium",
  },
  {
    id: 14,
    title: "Sprint Training",
    category: "Running",
    level: "Advanced",
    participants: "5K",
    duration: "21 Days",
    image: sprint1,
    description:"Push the pace and discover your power",
    type:"Free"
  },
  {
    id: 15,
    title: "Half Marathon Prep",
    category: "Running",
    level: "Advanced",
    participants: "1K",
    duration: "84 Days",
    image: sprinter2,
    description:"Explode past your limits",
    type:"Premium",
  },
  {
    id: 16,
    title: "100 Push-Ups Challenge",
    category: "Strength",
    level: "Beginner",
    participants: "2K ",
    duration: "30 Days" ,
    image: plank,
    description:"The body achieves what the mind believes",
    type:"Free"
    
  },
  {
    id: 17,
    title: "Daily Plank Challenge",
    category: "Strength",
    level: "Beginner",
    participants: "1.6K ",
    duration: "21 Days",
    image: plank1,
    description:"Hold the plank, build the strength.",
    type:"Free"
  },
  {
    id: 18,
    title: "Squat Master Challenge",
    category: "Strength",
    level: "Intermediate",
    participants: "1.2K",
    duration: "30 Days",
    image: squat,
    description: "Squat low, rise stronger.",
    type:"Free",
  },
  {
    id: 19,
    title: "Full Body Strength Builder",
    category: "Strength",
    level: "Intermediate",
    participants: "950 ",
    duration: "45 Days",
    image: strengthtrain,
    description:"Challenge your muscles, change your life",
    type:"Premium",
  },
  {
    id: 20,
    title: "Bodyweight Warrior",
    category: "Strength",
    level: "Advanced",
    participants: "700",
    duration: "60 Days",
    image: strengthtrain2,
    description:"Heavy weights, stronger mindset",
    type:"Premium",
  },
  {
    id: 21,
    title: "Core Crusher",
    category: "Strength",
    level: "Intermediate",
    participants: "1K",
    duration: "21 Days",
    image: plank,
    description: "Stay steady, stay strong",
    type:"Premium",
  },
  {
    id: 22,
    title: "Pull-Up Progression",
    category: "Strength",
    level: "Intermediate",
    participants: "600 ",
    duration: "30 Days",
    image: pullup1,
    description:"Every rep brings you closer to greater power and endurance.",
    type:"Premium",
  },
  {
    id: 23,
    title: "500 Squats Challenge",
    category: "Strength",
    level: "Advanced",
    participants: "550 ",
    duration: "30 Days",
    image: squat,
    description:"Strengthen your muscles, improve mobility, and boost your energy levels",
    type:"Premium",
  },
  {
    id: 24,
    title: "Upper Body Blast",
    category: "Strength",
    level: "Intermediate",
    participants: "850",
    duration: "30 Days",
    image: krb,
    description:"Stay consistent and watch your full-body fitness transform",
    type:"Premium",
  },
  {
    id: 25,
    title: "Lower Body Power",
    category: "Strength",
    level: "Intermediate",
    participants: "750 ",
    duration: "28 Days",
    image: lowerbodystrength,
    type:"Premium",
  },
  {
    id: 26,
    title: "Hydration Hero",
    category: "Wellness",
    level: "Beginner",
    participants: "1.5K ",
    duration: "40 Days",
    image: hydrationhero,
    type:"Free",
  },
  {
    id: 27,
    title: "Drink 3L Water Daily",
    category: "Wellness",
    level: "Beginner",
    participants: "1.3K Joined",
    duration: "21 Days",
    image: drinkwater,
    type:"Free"
  },
  {
    id: 28,
    title: "Sleep 8 Hours Challenge",
    category: "Wellness",
    level: "Beginner",
    participants: "1.7K",
    duration: "30 Days",
    image: sleep8hours,
    type:"Free",
  },
  {
    id: 29,
    title: "Digital Detox",
    category: "Wellness",
    level: "Intermediate",
    participants: "900 ",
    duration: "14 Days",
    image: digitaldetox,
    type:"Free",
  },
  {
    id: 30,
    title: "Healthy Habits Builder",
    category: "Wellness",
    level: "Beginner",
    participants: "1.1K ",
    duration:"30 Days",
    image: healthyhabits,
    type:"Free",
  },
  {
    id: 31,
    title: "Meditation Streak",
    category: "Mindfulness",
    level: "Beginner",
    participants: "1K ",
    duration: "21 Days",
    image: meditation,
    type:"Free",
  },
  {
    id: 32,
    title: "Gratitude Journal",
    category: "Mindfulness",
    level: "Beginner",
    participants: "850 ",
    duration: "30 Days" ,
    image: gratitudejournal,
    type:"Free",
  },
  {
    id: 33,
    title: "Deep Breathing Challenge",
    category: "Mindfulness",
    level: "Beginner",
    participants: "700 ",
    duration: "45 Days",
    image: deepbreathing,
    type:"Free",
  },
  {
    id: 34,
    title: "Stress-Free Living",
    category: "Mindfulness",
    level: "Intermediate",
    participant:"600",
    duration: "30 Days",
    image: stressfree,
    type:"Free",
  },
  {
    id: 35,
    title: "Mindful Morning Routine",
    category: "Mindfulness",
    level: "Beginner",
    participants: "900 ",
    duration: "21 Days",
    image: mindfullness,
    type:"Free",
  },
  {
    id: 36,
    title: "No Sugar Challenge",
    category: "Nutrition",
    level: "Intermediate",
    participants: "1.2K",
    duration: "90 Days",
    image: nosugar,
    type:"Free",
  },
  {
    id: 37,
    title: "Eat 5 Fruits Daily",
    category: "Nutrition",
    level: "Beginner",
    participants: "1.4K Joined",
    duration: "21 Days",
    image: eatfruits,
    type:"Free",
  },
  {
    id: 38,
    title: "Healthy Breakfast Challenge",
    category: "Nutrition",
    level: "Beginner",
    participants: "950 ",
    duration: "30 Days",
    image: healthybf,
    type:"Free",
  },
  {
    id: 39,
    title: "Meal Prep Master",
    category: "Nutrition",
    level: "Intermediate",
    participants: "650 ",
    duration: "60 Days",
    image: mealprep,
    type:"Free",
  },
  {
    id: 40,
    title: "Clean Eating Challenge",
    category: "Nutrition",
    level: "Advanced",
    participants: "500 ",
    duration: "45 Days",
    image: cleaneating,
    type:"Free",
  },
  {
    id: 41,
    title: "Read 10 Pages Daily",
    category: "Lifestyle",
    level: "Beginner",
    participants: "800 ",
    duration: "30 Days",
    image: read,
    type:"Free",
  },
  {
    id: 42,
    title: "Wake Up Before 6 AM",
    category: "Lifestyle",
    level: "Intermediate",
    participants: "1K ",
    duration: "21 Days",
    image: sixam,
    type:"Free",
  },
  {
    id: 43,
    title: "No Junk Food Challenge",
    category: "Lifestyle",
    level: "Beginner",
    participants: "1.5K",
    duration: "30 Days",
    image: nojunk,
    type:"Free",
  },
  {
    id: 44,
    title: "Daily Journal Writing",
    category: "Lifestyle",
    level: "Beginner",
    participants: "700 ",
    duration: "30 Days",
    image: journal,
    type:"Free",
  },
  {
    id: 45,
    title: "Learn Something New",
    category: "Lifestyle",
    level: "Beginner",
    participants: "850 ",
    duration: "30 Days",
    image: learnnew,
    type:"Free",
  },
  {
    id: 46,
    title: "30-Day Productivity Boost",
    category: "Lifestyle",
    level: "Intermediate",
    participants: "600 ",
    duration: "30 Days",
    image: improve,
    type:"Free",
  },
  {
    id: 47,
    title: "Self-Care Challenge",
    category: "Wellness",
    level: "Beginner",
    participants: "900 ",
    duration: "21 Days",
    image: selfcare,
    type:"Free",
  },
  {
    id: 48,
    title: "Screen Time Reduction",
    category: "Wellness",
    level: "Intermediate",
    participants: "750 ",
    duration: "30 Days",
    image: utilisetime,
    type:"Free",
  },
  {
    id: 49,
    title: "Positive Thinking Streak",
    category: "Mindfulness",
    level: "Beginner",
    participants: "650 ",
    duration: "30 Days",
    image: mindfullness,
    type:"Free",
  },
  {
    id: 50,
    title: "Total Transformation Challenge",
    category: "Mixed",
    level: "Advanced",
    participants: "300",
    duration: "90 Days",
    image: flexyoga,
    type:"Premium",
  }

];