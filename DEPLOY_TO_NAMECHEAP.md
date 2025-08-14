# Deploy to Namecheap for Testing

## Quick Deployment Steps

### 1. Build the Static Site
```bash
cd convention-website
npm run build
```

This will create an `out` folder with your static files.

### 2. Upload to Namecheap

#### Option A: cPanel File Manager
1. Log into your Namecheap cPanel
2. Open File Manager
3. Navigate to `public_html` (or your domain's folder)
4. Delete existing files (if any)
5. Upload all contents from the `out` folder
6. Extract if uploaded as zip

#### Option B: FTP Upload
1. Use an FTP client (FileZilla, etc.)
2. Connect to your Namecheap hosting
3. Navigate to `public_html`
4. Upload all files from the `out` folder

### 3. Test Your Site
Visit your domain to test the Eventbrite widget functionality.

### 4. Clean Up After Testing
When done testing:
1. Delete all files from `public_html`
2. Or replace with a simple "Coming Soon" page

## Troubleshooting

### If images don't load:
- Check that all image paths are relative
- Ensure `unoptimized: true` is in next.config.ts

### If routing doesn't work:
- Namecheap shared hosting doesn't support client-side routing
- Use direct links to pages (e.g., `/about/index.html`)

### If API routes don't work:
- API routes won't work on static hosting
- Consider using external services for forms/APIs

## Alternative: Vercel (Easier)
For quicker testing, consider deploying to Vercel instead:
```bash
npm install -g vercel
vercel --prod
```
Then point a subdomain to the Vercel deployment.