export type Language = "en" | "es";

export type WeatherConditionKey =
  | "clear"
  | "rain"
  | "storm"
  | "snow"
  | "wind"
  | "other";

type TranslationParams = Record<string, string | number>;

const en = {
  appTitle: "Utility Outage Tracker",
  reportOutage: "Report Outage",
  loadingMap: "Loading map...",
  loadingOutages: "Loading outages...",
  powerOutageReported: "⚡ Power outage reported",
  waterOutageReported: "💧 Water outage reported",
  confirmations: "Confirmations: {count}",
  weather: "Weather: {value}",
  unknown: "Unknown",
  reporterContact: "Reporter contact:",
  close: "Close",
  clickMapToSetLocation: "Click on map to set location:",
  selected: "Selected: {lat}, {lng}",
  useMyLocation: "📍 Use My Location",
  gettingLocation: "Getting location...",
  orClickMapBelow: "Or click on the map below:",
  orEnterCoordinates: "Or enter coordinates manually:",
  reportAnOutage: "Report an Outage",
  latitude: "Latitude",
  longitude: "Longitude",
  outageType: "Outage Type",
  serviceAvailableNearby: "Service available nearby?",
  weatherCondition: "Weather condition",
  contactInfoOptional: "Contact info (optional - for follow-up on this report)",
  email: "Email",
  mobileNumber: "Mobile Number",
  latitudePlaceholder: "e.g. 18.2208",
  longitudePlaceholder: "e.g. -66.5901",
  emailPlaceholder: "your.email@example.com",
  mobilePlaceholder: "+1 (787) 555-1234",
  submitReport: "Submit Report",
  submitting: "Submitting...",
  invalidCoordinates: "Invalid coordinates.",
  outageReportedSuccess: "Outage reported!",
  submitFailed: "Failed to submit report.",
  geolocationNotSupported: "Geolocation not supported by your browser.",
  locationPermissionDenied: "Location permission denied. Please enable it in settings.",
  locationUnavailable: "Location unavailable. Try another method.",
  locationRequestTimedOut: "Location request timed out.",
  failedToGetLocation: "Failed to get location.",
  locationSet: "Location set: {lat}, {lng}",
  locationUpdated: "Location updated",
  power: "Power",
  water: "Water",
  language: "Language",
  switchToEnglish: "Switch to English",
  switchToSpanish: "Switch to Spanish",
};

const es: typeof en = {
  appTitle: "Rastreador de Interrupciones de Servicios",
  reportOutage: "Reportar Interrupcion",
  loadingMap: "Cargando mapa...",
  loadingOutages: "Cargando interrupciones...",
  powerOutageReported: "⚡ Interrupcion de energia reportada",
  waterOutageReported: "💧 Interrupcion de agua reportada",
  confirmations: "Confirmaciones: {count}",
  weather: "Clima: {value}",
  unknown: "Desconocido",
  reporterContact: "Contacto del reportero:",
  close: "Cerrar",
  clickMapToSetLocation: "Haz clic en el mapa para establecer la ubicacion:",
  selected: "Seleccionado: {lat}, {lng}",
  useMyLocation: "📍 Usar mi ubicacion",
  gettingLocation: "Obteniendo ubicacion...",
  orClickMapBelow: "O haz clic en el mapa de abajo:",
  orEnterCoordinates: "O ingresa coordenadas manualmente:",
  reportAnOutage: "Reportar una Interrupcion",
  latitude: "Latitud",
  longitude: "Longitud",
  outageType: "Tipo de Interrupcion",
  serviceAvailableNearby: "Hay servicio disponible cerca?",
  weatherCondition: "Condicion del clima",
  contactInfoOptional: "Informacion de contacto (opcional - para seguimiento de este reporte)",
  email: "Correo electronico",
  mobileNumber: "Numero de celular",
  latitudePlaceholder: "ej. 18.2208",
  longitudePlaceholder: "ej. -66.5901",
  emailPlaceholder: "nombre@ejemplo.com",
  mobilePlaceholder: "+1 (787) 555-1234",
  submitReport: "Enviar Reporte",
  submitting: "Enviando...",
  invalidCoordinates: "Coordenadas invalidas.",
  outageReportedSuccess: "Interrupcion reportada!",
  submitFailed: "No se pudo enviar el reporte.",
  geolocationNotSupported: "La geolocalizacion no es compatible con tu navegador.",
  locationPermissionDenied: "Permiso de ubicacion denegado. Activalo en configuracion.",
  locationUnavailable: "Ubicacion no disponible. Prueba otro metodo.",
  locationRequestTimedOut: "La solicitud de ubicacion expiro.",
  failedToGetLocation: "No se pudo obtener la ubicacion.",
  locationSet: "Ubicacion establecida: {lat}, {lng}",
  locationUpdated: "Ubicacion actualizada",
  power: "Energia",
  water: "Agua",
  language: "Idioma",
  switchToEnglish: "Cambiar a ingles",
  switchToSpanish: "Cambiar a espanol",
};

const translations = { en, es };

const weatherTranslations: Record<Language, Record<WeatherConditionKey, string>> = {
  en: {
    clear: "Clear",
    rain: "Rain",
    storm: "Storm",
    snow: "Snow",
    wind: "Wind",
    other: "Other",
  },
  es: {
    clear: "Despejado",
    rain: "Lluvia",
    storm: "Tormenta",
    snow: "Nieve",
    wind: "Viento",
    other: "Otro",
  },
};

export type TranslationKey = keyof typeof en;

export function translate(
  language: Language,
  key: TranslationKey,
  params?: TranslationParams
): string {
  const template = translations[language][key] ?? translations.en[key];
  if (!params) {
    return template;
  }

  return Object.entries(params).reduce((acc, [paramKey, value]) => {
    return acc.replace(`{${paramKey}}`, String(value));
  }, template);
}

export function translateWeatherCondition(
  language: Language,
  condition: WeatherConditionKey
): string {
  return weatherTranslations[language][condition];
}
