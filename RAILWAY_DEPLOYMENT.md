# Railway Deployment Guide for Plant Disease Detection API

This guide will help you deploy your FastAPI backend on Railway.

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **GitHub CLI** (optional but recommended): For easier deployment

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

```bash
cd Sparton-SIH-2025
git add .
git commit -m "Add Railway deployment configuration"
git push origin main
```

### 2. Deploy on Railway

#### Option A: Using Railway Dashboard (Recommended)

1. **Go to [railway.app](https://railway.app)** and sign in
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your repository**: `Sparton-SIH-2025`
5. **Set Root Directory**: `api` (important!)
6. **Click "Deploy"**

#### Option B: Using Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
cd Sparton-SIH-2025/api
railway init

# Deploy
railway up
```

### 3. Configure Environment Variables

In your Railway dashboard:

1. **Go to your project**
2. **Click on "Variables" tab**
3. **Add these variables** (if needed):
   - `PORT`: `8000` (Railway sets this automatically)
   - `PYTHON_VERSION`: `3.11` (optional)

### 4. Get Your Backend URL

After deployment, Railway will provide a URL like:
`https://sparton-sih-2025-production-xxxxx.up.railway.app`

### 5. Update Frontend Environment Variable

1. **Go to your Vercel frontend project**
2. **Settings → Environment Variables**
3. **Update `VITE_API_URL`** with your Railway backend URL
4. **Redeploy frontend**

## File Structure for Railway

```
Sparton-SIH-2025/
├── api/                    # Railway deployment root
│   ├── main.py
│   ├── requirements.txt
│   ├── railway.json        # Railway configuration
│   ├── Procfile           # Process definition
│   └── saved_models/      # Your ML models
└── frontend/              # Vercel deployment
    ├── src/
    └── vercel.json
```

## Railway Configuration Files

### `railway.json`
- Defines build and deployment settings
- Sets health check path and timeout
- Configures restart policy

### `Procfile`
- Defines how to start your application
- Uses `uvicorn` with proper host and port settings

## Advantages of Railway

✅ **No Cold Starts**: Your app stays warm  
✅ **Large File Support**: Handles TensorFlow models  
✅ **Persistent Storage**: Models stay loaded  
✅ **Easy Scaling**: Automatic scaling based on traffic  
✅ **Custom Domains**: Add your own domain  
✅ **Environment Variables**: Easy configuration management  

## Monitoring Your Deployment

1. **Logs**: View real-time logs in Railway dashboard
2. **Metrics**: Monitor CPU, memory, and network usage
3. **Deployments**: Track deployment history
4. **Health Checks**: Automatic health monitoring

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check that root directory is set to `api`
   - Verify all dependencies are in `requirements.txt`
   - Check build logs for specific errors

2. **Model Loading Issues**:
   - Ensure model files are in `saved_models/` directory
   - Check file paths in your code
   - Verify model file sizes (Railway has generous limits)

3. **CORS Errors**:
   - Update `origins` list in `main.py`
   - Include your frontend URL
   - Add `https://*.railway.app` for Railway domains

### Debug Commands:

```bash
# Check Railway status
railway status

# View logs
railway logs

# Connect to Railway shell
railway shell
```

## Cost Information

- **Free Tier**: $5 credit monthly
- **Usage**: Pay only for what you use
- **Pricing**: Very affordable for small projects
- **Scaling**: Automatic scaling with usage

## Next Steps After Deployment

1. **Test Backend**: Visit your Railway URL
2. **Update Frontend**: Set `VITE_API_URL` environment variable
3. **Test Integration**: Upload an image and check predictions
4. **Monitor**: Keep an eye on usage and performance

## Support

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Community**: Railway Discord
- **Status**: [status.railway.app](https://status.railway.app)
