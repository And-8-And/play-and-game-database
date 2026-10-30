const CURRENT_YEAR = new Date().getFullYear();

export const COLLECTION_TITLES = Object.freeze({
  'last-30-days': 'Newest: last 30 days',
  'this-week': 'Newest: this week',
  'next-week': 'Newest: next week',
  'next-month': 'Newest: next month',
  'best-of-year': 'Top: best of the year',
  'best-of-other-years': 'Top: best of other years',
  'all-time-top': 'Top: all time',
});

export const MENU_SECTIONS = Object.freeze([
  {
    title: 'Newest',
    items: [
      { label: 'Last 30 days', to: '/collection/last-30-days' },
      { label: 'This week', to: '/collection/this-week' },
      { label: 'Next week', to: '/collection/next-week' },
      { label: 'Next month', to: '/collection/next-month' },
    ],
  },
  {
    title: 'Top',
    items: [
      { label: 'Best of the year', to: '/collection/best-of-year' },
      { label: 'Best of other years', to: '/collection/best-of-other-years' },
      { label: 'All time top 250', to: '/collection/all-time-top?limit=250' },
      { label: 'All time top 500', to: '/collection/all-time-top?limit=500' },
    ],
  },
]);

export const PAGE_SIZE = 20;
export const FIRST_YEAR = 1980;
export const CURRENT_YEAR_VALUE = CURRENT_YEAR;