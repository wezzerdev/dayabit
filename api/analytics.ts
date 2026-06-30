import { VercelRequest, VercelResponse } from '@vercel/node';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'dayabit2026';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { KV_REST_API_URL, KV_REST_API_TOKEN } = process.env;
  
  const isKvConfigured = !!(KV_REST_API_URL && KV_REST_API_TOKEN);

  // 1. POST: Log a new visit
  if (req.method === 'POST') {
    try {
      const { path, referrer, gclid, screenWidth, isMobile } = req.body || {};
      
      // Extract IP address from headers securely
      const ip = (req.headers['x-forwarded-for'] as string || req.headers['x-real-ip'] as string || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
      const userAgent = req.headers['user-agent'] || 'unknown';
      const timestamp = Date.now();

      const visitData = {
        ip,
        userAgent,
        path: path || '/',
        referrer: referrer || 'Directo',
        gclid: gclid || null,
        screenWidth: screenWidth || 0,
        isMobile: !!isMobile,
        timestamp
      };

      if (isKvConfigured) {
        // Push visit to a Redis list named "dayabit_visits"
        await fetch(`${KV_REST_API_URL}/lpush/dayabit_visits/${encodeURIComponent(JSON.stringify(visitData))}`, {
          headers: {
            Authorization: `Bearer ${KV_REST_API_TOKEN}`
          }
        });

        // Trim list to keep only the last 1000 items (free tier limits)
        await fetch(`${KV_REST_API_URL}/ltrim/dayabit_visits/0/999`, {
          headers: {
            Authorization: `Bearer ${KV_REST_API_TOKEN}`
          }
        });
      }

      res.status(200).json({ success: true, kvActive: isKvConfigured, ip: ip });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
    return;
  }

  // 2. GET: Retrieve visits (requires password verification)
  if (req.method === 'GET') {
    const { code } = req.query;

    if (!code || code !== ADMIN_PASSWORD) {
      res.status(401).json({ error: 'Acceso no autorizado. Código incorrecto.' });
      return;
    }

    if (!isKvConfigured) {
      res.status(200).json({ 
        success: true, 
        kvActive: false, 
        visits: [],
        message: 'Base de datos Vercel KV no conectada todavía.' 
      });
      return;
    }

    try {
      // Get all items in the Redis list
      const response = await fetch(`${KV_REST_API_URL}/lrange/dayabit_visits/0/-1`, {
        headers: {
          Authorization: `Bearer ${KV_REST_API_TOKEN}`
        }
      });
      
      const result = await response.json();
      
      // Parse list items
      const visits = (result.result || []).map((item: string) => {
        try {
          return JSON.parse(item);
        } catch {
          return null;
        }
      }).filter(Boolean);

      res.status(200).json({ 
        success: true, 
        kvActive: true, 
        visits 
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
    return;
  }

  res.status(405).json({ error: 'Método no permitido' });
}
