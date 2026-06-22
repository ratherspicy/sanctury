// Demo property + map configuration for the Property Map preview.
// Set PROPERTY_CENTER to the real parcel centroid before pulling live data.

export const PROPERTY_LABEL = "11 Clydesdale Close, Papamoa Beach";

// [latitude, longitude] — the residential parcel centroid.
// Tip: right-click the property in Google Maps and the coordinates appear at the top.
export const PROPERTY_CENTER: [number, number] = [-37.6973927, 176.2614558];

// Tight on one section so a single home + its boundary fill the frame.
// Nudge to 19 or 21 to taste.
export const DEFAULT_ZOOM = 20;
