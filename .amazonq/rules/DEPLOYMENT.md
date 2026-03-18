# Deployment Rules

## ⚠️ ALWAYS BUILD BEFORE DEPLOYING

Before triggering any Netlify deploy, you **must** run the production build first.
Deploying raw source files causes a MIME type error in the browser (`application/octet-stream`).

### Steps (in order)

1. **Build the project**
   ```bash
   npm run build
   ```
   This compiles all `.jsx` / `.js` source files into `dist/`.

2. **Deploy the `dist/` folder to Netlify**
   - Via Netlify MCP: set `deployDirectory` to the absolute path of `dist/`
   - Example: `/Users/bamcortez/Documents/Code/BudgetTrackerSuperbase/dist`

3. **Commit and push** any config changes (e.g. `netlify.toml`) after deploy.

---

### Netlify Config

The `netlify.toml` at the project root is configured with:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **SPA redirect**: all routes fall back to `index.html` (required for React Router)

---

### Site Info

| Property | Value |
|---|---|
| Site name | `penny-wings` |
| Site ID | `a86a04a3-6ecf-406a-9370-9e659d96c204` |
| Production URL | https://penny-wings.netlify.app |
| Netlify Dashboard | https://app.netlify.com/projects/penny-wings |
