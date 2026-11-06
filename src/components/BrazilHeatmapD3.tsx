import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Compass, Flame, Users, Calendar, MapPin, Activity, Info } from 'lucide-react';
import { getLocationHashtag } from '../utils/hashtag';

export interface StateActivityData {
  uf: string;
  name: string;
  region: 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';
  activeUsers: number;
  eventsCount: number;
  connectionsCount: number;
  activityScore: number; // 0 to 100
  gridCol: number; // Column in cartogram grid (0-7)
  gridRow: number; // Row in cartogram grid (0-7)
}

// Geographic grid arrangement of Brazil's 27 states
export const BRAZIL_STATES_HEAT_DATA: StateActivityData[] = [
  // Row 0
  { uf: 'RR', name: 'Roraima', region: 'Norte', activeUsers: 1420, eventsCount: 12, connectionsCount: 280, activityScore: 42, gridCol: 2, gridRow: 0 },
  { uf: 'AP', name: 'Amapá', region: 'Norte', activeUsers: 1890, eventsCount: 15, connectionsCount: 390, activityScore: 48, gridCol: 4, gridRow: 0 },

  // Row 1
  { uf: 'AM', name: 'Amazonas', region: 'Norte', activeUsers: 9870, eventsCount: 64, connectionsCount: 2840, activityScore: 84, gridCol: 1, gridRow: 1 },
  { uf: 'PA', name: 'Pará', region: 'Norte', activeUsers: 7450, eventsCount: 48, connectionsCount: 1980, activityScore: 76, gridCol: 3, gridRow: 1 },
  { uf: 'MA', name: 'Maranhão', region: 'Nordeste', activeUsers: 4920, eventsCount: 32, connectionsCount: 1140, activityScore: 62, gridCol: 4, gridRow: 1 },
  { uf: 'PI', name: 'Piauí', region: 'Nordeste', activeUsers: 3410, eventsCount: 24, connectionsCount: 780, activityScore: 55, gridCol: 5, gridRow: 1 },
  { uf: 'CE', name: 'Ceará', region: 'Nordeste', activeUsers: 8940, eventsCount: 58, connectionsCount: 2450, activityScore: 82, gridCol: 6, gridRow: 1 },
  { uf: 'RN', name: 'Rio Grande do Norte', region: 'Nordeste', activeUsers: 4120, eventsCount: 28, connectionsCount: 960, activityScore: 59, gridCol: 7, gridRow: 1 },

  // Row 2
  { uf: 'AC', name: 'Acre', region: 'Norte', activeUsers: 1650, eventsCount: 14, connectionsCount: 320, activityScore: 44, gridCol: 0, gridRow: 2 },
  { uf: 'RO', name: 'Rondônia', region: 'Norte', activeUsers: 2840, eventsCount: 19, connectionsCount: 620, activityScore: 51, gridCol: 1, gridRow: 2 },
  { uf: 'MT', name: 'Mato Grosso', region: 'Centro-Oeste', activeUsers: 6320, eventsCount: 39, connectionsCount: 1540, activityScore: 71, gridCol: 2, gridRow: 2 },
  { uf: 'TO', name: 'Tocantins', region: 'Norte', activeUsers: 2980, eventsCount: 21, connectionsCount: 690, activityScore: 53, gridCol: 3, gridRow: 2 },
  { uf: 'BA', name: 'Bahia', region: 'Nordeste', activeUsers: 16840, eventsCount: 112, connectionsCount: 4950, activityScore: 92, gridCol: 5, gridRow: 2 },
  { uf: 'PE', name: 'Pernambuco', region: 'Nordeste', activeUsers: 11230, eventsCount: 76, connectionsCount: 3120, activityScore: 86, gridCol: 6, gridRow: 2 },
  { uf: 'PB', name: 'Paraíba', region: 'Nordeste', activeUsers: 4560, eventsCount: 31, connectionsCount: 1080, activityScore: 61, gridCol: 7, gridRow: 2 },

  // Row 3
  { uf: 'MS', name: 'Mato Grosso do Sul', region: 'Centro-Oeste', activeUsers: 5140, eventsCount: 34, connectionsCount: 1280, activityScore: 67, gridCol: 2, gridRow: 3 },
  { uf: 'GO', name: 'Goiás', region: 'Centro-Oeste', activeUsers: 7890, eventsCount: 49, connectionsCount: 2100, activityScore: 78, gridCol: 3, gridRow: 3 },
  { uf: 'DF', name: 'Distrito Federal', region: 'Centro-Oeste', activeUsers: 13540, eventsCount: 88, connectionsCount: 3890, activityScore: 90, gridCol: 4, gridRow: 3 },
  { uf: 'MG', name: 'Minas Gerais', region: 'Sudeste', activeUsers: 18450, eventsCount: 124, connectionsCount: 5410, activityScore: 94, gridCol: 5, gridRow: 3 },
  { uf: 'SE', name: 'Sergipe', region: 'Nordeste', activeUsers: 2950, eventsCount: 20, connectionsCount: 670, activityScore: 52, gridCol: 6, gridRow: 3 },
  { uf: 'AL', name: 'Alagoas', region: 'Nordeste', activeUsers: 3480, eventsCount: 25, connectionsCount: 810, activityScore: 56, gridCol: 7, gridRow: 3 },

  // Row 4
  { uf: 'PR', name: 'Paraná', region: 'Sul', activeUsers: 14320, eventsCount: 95, connectionsCount: 4210, activityScore: 91, gridCol: 3, gridRow: 4 },
  { uf: 'SP', name: 'São Paulo', region: 'Sudeste', activeUsers: 32450, eventsCount: 218, connectionsCount: 9870, activityScore: 99, gridCol: 4, gridRow: 4 },
  { uf: 'RJ', name: 'Rio de Janeiro', region: 'Sudeste', activeUsers: 24890, eventsCount: 168, connectionsCount: 7650, activityScore: 97, gridCol: 5, gridRow: 4 },
  { uf: 'ES', name: 'Espírito Santo', region: 'Sudeste', activeUsers: 5680, eventsCount: 37, connectionsCount: 1420, activityScore: 69, gridCol: 6, gridRow: 4 },

  // Row 5
  { uf: 'SC', name: 'Santa Catarina', region: 'Sul', activeUsers: 10870, eventsCount: 71, connectionsCount: 3180, activityScore: 85, gridCol: 3, gridRow: 5 },

  // Row 6
  { uf: 'RS', name: 'Rio Grande do Sul', region: 'Sul', activeUsers: 13120, eventsCount: 86, connectionsCount: 3950, activityScore: 89, gridCol: 3, gridRow: 6 }
];

