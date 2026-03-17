# Deployment Guide - PennyWings

This document outlines the steps for redeploying the PennyWings codebase to Netlify using the automated workflow and MCP tools.

## Prerequisites

1.  **Build Tool**: Ensure `npm` is installed and you can run `npm run build`.
2.  **Netlify MCP**: The deployment relies on the Netlify MCP server for pushing the production build live.

## Redeployment Workflow

Follow these steps to deploy your latest changes:

### 1. Generate Production Build
First, you must compile the application into a production-ready package. This will generate a `dist` folder at the root of the project.

```bash
npm run build
```

### 2. Verify Build Output
Ensure that the `dist` folder contains the compiled `index.html` and assets.

### 3. Deploy to Netlify (via MCP)
Use the Netlify MCP server's `deploy-site` tool with the following parameters:

- **Site ID**: `a86a04a3-6ecf-406a-9370-9e659d96c204`
- **Deploy Directory**: `dist` (Absolute path recommended: `d:\Coding\BudgetTrackerSuperbase\dist`)

**Command used by AI:**
```json
{
  "operation": "deploy-site",
  "params": {
    "deployDirectory": "d:\\Coding\\BudgetTrackerSuperbase\\dist",
    "siteId": "a86a04a3-6ecf-406a-9370-9e659d96c204"
  }
}
```

### 4. Monitor Deployment
After execution, the MCP will return a `deployId` and a `monitorDeployUrl`. You can visit the Netlify dashboard to see the progress.

---

## Environment Variables
If you make changes to Supabase credentials or other API keys, ensure they are synced to Netlify:
1.  Use Netlify MCP `manage-env-vars` or update them manually in the Netlify Dashboard under **Site Settings > Environment Variables**.
2.  Redeploy the site after updating variables.

## Troubleshooting
- **Build Fails**: Check for linting or TypeScript errors in the terminal.
- **Site not updating**: Ensure you are deploying the correct `dist` folder and the `siteId` matches the intended project.
