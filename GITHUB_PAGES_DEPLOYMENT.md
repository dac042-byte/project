# GitHub Pages Deployment Guide for K-BioX Networks

## 🌐 View Your Site Live on GitHub Pages

You can host your K-BioX website for FREE on GitHub Pages and access it from anywhere!

## Quick Start - Enable GitHub Pages

### Method 1: Using GitHub Website (Easiest)

1. **Go to your repository on GitHub:**
   ```
   https://github.com/dac042-byte/project
   ```

2. **Click on "Settings"** (top right of repository page)

3. **Scroll down to "Pages"** in the left sidebar

4. **Under "Source", select:**
   - Branch: `claude/revamp-homepage-accessibility-011CV1TssgqUj2KPsiKkaeZf`
   - Folder: `/ (root)`
   - Click **Save**

5. **Wait 1-2 minutes**, then your site will be live at:
   ```
   https://dac042-byte.github.io/project/kbiox-index.html
   ```

### Method 2: Create a gh-pages Branch (Recommended)

For a cleaner URL, create a dedicated `gh-pages` branch:

1. **In your terminal:**
   ```bash
   # Switch to the K-BioX branch
   git checkout claude/revamp-homepage-accessibility-011CV1TssgqUj2KPsiKkaeZf

   # Create and switch to gh-pages branch
   git checkout -b gh-pages

   # Rename kbiox-index.html to index.html for cleaner URL
   git mv kbiox-index.html index.html

   # Update CSS and JS references in index.html if needed
   # (They should already be correct as relative paths)

   # Commit the change
   git commit -m "Setup GitHub Pages with K-BioX accessible site"

   # Push to GitHub
   git push -u origin gh-pages
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select branch: `gh-pages`
   - Folder: `/ (root)`
   - Click Save

3. **Your site will be live at:**
   ```
   https://dac042-byte.github.io/project/
   ```

## 📁 Running Locally from Your Computer

### Option 1: Double-Click HTML File (Simple but Limited)

1. **Navigate to where you saved the files**
2. **Double-click `kbiox-index.html`**
3. **Opens in your default browser**

⚠️ **Limitation:** Some features may not work due to CORS (Cross-Origin Resource Sharing) restrictions.

### Option 2: Use a Local Server (Recommended)

#### Using Python (if installed):

```bash
# Python 3
cd /path/to/your/kbiox/files
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000/kbiox-index.html`

#### Using Node.js (if installed):

```bash
# Install http-server globally
npm install -g http-server

# Navigate to your folder
cd /path/to/your/kbiox/files

# Start server
http-server -p 8000
```

Then open: `http://localhost:8000/kbiox-index.html`

#### Using VS Code Live Server Extension:

1. **Install "Live Server" extension** in VS Code
2. **Right-click on `kbiox-index.html`**
3. **Select "Open with Live Server"**
4. **Opens automatically** at `http://127.0.0.1:5500/kbiox-index.html`

## 🖼️ Images Are Now Working!

All images have been updated to use online sources:

- **Logo:** Placeholder from via.placeholder.com
- **Hero Image:** Biotech lab from Unsplash
- **Event Images:** Conference and workshop photos from Unsplash
- **News Images:** Professional business photos from Unsplash
- **Partner Logos:** Gray placeholder logos

The site now works **immediately** without needing to download or host any images!

## 📝 File Structure for GitHub Pages

Your repository should have these files:

```
project/
├── kbiox-index.html          # Main HTML file (or rename to index.html)
├── kbiox-styles.css          # Stylesheet
├── kbiox-scripts.js          # JavaScript
├── KBIOX_ACCESSIBILITY_GUIDE.md
└── KBIOX_README.md
```

## 🔧 Customization - Adding Your Own Images

When you're ready to add real K-BioX images:

### Option 1: Host Images in the Same Repository

1. **Create an `images` folder:**
   ```bash
   mkdir -p images/partners images/events images/news
   ```

