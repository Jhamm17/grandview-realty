export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Forward to Vercel deployment
    const vercelUrl = 'https://grandview-realty.vercel.app';
    
    // Create new request to Vercel
    const modifiedRequest = new Request(
      `${vercelUrl}${url.pathname}${url.search}`,
      {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'follow',
      }
    );

    // Add caching headers for images
    if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      const response = await fetch(modifiedRequest);
      const newResponse = new Response(response.body, response);
      
      // Cache images for 7 days
      newResponse.headers.set('Cache-Control', 'public, max-age=604800');
      return newResponse;
    }

    return fetch(modifiedRequest);
  }
} 