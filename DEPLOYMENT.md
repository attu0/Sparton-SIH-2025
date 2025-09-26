# Deployment Guide for Plant Disease Detection App

This guide will help you deploy both your React frontend and FastAPI backend on Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Node.js**: For local development (if needed)

## Deployment Steps

### 1. Deploy FastAPI Backend

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add Vercel configuration"
   git push origin main
   ```

2. **Deploy Backend on Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository
   - **Important**: Set the root directory to `Sparton-SIH-2025/api`
   - Vercel will automatically detect it's a Python project
   - Click "Deploy"

3. **Note your backend URL**: After deployment, Vercel will provide a URL like `https://your-backend-name.vercel.app`

### 2. Deploy React Frontend

1. **Update CORS settings** in your backend:
   - Go to your deployed backend URL
   - Update the `origins` list in `main.py` to include your frontend URL
   - Or use the wildcard `"https://*.vercel.app"` for all Vercel domains

2. **Deploy Frontend on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import the same GitHub repository
   - **Important**: Set the root directory to `Sparton-SIH-2025/frontend`
   - Vercel will automatically detect it's a React project
   - In the "Environment Variables" section, add:
     - `VITE_API_URL` = `https://your-backend-name.vercel.app`
   - Click "Deploy"

### 3. Update Backend CORS (After Frontend Deployment)

1. **Get your frontend URL** from Vercel dashboard
2. **Update the backend**:
   - Go to your backend repository
   - Edit `api/main.py`
   - Replace `"https://your-frontend-domain.vercel.app"` with your actual frontend URL
   - Commit and push changes
   - Vercel will automatically redeploy

## File Structure After Deployment

```
Sparton-SIH-2025/
├── api/                    # Backend deployment
│   ├── main.py
│   ├── requirements.txt
│   ├── vercel.json        # Vercel config for backend
│   └── saved_models/      # Your ML models
└── frontend/              # Frontend deployment
    ├── src/
    ├── package.json
    └── vercel.json        # Vercel config for frontend
```

## Environment Variables

### Backend (Automatic)
- Vercel automatically handles Python dependencies from `requirements.txt`

### Frontend (Manual Setup)
- `VITE_API_URL`: Your backend URL (e.g., `https://your-backend.vercel.app`)

## Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Ensure your backend URL is in the `origins` list
   - Check that the frontend is using the correct API URL

2. **Model Loading Issues**:
   - Ensure your model files are in the `saved_models/` directory
   - Check file sizes (Vercel has limits for serverless functions)

3. **Build Failures**:
   - Check that all dependencies are in `requirements.txt`
   - Ensure Python version compatibility

### Model Size Considerations:

- Vercel has a 50MB limit for serverless functions
- If your models are larger, consider:
  - Using model compression
  - Storing models in external storage (AWS S3, etc.)
  - Using a different deployment platform for the backend

## Testing Your Deployment

1. **Test Backend**: Visit `https://your-backend.vercel.app` - should show "Welcome to Plant Disease Detection API"
2. **Test Frontend**: Visit `https://your-frontend.vercel.app` - should load the React app
3. **Test Integration**: Upload an image and check if prediction works

## Monitoring

- Use Vercel dashboard to monitor deployments
- Check function logs for any errors
- Monitor API usage and performance

## Cost Considerations

- Vercel offers a generous free tier
- Backend functions have execution time limits on free tier
- Consider upgrading if you need more resources

## Next Steps

1. Set up custom domains (optional)
2. Configure monitoring and analytics
3. Set up CI/CD for automatic deployments
4. Consider using Vercel's edge functions for better performance
