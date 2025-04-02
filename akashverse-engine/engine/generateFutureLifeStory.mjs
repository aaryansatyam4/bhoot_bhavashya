export function generateFutureLifeStory(kundli) {
    const roleMap = {
      "Ashwini": "will become a fearless innovator who leads new beginnings.",
      "Bharani": "will become a guardian of hidden knowledge and protect the vulnerable.",
      "Krittika": "will become a visionary who brings transformative change.",
      "Rohini": "will manifest beauty and abundance through creative pursuits.",
      "Mrigashira": "will be a seeker, destined to discover profound truths.",
      "Ardra": "will initiate powerful societal shifts and transformations.",
      "Punarvasu": "will spread wisdom and healing across communities.",
      "Pushya": "will serve as a teacher and nurturer for generations to come.",
      "Ashlesha": "will master the esoteric sciences and spiritual mysteries.",
      "Magha": "will restore ancient legacies and lead with noble authority.",
      "Purva Phalguni": "will inspire joy, romance, and harmony to the world.",
      "Uttara Phalguni": "will lead humanitarian causes with selfless service.",
      "Hasta": "will heal and create wonders with their gifted hands.",
      "Chitra": "will build timeless structures and legacies.",
      "Swati": "will be a wandering free soul helping people across borders.",
      "Vishakha": "will be a wise leader, resolving conflicts and disputes.",
      "Anuradha": "will be a powerful spiritual guide mastering inner energies.",
      "Jyeshtha": "will preserve ancient knowledge and sacred traditions.",
      "Mula": "will uncover universal truths and become an enlightened being.",
      "Purva Ashadha": "will become a charismatic leader and speaker.",
      "Uttara Ashadha": "will lead righteous movements and uplift society.",
      "Shravana": "will become a storyteller who preserves and passes down ancient wisdom.",
      "Dhanishta": "will become a master of cosmic music and harmony.",
      "Shatabhisha": "will become a cosmic healer, curing the incurable.",
      "Purva Bhadrapada": "will transform themselves and others spiritually.",
      "Uttara Bhadrapada": "will guide seekers with deep inner peace.",
      "Revati": "will care for and guide lost souls to salvation."
    };

    const role = roleMap[kundli.moonNakshatra] || "will continue their journey in search of their life's purpose.";

    return `In your future life, you ${role}
You carry the blessings and impressions of your current life's Moon Nakshatra: ${kundli.moonNakshatra}.`;
}