interface BrazilHeatmapD3Props {
  onSelectState?: (uf: string) => void;
  selectedUf?: string;
}

export const BrazilHeatmapD3: React.FC<BrazilHeatmapD3Props> = ({
  onSelectState,
  selectedUf
}) => {
  const [metric, setMetric] = useState<'users' | 'events' | 'score'>('users');
  const [hoveredState, setHoveredState] = useState<StateActivityData | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Calculate dynamic value extractor based on selected metric
  const getValue = (d: StateActivityData) => {
    switch (metric) {
      case 'users':
        return d.activeUsers;
      case 'events':
        return d.eventsCount;
      case 'score':
        return d.activityScore;
    }
  };

  const metricLabel = {
    users: 'Membros Ativos',
    events: 'Eventos & Encontros',
    score: 'Índice de Atividade'
  }[metric];

  // Set up D3 Color Scale using Nós BR's Brazilian Emerald-to-Gold palette
  const values = BRAZIL_STATES_HEAT_DATA.map(getValue);
  const minVal = d3.min(values) || 0;
  const maxVal = d3.max(values) || 100;

  // D3 sequential scale
  const colorScale = d3.scaleSequential<string>()
    .domain([minVal, maxVal])
    .interpolator(d3.interpolateRgbBasis([
      '#e2e8f0', // soft slate low activity
      '#a7f3d0', // pale emerald
      '#34d399', // bright emerald
      '#059669', // deep emerald
      '#ca8a04', // golden yellow
      '#eab308'  // vibrant gold high activity
    ]));

  // Cartogram geometry settings
  const cellSize = 62;
  const gap = 8;
  const startX = 28;
  const startY = 24;

  // Render D3 decorative elements (axes/gradients)
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    // Create D3 defs for legend gradient
    const defs = svg.select('defs');
    if (defs.empty()) {
      const newDefs = svg.append('defs');
      const linearGradient = newDefs
        .append('linearGradient')
        .attr('id', 'heatLegendGradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');

      linearGradient.append('stop').attr('offset', '0%').attr('stop-color', '#e2e8f0');
      linearGradient.append('stop').attr('offset', '30%').attr('stop-color', '#34d399');
      linearGradient.append('stop').attr('offset', '70%').attr('stop-color', '#059669');
      linearGradient.append('stop').attr('offset', '100%').attr('stop-color', '#eab308');
    }
  }, [metric]);

  // Sort states by selected metric for the side leaderboard
  const topStates = [...BRAZIL_STATES_HEAT_DATA]
    .sort((a, b) => getValue(b) - getValue(a))
    .slice(0, 6);

  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-xs space-y-5">
      {/* Header and Metric Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 text-xs font-bold tracking-wider">
            <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>MAPA DE CALOR DA REDE NÓS BR · D3 ENGINE</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-display text-stone-900 dark:text-stone-100">
            Concentração de Membros & Atividades por Estado
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Visualização cartográfica em tempo real da densidade comunitária em cada uma das 27 unidades da federação.
          </p>
        </div>

        {/* Metric Segmented Control */}
        <div className="inline-flex p-1 bg-stone-100 dark:bg-stone-800 rounded-xl shrink-0 self-start sm:self-center">
          <button
            onClick={() => setMetric('users')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              metric === 'users'
                ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Membros</span>
          </button>
          <button
            onClick={() => setMetric('events')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              metric === 'events'
                ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Eventos</span>
          </button>
          <button
            onClick={() => setMetric('score')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              metric === 'score'
                ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Engajamento</span>
          </button>
        </div>
      </div>

      {/* Main Grid: D3 SVG Map on left, State Details & Leaderboard on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* D3 Heatmap SVG Container */}
        <div className="lg:col-span-8 flex flex-col items-center bg-stone-50/70 dark:bg-stone-950/40 rounded-2xl border border-stone-200/70 dark:border-stone-800/80 p-4 relative overflow-hidden">
          {/* Subtle watermarked map background orientation */}
          <div className="w-full flex items-center justify-between text-xs text-stone-500 mb-2 px-2">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              <span>Mapa Cartográfico do Brasil (Norte ➔ Sul)</span>
            </span>
            <span className="text-[11px] font-mono">26 Estados + DF</span>
          </div>

          <div className="w-full max-w-[580px] aspect-[8/7] relative">
            <svg
              ref={svgRef}
              viewBox="0 0 600 520"
              className="w-full h-full select-none"
            >
              {/* Region separation dashed guides */}
              <text x="32" y="16" fill="#94a3b8" fontSize="10" fontWeight="bold">NORTE</text>
              <text x="380" y="16" fill="#94a3b8" fontSize="10" fontWeight="bold">NORDESTE</text>
              <text x="140" y="270" fill="#94a3b8" fontSize="10" fontWeight="bold">CENTRO-OESTE</text>
              <text x="440" y="270" fill="#94a3b8" fontSize="10" fontWeight="bold">SUDESTE</text>
              <text x="210" y="490" fill="#94a3b8" fontSize="10" fontWeight="bold">SUL</text>

              {/* States tiles with D3 color fill */}
              {BRAZIL_STATES_HEAT_DATA.map(d => {
                const x = startX + d.gridCol * (cellSize + gap);
                const y = startY + d.gridRow * (cellSize + gap);
                const val = getValue(d);
                const fillColor = colorScale(val);
                const isHovered = hoveredState?.uf === d.uf;
                const isSelected = selectedUf === d.uf;

                // Determine contrast text color
                const isDarkBackground = val > maxVal * 0.45;
                const textColor = isDarkBackground ? '#ffffff' : '#0f172a';

                return (
                  <g
                    key={d.uf}
                    transform={`translate(${x}, ${y})`}
                    className="cursor-pointer transition-transform duration-150"
                    onMouseEnter={() => setHoveredState(d)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => onSelectState && onSelectState(d.uf)}
                  >
                    {/* State tile with D3 computed heatmap fill */}
                    <rect
                      width={cellSize}
                      height={cellSize}
                      rx={10}
                      fill={fillColor}
                      stroke={isSelected ? '#15803d' : isHovered ? '#0f172a' : 'rgba(0,0,0,0.08)'}
                      strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : 1}
                      className="transition-all duration-200"
                    />

                    {/* State Acronym (UF) */}
                    <text
                      x={cellSize / 2}
                      y={cellSize / 2 - 4}
                      textAnchor="middle"
                      fill={textColor}
                      fontSize="14"
                      fontWeight="800"
                      fontFamily="Outfit, sans-serif"
                    >
                      {d.uf}
                    </text>

                    {/* Metric Value inside tile */}
                    <text
                      x={cellSize / 2}
                      y={cellSize / 2 + 13}
                      textAnchor="middle"
                      fill={textColor}
                      fontSize="9.5"
                      fontWeight="600"
                      fontFamily="JetBrains Mono, monospace"
                      opacity="0.95"
                    >
                      {metric === 'users'
                        ? d.activeUsers >= 1000
                          ? `${(d.activeUsers / 1000).toFixed(1)}k`
                          : d.activeUsers
                        : metric === 'events'
                        ? `${d.eventsCount} ev`
                        : `${d.activityScore}%`}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* D3 Heatmap Legend Bar */}
          <div className="w-full max-w-sm mt-3 pt-3 border-t border-stone-200 dark:border-stone-800 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
              <span>Menor Atividade</span>
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                Escala de Calor ({metricLabel})
              </span>
              <span>Maior Concentração</span>
            </div>
            <div className="h-3 w-full rounded-full bg-gradient-to-r from-slate-200 via-emerald-400 to-amber-400 shadow-inner" />
            <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono tabular-nums">
              <span>{metric === 'users' ? `${minVal} membros` : metric === 'events' ? `${minVal} ev` : `${minVal}%`}</span>
              <span>{metric === 'users' ? `${Math.round(maxVal / 2)} membros` : metric === 'events' ? `${Math.round(maxVal / 2)} ev` : '50%'}</span>
              <span>{metric === 'users' ? `${maxVal.toLocaleString('pt-BR')} membros` : metric === 'events' ? `${maxVal} ev` : `${maxVal}%`}</span>
            </div>
          </div>
        </div>

        {/* State Spotlight & Leaderboard */}
        <div className="lg:col-span-4 space-y-4">
          {/* Spotlight Card */}
          {hoveredState ? (
            <div className="bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/70 dark:border-emerald-900/40 p-4 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                    Estado Selecionado
                  </span>
                  <h4 className="text-base font-bold font-display text-stone-900 dark:text-stone-100">
                    {hoveredState.name} ({hoveredState.uf})
                  </h4>
                  {/* The official State hashtag right below the name */}
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono tracking-tight mt-0.5">
                    {getLocationHashtag(hoveredState.name, hoveredState.uf)}
                  </p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 rounded-md">
                  Região {hoveredState.region}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-emerald-200/50 dark:border-emerald-900/40">
                <div className="p-2 bg-white/70 dark:bg-stone-900/60 rounded-xl">
                  <span className="block text-xs font-bold font-mono text-stone-900 dark:text-stone-100 tabular-nums">
                    {hoveredState.activeUsers.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-[10px] text-stone-500">Membros</span>
                </div>
                <div className="p-2 bg-white/70 dark:bg-stone-900/60 rounded-xl">
                  <span className="block text-xs font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums">
                    {hoveredState.eventsCount}
                  </span>
                  <span className="text-[10px] text-stone-500">Eventos</span>
                </div>
                <div className="p-2 bg-white/70 dark:bg-stone-900/60 rounded-xl">
                  <span className="block text-xs font-bold font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
                    {hoveredState.activityScore}%
                  </span>
                  <span className="text-[10px] text-stone-500">Atividade</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-700 dark:text-stone-300">
                <Info className="w-4 h-4 text-emerald-600" />
                <span>Passe o cursor sobre os estados</span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Passe o mouse ou toque nos quadrantes para inspecionar os indicadores de membros, eventos locais e a hashtag oficial de cada estado brasileiro.
              </p>
            </div>
          )}

          {/* Top Most Active States Leaderboard */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Estados com Maior Concentração</span>
              </span>
              <span className="text-[10px] text-stone-400 font-mono">Top 6</span>
            </div>

            <div className="space-y-2">
              {topStates.map((st, rank) => {
                const hashtag = getLocationHashtag(st.name, st.uf);
                const isSelected = selectedUf === st.uf;

                return (
                  <div
                    key={st.uf}
                    onMouseEnter={() => setHoveredState(st)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => onSelectState && onSelectState(st.uf)}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800'
                        : 'hover:bg-stone-50 dark:hover:bg-stone-800 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 text-center text-xs font-bold text-stone-400 font-mono">
                        #{rank + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                            {st.name}
                          </span>
                          <span className="text-[10px] font-semibold text-stone-400 font-mono">
                            ({st.uf})
                          </span>
                        </div>
                        {/* State hashtag directly below */}
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 font-mono block leading-none">
                          {hashtag}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100 block">
                        {metric === 'users'
                          ? st.activeUsers.toLocaleString('pt-BR')
                          : metric === 'events'
                          ? `${st.eventsCount} eventos`
                          : `${st.activityScore}%`}
                      </span>
                      <span className="text-[9.5px] text-stone-400">
                        {metric === 'users' ? 'membros' : 'no estado'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
