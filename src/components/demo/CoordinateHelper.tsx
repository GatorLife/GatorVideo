// Development helper to find click coordinates
// Displays coordinates when you click on the screen
import React, { useState } from 'react';
import { COLORS } from '../../config/theme';

interface ClickPoint {
  x: number;
  y: number;
  timestamp: number;
}

interface CoordinateHelperProps {
  enabled?: boolean;
  contentArea: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  screenshotDimensions?: {
    width: number;
    height: number;
  };
}

export const CoordinateHelper: React.FC<CoordinateHelperProps> = ({
  enabled = true,
  contentArea,
  screenshotDimensions,
}) => {
  const [clicks, setClicks] = useState<ClickPoint[]>([]);
  const [lastClick, setLastClick] = useState<ClickPoint | null>(null);

  if (!enabled) return null;

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    const point = { x, y, timestamp: Date.now() };
    setLastClick(point);
    setClicks(prev => [...prev.slice(-4), point]); // Keep last 5 clicks

    // Also log to console for easy copying
    console.log(`Click at: { x: ${x}, y: ${y} }`);

    // Calculate relative position within content area
    const relX = x - contentArea.left;
    const relY = y - contentArea.top;
    console.log(`Relative to content: { x: ${relX}, y: ${relY} }`);

    // If screenshot dimensions provided, calculate original coordinates
    if (screenshotDimensions) {
      const scaleX = contentArea.width / screenshotDimensions.width;
      const scaleY = contentArea.height / screenshotDimensions.height;
      const scale = Math.min(scaleX, scaleY); // contain behavior

      const scaledWidth = screenshotDimensions.width * scale;
      const scaledHeight = screenshotDimensions.height * scale;
      const offsetX = (contentArea.width - scaledWidth) / 2;
      const offsetY = (contentArea.height - scaledHeight) / 2;

      const screenshotX = Math.round((relX - offsetX) / scale);
      const screenshotY = Math.round((relY - offsetY) / scale);
      console.log(`Screenshot coords: { x: ${screenshotX}, y: ${screenshotY} }`);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        cursor: 'crosshair',
        zIndex: 9999,
      }}
    >
      {/* Click markers */}
      {clicks.map((click, i) => (
        <div
          key={click.timestamp}
          style={{
            position: 'absolute',
            left: click.x - 6,
            top: click.y - 6,
            width: 12,
            height: 12,
            borderRadius: '50%',
            border: `2px solid ${COLORS.accentGreen}`,
            backgroundColor: i === clicks.length - 1 ? COLORS.accentGreen : 'transparent',
            opacity: 0.5 + (i / clicks.length) * 0.5,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Coordinate display */}
      {lastClick && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            padding: '12px 16px',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderRadius: 8,
            border: `1px solid ${COLORS.accentGreen}`,
            fontFamily: 'monospace',
            fontSize: 14,
            color: '#fff',
            pointerEvents: 'none',
          }}
        >
          <div style={{ color: COLORS.accentGreen, marginBottom: 8, fontWeight: 'bold' }}>
            COORDINATE HELPER (dev mode)
          </div>
          <div>Canvas: <span style={{ color: COLORS.accentGreen }}>x: {lastClick.x}, y: {lastClick.y}</span></div>
          <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
            Click anywhere to get coordinates
          </div>
          <div style={{ marginTop: 4, fontSize: 12, color: '#888' }}>
            Check browser console for full details
          </div>
        </div>
      )}

      {/* Content area outline */}
      <div
        style={{
          position: 'absolute',
          left: contentArea.left,
          top: contentArea.top,
          width: contentArea.width,
          height: contentArea.height,
          border: `1px dashed ${COLORS.accentGreen}40`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
