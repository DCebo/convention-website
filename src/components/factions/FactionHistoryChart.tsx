'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Faction } from '@/types/factions';

interface HistoryDataPoint {
  timestamp: Date;
  factionId: string;
  points: number;
  members: number;
}

interface FactionHistoryChartProps {
  factions: Faction[];
  historyData: HistoryDataPoint[];
  timeRange?: '24h' | '7d' | '30d' | 'all';
  showMembers?: boolean;
  height?: number;
  className?: string;
}

export default function FactionHistoryChart({
  factions,
  historyData,
  timeRange = '7d',
  showMembers = false,
  height = 300,
  className = ''
}: FactionHistoryChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedMetric, setSelectedMetric] = useState<'points' | 'members'>('points');
  const [hoveredPoint, setHoveredPoint] = useState<{
    faction: Faction;
    data: HistoryDataPoint;
    x: number;
    y: number;
  } | null>(null);

  // Filter data based on time range
  const getFilteredData = useCallback((): HistoryDataPoint[] => {
    const now = new Date();
    let cutoffDate: Date;

    switch (timeRange) {
      case '24h':
        cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoffDate = new Date(0);
    }

    return historyData.filter(point => point.timestamp >= cutoffDate);
  }, [historyData, timeRange]);

  // Draw the chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const filteredData = getFilteredData();
    if (filteredData.length === 0) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const chartHeight = rect.height;
    const padding = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, width, chartHeight);

    // Get data ranges
    const timestamps = filteredData.map(d => d.timestamp.getTime());
    const minTime = Math.min(...timestamps);
    const maxTime = Math.max(...timestamps);
    
    const values = filteredData.map(d => selectedMetric === 'points' ? d.points : d.members);
    const minValue = Math.min(...values, 0);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;

    // Helper functions
    const getX = (timestamp: number) => padding.left + ((timestamp - minTime) / (maxTime - minTime)) * chartWidth;
    const getY = (value: number) => padding.top + ((maxValue - value) / valueRange) * innerHeight;

    // Draw grid lines
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const value = minValue + (valueRange * i / 5);
      const y = getY(value);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();

      // Y-axis labels
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(value).toLocaleString(), padding.left - 10, y + 4);
    }

    // Vertical grid lines (time)
    const timeSteps = 5;
    for (let i = 0; i <= timeSteps; i++) {
      const timestamp = minTime + ((maxTime - minTime) * i / timeSteps);
      const x = getX(timestamp);
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + innerHeight);
      ctx.stroke();

      // X-axis labels
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      const date = new Date(timestamp);
      const label = timeRange === '24h' 
        ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      ctx.fillText(label, x, padding.top + innerHeight + 20);
    }

    // Draw faction lines
    factions.forEach(faction => {
      const factionData = filteredData
        .filter(d => d.factionId === faction.id)
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

      if (factionData.length === 0) return;

      // Draw line
      ctx.strokeStyle = faction.colors.primary;
      ctx.lineWidth = 3;
      ctx.beginPath();

      factionData.forEach((point, index) => {
        const x = getX(point.timestamp.getTime());
        const y = getY(selectedMetric === 'points' ? point.points : point.members);

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Draw points
      ctx.fillStyle = faction.colors.primary;
      factionData.forEach(point => {
        const x = getX(point.timestamp.getTime());
        const y = getY(selectedMetric === 'points' ? point.points : point.members);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();

        // Add white border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });

    // Draw axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Y-axis
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + innerHeight);
    // X-axis
    ctx.moveTo(padding.left, padding.top + innerHeight);
    ctx.lineTo(padding.left + chartWidth, padding.top + innerHeight);
    ctx.stroke();

    // Y-axis label
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(20, padding.top + innerHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(selectedMetric === 'points' ? 'Total Points' : 'Member Count', 0, 0);
    ctx.restore();

    // X-axis label
    ctx.textAlign = 'center';
    ctx.fillText('Time', padding.left + chartWidth / 2, chartHeight - 5);

  }, [factions, historyData, timeRange, selectedMetric, getFilteredData]);

  // Handle mouse events for tooltips
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Find closest data point
    const filteredData = getFilteredData();
    const padding = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartWidth = rect.width - padding.left - padding.right;
    const innerHeight = rect.height - padding.top - padding.bottom;

    if (filteredData.length === 0) return;

    const timestamps = filteredData.map(d => d.timestamp.getTime());
    const minTime = Math.min(...timestamps);
    const maxTime = Math.max(...timestamps);
    
    const values = filteredData.map(d => selectedMetric === 'points' ? d.points : d.members);
    const minValue = Math.min(...values, 0);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;

    const getX = (timestamp: number) => padding.left + ((timestamp - minTime) / (maxTime - minTime)) * chartWidth;
    const getY = (value: number) => padding.top + ((maxValue - value) / valueRange) * innerHeight;

    let closestPoint: typeof hoveredPoint = null;
    let minDistance = Infinity;

    filteredData.forEach(point => {
      const faction = factions.find(f => f.id === point.factionId);
      if (!faction) return;

      const pointX = getX(point.timestamp.getTime());
      const pointY = getY(selectedMetric === 'points' ? point.points : point.members);
      const distance = Math.sqrt((x - pointX) ** 2 + (y - pointY) ** 2);

      if (distance < 20 && distance < minDistance) {
        minDistance = distance;
        closestPoint = { faction, data: point, x: pointX, y: pointY };
      }
    });

    setHoveredPoint(closestPoint);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  // Generate mock data if none provided
  const mockData = (): HistoryDataPoint[] => {
    const data: HistoryDataPoint[] = [];
    const now = new Date();
    const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30;
    
    factions.forEach(faction => {
      for (let i = days; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const basePoints = Math.floor(Math.random() * 1000) + i * 50;
        const baseMembers = Math.floor(Math.random() * 50) + i * 2;
        
        data.push({
          timestamp,
          factionId: faction.id,
          points: basePoints,
          members: baseMembers
        });
      }
    });
    
    return data;
  };

  // Use mock data if no real data provided
  if (historyData.length === 0) {
    mockData();
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Faction Progress History
          </h3>
          <div className="flex items-center space-x-4">
            {/* Metric Toggle */}
            {showMembers && (
              <div className="flex bg-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setSelectedMetric('points')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    selectedMetric === 'points'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Points
                </button>
                <button
                  onClick={() => setSelectedMetric('members')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    selectedMetric === 'members'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Members
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative p-4">
        <canvas
          ref={canvasRef}
          width={800}
          height={height}
          className="w-full cursor-crosshair"
          style={{ height: `${height}px` }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />

        {/* Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-10 bg-gray-900 text-white text-sm rounded-lg p-3 shadow-lg pointer-events-none"
            style={{
              left: hoveredPoint.x + 10,
              top: hoveredPoint.y - 10,
              transform: 'translateY(-100%)'
            }}
          >
            <div className="font-bold mb-1" style={{ color: hoveredPoint.faction.colors.primary }}>
              {hoveredPoint.faction.displayName}
            </div>
            <div className="space-y-1">
              <div>
                {selectedMetric === 'points' ? 'Points' : 'Members'}: {' '}
                <span className="font-semibold">
                  {(selectedMetric === 'points' ? hoveredPoint.data.points : hoveredPoint.data.members).toLocaleString()}
                </span>
              </div>
              <div className="text-gray-300 text-xs">
                {hoveredPoint.data.timestamp.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {factions.map(faction => (
            <div key={faction.id} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: faction.colors.primary }}
              />
              <span className="text-sm font-medium text-gray-700">
                {faction.displayName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}