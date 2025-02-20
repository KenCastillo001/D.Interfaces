// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Astro Blog';
export const SITE_DESCRIPTION = 'Welcome to my website!';

type Post = {
    title: string;
    description: string;
    pubDate: string; // Puedes convertirlo a `Date` si lo prefieres como un objeto Date
    heroImage: string;
  };
  
  type Posts = Record<string, Post>;
  