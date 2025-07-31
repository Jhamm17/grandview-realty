# Instagram API Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Instagram App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Create App" → Choose "Consumer" or "Business"
3. Add "Instagram Basic Display" product to your app
4. Configure OAuth Redirect URIs (we'll add this later)

### Step 2: Convert Instagram Account
- Convert your Instagram account to a **Business account**
- Connect it to your Facebook page
- This gives you access to more API features

### Step 3: Get Access Token
1. In your Facebook app dashboard, go to "Instagram Basic Display"
2. Click "Generate Token"
3. Follow the OAuth flow to authorize your account
4. Copy the access token

### Step 4: Add Environment Variables
Create a `.env.local` file in your project root with:

```env
# Instagram API Configuration
INSTAGRAM_APP_ID=your_instagram_app_id_here
INSTAGRAM_APP_SECRET=your_instagram_app_secret_here
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
```

### Step 5: Test the Integration
1. Restart your development server
2. Visit `/community/social-media`
3. You should see your live Instagram posts!

## 🔧 Advanced Configuration

### OAuth Redirect URIs
Add these to your Facebook app settings:
- `http://localhost:3000/api/instagram/auth/callback` (development)
- `https://yourdomain.com/api/instagram/auth/callback` (production)

### Token Refresh
Instagram access tokens expire. You can:
- Manually refresh them in the Facebook app dashboard
- Set up automatic refresh (advanced)

## 🎯 Features Included

✅ **Live Instagram Feed** - Automatically updates with new posts
✅ **Responsive Design** - Works on all devices
✅ **Hover Effects** - Professional interactions
✅ **Error Handling** - Graceful fallbacks
✅ **Loading States** - Smooth user experience
✅ **Mock Data** - Works without API setup

## 🆘 Troubleshooting

### "Instagram not configured" error
- Check your environment variables
- Ensure `.env.local` file exists
- Restart your development server

### "Failed to load Instagram posts" error
- Verify your access token is valid
- Check Instagram account permissions
- Ensure your Instagram account is public

### Posts not showing up
- Make sure your Instagram posts are public
- Check that your access token has the right permissions
- Verify your Instagram account is connected to Facebook

## 📞 Support

If you need help:
1. Check the [Instagram Basic Display API docs](https://developers.facebook.com/docs/instagram-basic-display-api)
2. Verify your Facebook app settings
3. Test with the mock data first

## 🎉 Success!

Once configured, your Instagram feed will:
- ✅ Automatically update with new posts
- ✅ Display beautiful hover effects
- ✅ Link directly to Instagram posts
- ✅ Show captions on hover
- ✅ Work seamlessly across all devices 