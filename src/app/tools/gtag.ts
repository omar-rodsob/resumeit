export const GA_TRACKING_ID = "G-ZHSC7D36W8" //replace it with your measurement id

declare const window: Window &
   typeof globalThis & {
    gtag: any
   }
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url:string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  })
}

type gtagTypes = {
    action: string;
    category: string;
    label: string;
    value: string;
}
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }:gtagTypes) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}