import { useState, useEffect } from 'react';
import { Shield, RefreshCw, Smartphone, Monitor, ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';

interface Visit {
  ip: string;
  userAgent: string;
  path: string;
  referrer: string;
  gclid: string | null;
  screenWidth: number;
  isMobile: boolean;
  timestamp: number;
}

export default function AdminAnalytics({ onClose }: { onClose: () => void }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [kvActive, setKvActive] = useState(false);

  // Load auth state from session
  useEffect(() => {
    const savedPass = sessionStorage.getItem('admin_token');
    if (savedPass) {
      setPassword(savedPass);
      fetchStats(savedPass);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    fetchStats(password);
  };

  const fetchStats = async (authPass: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/analytics?code=${encodeURIComponent(authPass)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al obtener estadísticas');
      }

      setVisits(data.visits || []);
      setKvActive(!!data.kvActive);
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_token', authPass);
    } catch (err: any) {
      setError(err.message || 'Código incorrecto o base de datos no configurada.');
      setIsAuthenticated(false);
      sessionStorage.removeItem('admin_token');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setPassword('');
    setVisits([]);
  };

  // Helper metrics calculations
  const totalVisits = visits.length;
  const uniqueIps = Array.from(new Set(visits.map(v => v.ip)));
  const uniqueVisitorsCount = uniqueIps.length;
  
  const googleAdsClicks = visits.filter(v => v.gclid || v.referrer.toLowerCase().includes('gclid') || v.referrer.toLowerCase().includes('google')).length;
  
  const mobileVisits = visits.filter(v => v.isMobile).length;
  const desktopVisits = totalVisits - mobileVisits;
  const mobilePercentage = totalVisits > 0 ? Math.round((mobileVisits / totalVisits) * 100) : 0;

  // Group by IP to detect potential fraud (multiple clicks)
  const ipCounts = visits.reduce((acc, visit) => {
    acc[visit.ip] = (acc[visit.ip] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 font-sans p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center pb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose} 
              className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
                <Shield className="w-6 h-6 text-violet-400" />
                Panel de Monitoreo Analítico
              </h1>
              <p className="text-xs text-slate-500">
                Monitoreo de tráfico y detección de fraudes de clics de Google Ads
              </p>
            </div>
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => fetchStats(password)}
                disabled={loading}
                className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                title="Actualizar datos"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 transition-all cursor-pointer"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>

        {/* 1. NOT AUTHENTICATED: LOGIN SCREEN */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-20">
            <div className="bg-[#0b0e1d] border border-white/[0.08] rounded-3xl p-8 shadow-2xl space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-violet-600/10 text-violet-400 flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-white">Acceso de Administrador</h2>
                <p className="text-xs text-slate-400">
                  Ingresa tu código de seguridad para visualizar las métricas y registros de clics de Google Ads.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-medium">Código de Acceso</label>
                  <input
                    type="password"
                    placeholder="Escribe el código aquí..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white/[0.03] text-white placeholder-slate-600 text-sm py-3 px-4 rounded-xl border border-white/[0.06] focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-400 bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                    ⚠️ {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold shadow-lg hover:shadow-violet-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? 'Verificando...' : 'Ingresar al Panel'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* 2. AUTHENTICATED: METRICS & VISITS DASHBOARD */
          <div className="space-y-6">
            
            {/* Database connection status */}
            {!kvActive && (
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 text-amber-300 text-xs sm:text-sm flex flex-col sm:flex-row justify-between gap-3 items-start sm:items-center">
                <div>
                  <h4 className="font-bold flex items-center gap-1.5 text-amber-400">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    Base de Datos Vercel KV no Conectada
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">
                    El sistema está en modo demo y no guardará registros reales hasta que crees una base de datos KV en tu panel de Vercel.
                  </p>
                </div>
                <a 
                  href="https://vercel.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-xs border border-amber-500/20 transition-all text-center shrink-0 cursor-pointer"
                >
                  Ver Documentación
                </a>
              </div>
            )}

            {kvActive && (
              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                Base de datos Vercel KV conectada con éxito. Registrando y monitoreando IPs activamente.
              </div>
            )}

            {/* Metrics cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-[#0b0e1d] border border-white/[0.06] rounded-2xl p-5 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Visitas Totales (Clicks)</span>
                <div className="text-3xl font-extrabold text-white font-display">
                  {totalVisits}
                </div>
                <p className="text-[10px] text-slate-500">Hits totales registrados en la base</p>
              </div>

              <div className="bg-[#0b0e1d] border border-white/[0.06] rounded-2xl p-5 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Visitantes Únicos (IPs)</span>
                <div className="text-3xl font-extrabold text-white font-display">
                  {uniqueVisitorsCount}
                </div>
                <p className="text-[10px] text-slate-500">Filtro de IPs únicas para evitar duplicados</p>
              </div>

              <div className="bg-[#0b0e1d] border border-white/[0.06] rounded-2xl p-5 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Clics de Google Ads / Google</span>
                <div className="text-3xl font-extrabold text-cyan-400 font-display">
                  {googleAdsClicks}
                </div>
                <p className="text-[10px] text-slate-500">Visitas con parámetro GCLID o referidas</p>
              </div>

              <div className="bg-[#0b0e1d] border border-white/[0.06] rounded-2xl p-5 space-y-1">
                <span className="text-xs text-slate-400 font-medium">Dispositivo de Origen</span>
                <div className="text-3xl font-extrabold text-violet-400 font-display flex items-baseline gap-2">
                  <span>{mobilePercentage}%</span>
                  <span className="text-xs font-normal text-slate-400">Móvil</span>
                </div>
                <p className="text-[10px] text-slate-500">{desktopVisits} Escritorio | {mobileVisits} Celulares</p>
              </div>

            </div>

            {/* Main Log Table */}
            <div className="bg-[#0b0e1d] border border-white/[0.06] rounded-3xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-white/[0.04] bg-white/[0.01] flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Registro de Visitas Recientes</h3>
                <span className="text-xs text-slate-400">Mostrando últimas 1,000 entradas</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.04] text-slate-400 bg-white/[0.01]">
                      <th className="p-4 font-semibold">Dirección IP</th>
                      <th className="p-4 font-semibold">Fecha y Hora</th>
                      <th className="p-4 font-semibold">Dispositivo / Resolución</th>
                      <th className="p-4 font-semibold">Procedencia / Referencia</th>
                      <th className="p-4 font-semibold">Google Ads</th>
                      <th className="p-4 font-semibold text-right">Detección Fraude</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.03]">
                    {visits.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500">
                          No hay registros de visitas disponibles.
                        </td>
                      </tr>
                    ) : (
                      visits.map((visit, index) => {
                        const count = ipCounts[visit.ip] || 1;
                        const isSuspicious = count >= 4;
                        
                        return (
                          <tr key={index} className="hover:bg-white/[0.01] transition-colors">
                            <td className="p-4 font-mono font-bold text-slate-200">
                              {visit.ip}
                            </td>
                            <td className="p-4 text-slate-300">
                              {new Date(visit.timestamp).toLocaleString('es-MX')}
                            </td>
                            <td className="p-4 text-slate-400 flex items-center gap-2">
                              {visit.isMobile ? <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> : <Monitor className="w-3.5 h-3.5 text-violet-400" />}
                              <span>{visit.screenWidth}px</span>
                            </td>
                            <td className="p-4 text-slate-400 max-w-[200px] truncate" title={visit.referrer}>
                              {visit.referrer}
                            </td>
                            <td className="p-4">
                              {visit.gclid ? (
                                <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 font-bold text-[9px] border border-cyan-500/20">
                                  CAMP-GCLID
                                </span>
                              ) : (
                                <span className="text-slate-600 text-[10px]">-</span>
                              )}
                            </td>
                            <td className="p-4 text-right">
                              {isSuspicious ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 font-bold text-[9px] border border-red-500/20 animate-pulse">
                                  <AlertTriangle className="w-3 h-3" />
                                  Repetido ({count} clics)
                                </span>
                              ) : count > 1 ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold text-[9px] border border-amber-500/20">
                                  Frecuente ({count})
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[9px] border border-emerald-500/20">
                                  Único (OK)
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