2. **Add your images:**
   ```
   images/
   ├── kbiox-logo.png
   ├── hero-biotech.jpg
   ├── partners/
   │   ├── partner-1.png
   │   ├── partner-2.png
   │   └── ...
   ├── events/
   │   └── ...
   └── news/
       └── ...
   ```

3. **Update image paths in HTML:**
   ```html
   <!-- Change from: -->
   <img src="https://via.placeholder.com/200x80/0047AB/FFFFFF?text=K-BioX">

   <!-- To: -->
   <img src="images/kbiox-logo.png">
   ```

4. **Commit and push:**
   ```bash
   git add images/
   git commit -m "Add K-BioX images"
   git push
   ```

### Option 2: Use External Image Hosting

You can also use:
- **Imgur** - Free image hosting
- **Cloudinary** - Free tier available
- **Your own server** - Use absolute URLs

## 🚀 Deployment Checklist

- [ ] All images display correctly
- [ ] CSS file loads properly (check browser console)
- [ ] JavaScript works (test navigation menus)
- [ ] Site is responsive on mobile
- [ ] Keyboard navigation works
- [ ] Colors and contrast look good
- [ ] Korean text displays correctly
- [ ] All links work (update placeholder links)

## 🔗 Sharing Your Site

Once deployed to GitHub Pages, share:

```
https://dac042-byte.github.io/project/
```

Or with the full filename if you didn't rename:

```
https://dac042-byte.github.io/project/kbiox-index.html
```

## 🛠️ Troubleshooting

### Images Not Showing Locally

**Problem:** Images don't load when opening HTML file directly.
**Solution:** Use a local server (Python, Node.js, or VS Code Live Server).

### CSS/JavaScript Not Loading

**Problem:** Styles or scripts don't work.
**Solution:**
1. Check that all files are in the same folder
2. Verify file names match exactly (case-sensitive!)
3. Use a local server instead of opening HTML directly

### GitHub Pages Shows 404

**Problem:** Site shows "404 - Page not found"
**Solution:**
1. Wait 2-5 minutes after enabling GitHub Pages
2. Check that the branch and folder are set correctly
3. Verify the URL includes the filename if not using `index.html`

### Korean Text Shows as Boxes

**Problem:** Korean characters don't display.
**Solution:**
1. Ensure UTF-8 encoding: `<meta charset="UTF-8">`
2. Your browser should auto-detect, but try installing Korean fonts
3. Check that your HTML file is saved as UTF-8

## 📞 Support

If you have issues:

1. **Check browser console** (F12) for errors
2. **Verify all files** are in the same directory
3. **Test in different browsers** (Chrome, Firefox, Safari)
4. **Clear browser cache** (Ctrl+F5 or Cmd+Shift+R)

## 🎉 Next Steps

1. **Enable GitHub Pages** using one of the methods above
2. **View your site** at the GitHub Pages URL
3. **Share the link** with stakeholders
4. **Gather feedback** on accessibility and design
5. **Replace placeholder images** with real K-BioX assets
6. **Update content** to match actual K-BioX information
7. **Test accessibility** with Korean screen readers

---

## 📋 Quick Command Reference

```bash
# Clone repository (if needed)
git clone https://github.com/dac042-byte/project.git
cd project

# Switch to K-BioX branch
git checkout claude/revamp-homepage-accessibility-011CV1TssgqUj2KPsiKkaeZf

# Create gh-pages branch for deployment
git checkout -b gh-pages

# Rename for cleaner URL (optional)
git mv kbiox-index.html index.html
git commit -m "Rename for GitHub Pages"

# Push to GitHub
git push -u origin gh-pages

# Start local server (Python)
python -m http.server 8000

# Or with Node.js
npx http-server -p 8000
```

Your site is now ready to go live! 🚀

---

**Last Updated:** January 11, 2025
**For:** K-BioX Networks Accessible Website
