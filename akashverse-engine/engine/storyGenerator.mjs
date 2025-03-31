export function generatePastLifeStory(kundli) {
    const roleMap = {
      "Ashwini": "a warrior with a fiery spirit and unmatched courage.",
      "Bharani": "a protector of sacred traditions, deeply loyal.",
      "Krittika": "a fierce guardian with cutting intellect.",
      "Rohini": "an artist who worshipped beauty and nature.",
      "Mrigashira": "a seeker of hidden truths and knowledge.",
      "Ardra": "a revolutionary who challenged the norms.",
      "Punarvasu": "a philosopher returning to complete unfinished teachings.",
      "Pushya": "a royal advisor with a nurturing soul.",
      "Ashlesha": "a mystic delving into secrets and serpentine power.",
      "Magha": "a noble king or queen of divine lineage.",
      "Purva Phalguni": "a performer who spread joy and romance.",
      "Uttara Phalguni": "a karmic server of the people.",
      "Hasta": "a healer who used hands to mend and create.",
      "Chitra": "an architect of grand visions and sacred temples.",
      "Swati": "a nomad who valued freedom above all.",
      "Vishakha": "a judge who pursued justice with wisdom.",
      "Anuradha": "a tantric mystic with occult mastery.",
      "Jyeshtha": "a protector of sacred texts and traditions.",
      "Mula": "a yogi who renounced everything for truth.",
      "Purva Ashadha": "a warrior-poet with powerful speech.",
      "Uttara Ashadha": "a leader of societies and righteous revolutions.",
      "Shravana": "a sage who preserved ancient stories.",
      "Dhanishta": "a cosmic musician tuned with divine rhythms.",
      "Shatabhisha": "a healer connected with cosmic medicine.",
      "Purva Bhadrapada": "a spiritual transformer seeking moksha.",
      "Uttara Bhadrapada": "a monk with oceanic inner peace.",
      "Revati": "a guardian of lost souls and animals."
    };
  
    const role = roleMap[kundli.ketuNakshatra] || "a wandering soul on a forgotten path.";
  
    return `In your past life, you were ${role}
  Your Ketu's placement reflects this karmic journey.
  You carry these deep impressions into this life under the influence of ${kundli.ketuNakshatra} nakshatra.`;
  }
  