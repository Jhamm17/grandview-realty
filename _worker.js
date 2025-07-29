export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Forward to Vercel deployment
    const vercelUrl = 'https://grandview-realty.vercel.app';
    
    // Create new request to Vercel with additional headers
    const modifiedRequest = new Request(
      `${vercelUrl}${url.pathname}${url.search}`,
      {
        method: request.method,
        headers: {
          ...Object.fromEntries(request.headers),
          'User-Agent': 'Mozilla/5.0 (compatible; GrandViewRealty/1.0)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
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