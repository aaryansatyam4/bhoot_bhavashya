import se from 'swisseph';
import path from 'path';

se.swe_set_ephe_path(path.resolve('./ephe'));

const nakshatras = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu",
  "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta",
  "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha",
  "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
  "Uttara Bhadrapada", "Revati"
];

export function getDetails({ dob, tob, lat, lng }) {
  return new Promise((resolve, reject) => {
    const [year, month, day] = dob.split("-").map(Number);
    const [hour, minute] = tob.split(":").map(Number);
    const ut = hour + minute / 60;

    se.swe_julday(year, month, day, ut, se.SE_GREG_CAL, (jd) => {
      // Get Moon
      se.swe_calc_ut(jd, se.SE_MOON, se.SEFLG_SWIEPH, (moonRes) => {
        const moonLong = moonRes.longitude;
        const moonIndex = Math.floor(moonLong / (360 / 27));

        // Get Ketu (MeanNode + 180)
        se.swe_calc_ut(jd, se.SE_MEAN_NODE, se.SEFLG_SWIEPH, (nodeRes) => {
          const rahuLong = nodeRes.longitude;
          const ketuLong = (rahuLong + 180) % 360;
          const ketuIndex = Math.floor(ketuLong / (360 / 27));

          resolve({
            moon_long: moonLong.toFixed(4),
            ketu_long: ketuLong.toFixed(4),
            moonNakshatra: nakshatras[moonIndex],
            ketuNakshatra: nakshatras[ketuIndex]
          });
        });
      });
    });
  });
}
