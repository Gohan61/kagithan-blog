# Kagithan blog: personal blog

This is my personal blog where I write about my programming journey. The blog contains topics like the technologies I use for my projects, my personal experiences and considerations for choosing and doing what I do.

It also serves as a test bed for trying out new technologies I am not yet familiar with.

## Technologies

### V1 (Main branch)

- Frontend: Vite + React
- Language: TypeScript, Bash, Markdown
- Styling: Tailwind CSS
- Hosting: Cloudflare Pages
- Backend (testing only): Express - Node.js
- Note: all blogs are shipped in frontend as an asset. The Bash script is run to create a Javascript object for saving blog titles and traversing the files.

### V2 (Cloudflare-worker & Worker-frontend branches)

- Frontend: Vite + React
- Language: TypeScript, Markdown
- Styling: Tailwind CSS
- Hosting: Cloudflare Pages
- Backend: Cloudflare Worker
- Storage: Cloudflare R2 bucket
- Note: blogs are fetched from a Cloudflare R2 bucket using a Cloudflare Worker.

## Links

- Website: [Kagithan blog](https://kagithan.blog/)
