import { NextResponse } from 'next/server';
import axios from 'axios';

// Instagram API configuration
const INSTAGRAM_APP_ID = process.env.INSTAGRAM_APP_ID;
const INSTAGRAM_APP_SECRET = process.env.INSTAGRAM_APP_SECRET;
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

interface InstagramPost {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

interface InstagramResponse {
  data: InstagramPost[];
  paging?: {
    cursors?: {
      before?: string;
      after?: string;
    };
    next?: string;
  };
}

export async function GET() {
  try {
    // Check if we have the required environment variables
    if (!INSTAGRAM_ACCESS_TOKEN) {
      console.warn('Instagram access token not configured');
      return NextResponse.json({ 
        posts: [],
        error: 'Instagram not configured' 
      });
    }

    // Fetch Instagram posts
    const response = await axios.get<InstagramResponse>(
      `https://graph.instagram.com/me/media`,
      {
        params: {
          fields: 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp',
          access_token: INSTAGRAM_ACCESS_TOKEN,
          limit: 12 // Get latest 12 posts
        }
      }
    );

    // Transform the data for our frontend
    const posts = response.data.data.map(post => ({
      id: post.id,
      mediaUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
      permalink: post.permalink,
      caption: post.caption ? post.caption.substring(0, 100) + '...' : '',
      timestamp: post.timestamp,
      mediaType: post.media_type
    }));

    return NextResponse.json({ 
      posts,
      count: posts.length
    });

  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    
    // Return mock data for development/testing
    return NextResponse.json({
      posts: [
        {
          id: '1',
          mediaUrl: '/property-1.jpg',
          permalink: 'https://www.instagram.com/grandviewrealtygeneva/',
          caption: 'Beautiful property in Geneva, IL - Just listed!',
          timestamp: new Date().toISOString(),
          mediaType: 'IMAGE'
        },
        {
          id: '2',
          mediaUrl: '/property-2.jpg',
          permalink: 'https://www.instagram.com/grandviewrealtygeneva/',
          caption: 'Stunning home with amazing views',
          timestamp: new Date().toISOString(),
          mediaType: 'IMAGE'
        },
        {
          id: '3',
          mediaUrl: '/property-3.jpg',
          permalink: 'https://www.instagram.com/grandviewrealtygeneva/',
          caption: 'Modern living in the heart of Chicagoland',
          timestamp: new Date().toISOString(),
          mediaType: 'IMAGE'
        },
        {
          id: '4',
          mediaUrl: '/hero-image.jpg',
          permalink: 'https://www.instagram.com/grandviewrealtygeneva/',
          caption: 'Your trusted real estate partner',
          timestamp: new Date().toISOString(),
          mediaType: 'IMAGE'
        }
      ],
      count: 4,
      error: 'Using mock data - configure Instagram API for live feed'
    });
  }
} 