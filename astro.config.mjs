// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// Configuración de Astro para GitHub Pages
export default defineConfig({
  site: 'https://kencastillo001.github.io/D.Interfaces',
  base: '/D.Interfaces/', // Asegúrate de que coincida con el nombre del repositorio
  integrations: [mdx(), sitemap(), tailwind(), react()],
});
