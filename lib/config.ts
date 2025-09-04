export const config = {
  // Google Sheets Web App URL - replace with your actual deployed URL
  googleSheetsUrl: "https://script.google.com/macros/s/AKfycbyEkXRnW6ozkR-ansO1WARH6CwZqd7voGachlk-aBBlqTdBzkGelpKSGCBcWpMPjz7VgA/exec",
  
  // Event date
  eventDate: "15th September 2025",
  
  // Contact email
  contactEmail: "civista.club@vce.ac.in",
  
  // Organization name
  organizationName: "Civista Club",
  
  // Events configuration
  events: [
    {
      id: "match-logo",
      name: "Match the Logo",
      price: 120,
      teamSize: 3,
      description: "Test your visual memory and pattern recognition skills",
      time: "9:10 AM - 12:40 PM",
      venue: "Main Hall"
    },
    {
      id: "tower-trouble",
      name: "Tower Trouble",
      price: 150,
      teamSize: 3,
      description: "Build the tallest stable structure with limited resources",
      time: "Morning & Afternoon Sessions",
      venue: "Innovation Lab"
    },
    {
      id: "science-sprint",
      name: "Science Sprint Puzzle",
      price: 100,
      teamSize: 2,
      description: "Solve scientific puzzles against the clock",
      time: "10:30 AM - 12:00 PM",
      venue: "Lab 1"
    },
    {
      id: "geo-challenge",
      name: "Geo-Capital Challenge",
      price: 50,
      teamSize: 1,
      description: "Test your knowledge of world capitals and geography",
      time: "1:40 PM - 3:00 PM",
      venue: "Auditorium"
    }
  ],
  
  // Team members
  teamMembers: [
    {
      name: "Imran Shaik",
      role: "Chair IEEE GRSS SBC\nPresident, Civista Club",
      contact: "+91 70139 26220"
    },
    {
      name: "S. Akanksha",
      role: "Vice President, Civista Club",
      contact: "+91 89858 26542"
    },
    {
      name: "K. Ghnanasri",
      role: "Secretary, Civista Club",
      contact: "+91 96764 39679"
    },
    {
      name: "S. Prakruthi",
      role: "Vice Chair IEEE GRSS SBC",
      contact: "+91 82472 35534"
    }
  ]
}
