import React, { useLayoutEffect, useEffect, useRef, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5stock from "@amcharts/amcharts5/stock";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import { Settings2, X } from 'lucide-react'; 
import AssetSelector from './AssetSelector';

const ChartArea = () => {
  const chartRef = useRef(null);
  const controlsRef = useRef(null);
  const socketRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const seriesRef = useRef(null);
  const volumeSeriesRef = useRef(null);
  const dateAxisRef = useRef(null);
  const mainPanelRef = useRef(null);
  const valueAxisRef = useRef(null);
  const rootRef = useRef(null);

  const [showToolbar, setShowToolbar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const { currentAsset } = useSelector((state) => state.trading);

  // Responsive detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- LIVE DATA & CHART INITIALIZATION ---
  const loadData = useCallback(async (asset, interval) => {
    // ... (unchanged)
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    let symbolOnly = asset.split('/')[0].replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (symbolOnly === "BITCOIN") symbolOnly = "BTC";
    if (symbolOnly === "ETHEREUM") symbolOnly = "ETH";
    const binanceSymbol = symbolOnly + "USDT";

    try {
      const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${binanceSymbol}&interval=${interval}&limit=500`);
      const raw = await response.json();
      const data = raw.map(d => ({ Date: d[0], Open: +d[1], High: +d[2], Low: +d[3], Close: +d[4], Volume: +d[5] }));

      if (seriesRef.current) {
        seriesRef.current.data.setAll(data);
        volumeSeriesRef.current?.data.setAll(data);

        if (data.length > 35 && dateAxisRef.current) {
          const lastDate = data[data.length - 1].Date;
          const startDate = data[data.length - 35].Date;
          setTimeout(() => {
            dateAxisRef.current.zoomToDates(new Date(startDate), new Date(lastDate));
          }, 500);
        }
      }

      const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${binanceSymbol.toLowerCase()}@kline_${interval}`);
      ws.onmessage = (e) => {
        const k = JSON.parse(e.data).k;
        const live = { Date: k.t, Open: +k.o, High: +k.h, Low: +k.l, Close: +k.c, Volume: +k.v };

        if (seriesRef.current) {
          const dataList = seriesRef.current.data;
          const lastIndex = dataList.length - 1;
          const lastItem = lastIndex >= 0 ? dataList.getIndex(lastIndex) : null;

          if (lastItem && live.Date === lastItem.Date) {
            dataList.setIndex(lastIndex, live);
          } else if (!lastItem || live.Date > lastItem.Date) {
            dataList.push(live);
            if (volumeSeriesRef.current) volumeSeriesRef.current.data.push(live);
          }
        }
      };
      socketRef.current = ws;
    } catch (err) {
      if (symbolOnly !== "BTC") loadData("BTC/USD", interval);
    }
  }, []);

  useLayoutEffect(() => {
    let root = am5.Root.new(chartRef.current);
    rootRef.current = root;
    root.setThemes([am5themes_Animated.new(root), am5themes_Dark.new(root)]);

    const chartMobile = window.innerWidth < 768;

    let stockChart = root.container.children.push(am5stock.StockChart.new(root, { 
      paddingRight: 0, paddingLeft: 0 
    }));
    chartInstanceRef.current = stockChart;


    // --- YE WALI LINE YAHAN PASTE KAREIN ---
stockChart.set("maxZoomFactor", 20);

    let mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, { 
      wheelY: "zoomX", panX: true, panY: true 
      
    }));
    mainPanelRef.current = mainPanel;

    let yRenderer = am5xy.AxisRendererY.new(root, { pan: "zoom", opposite: true });
    if (chartMobile) {
      yRenderer.labels.template.setAll({ inside: true, fontSize: 10, fill: am5.color(0xffffff), centerX: am5.p100, paddingRight: 10 });
      yRenderer.grid.template.setAll({ strokeOpacity: 0.05 });
    }

    let valueAxis = mainPanel.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: yRenderer, extraMin: 0.1, extraMax: 0.1, numberFormat: "#,###.00"
    }));
    valueAxisRef.current = valueAxis;

    let dateAxis = mainPanel.xAxes.push(am5xy.GaplessDateAxis.new(root, {
      baseInterval: { timeUnit: "second", count: 1 },
      renderer: am5xy.AxisRendererX.new(root, { minGridDistance: chartMobile ? 40 : 70 })
    }));
    dateAxisRef.current = dateAxis;

    let valueSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
      name: currentAsset, valueXField: "Date", valueYField: "Close", highValueYField: "High", lowValueYField: "Low", openValueYField: "Open",
      calculateAggregates: true, xAxis: dateAxis, yAxis: valueAxis,
      interpolationDuration: 300, interpolationEasing: am5.ease.linear
    }));
    valueSeries.columns.template.setAll({ width: am5.percent(90), strokeOpacity: 1, fillOpacity: 1 });
    seriesRef.current = valueSeries;
    stockChart.set("stockSeries", valueSeries);

    const setSeriesType = (type) => {
      // ... (unchanged)
      if (!seriesRef.current) return;
      const data = seriesRef.current.data.values;
      mainPanel.series.removeValue(seriesRef.current);
      
      let newSeries;
      if (type === "line") {
        newSeries = mainPanel.series.push(am5xy.LineSeries.new(root, {
          name: currentAsset, valueXField: "Date", valueYField: "Close", xAxis: dateAxis, yAxis: valueAxis
        }));
      } 
      else if (type === "hollow") {
        newSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
          name: currentAsset, valueXField: "Date", valueYField: "Close", 
          highValueYField: "High", lowValueYField: "Low", openValueYField: "Open",
          xAxis: dateAxis, yAxis: valueAxis,
          clustered: false
        }));

        newSeries.columns.template.setAll({
          width: am5.percent(90),
          fillOpacity: 0,
          strokeWidth: 2,
          strokeOpacity: 1
        });
      }
      else if (type === "procandlestick" || type === "ohlc") { 
        newSeries = mainPanel.series.push(am5xy.OHLCSeries.new(root, {
          name: currentAsset, valueXField: "Date", valueYField: "Close", 
          highValueYField: "High", lowValueYField: "Low", openValueYField: "Open",
          xAxis: dateAxis, yAxis: valueAxis
        }));
      }
      else {
        newSeries = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
          name: currentAsset, valueXField: "Date", valueYField: "Close", 
          highValueYField: "High", lowValueYField: "Low", openValueYField: "Open",
          xAxis: dateAxis, yAxis: valueAxis
        }));
        newSeries.columns.template.setAll({ width: am5.percent(90), strokeOpacity: 1, fillOpacity: 1 });
      }

      newSeries.data.setAll(data);
      seriesRef.current = newSeries;
      stockChart.set("stockSeries", newSeries);
    };

    const typeControl = am5stock.SeriesTypeControl.new(root, { stockChart });
    typeControl.events.on("selected", (ev) => setSeriesType(ev.item.id));

    // Create legend for indicators
    const indicatorLegend = am5stock.StockLegend.new(root, { stockChart });

    // Set vertical layout for indicator search dropdown list
    indicatorLegend.set("layout", root.verticalLayout);

    am5stock.StockToolbar.new(root, {
      container: controlsRef.current,
      stockChart,
      controls: [
        am5stock.IndicatorControl.new(root, { stockChart, legend: indicatorLegend }),
        am5stock.IntervalControl.new(root, { stockChart, items: [{ id: "1m", label: "1m", interval: { timeUnit: "minute", count: 1 } }, { id: "5m", label: "5m", interval: { timeUnit: "minute", count: 5 } }] }),
        typeControl,
        am5stock.DrawingControl.new(root, { stockChart }),
        am5stock.ResetControl.new(root, { stockChart }),
        am5stock.SettingsControl.new(root, { stockChart })
      ]
    });

    loadData(currentAsset, "1m");
    return () => root.dispose();
  }, []);

  useEffect(() => {
    if (chartInstanceRef.current) {
      seriesRef.current?.set("name", currentAsset);
      loadData(currentAsset, "1m");
    }
  }, [currentAsset, loadData]);

  return (
    <div className="flex flex-col w-full h-full bg-black text-gray-300 overflow-hidden relative">
      {/* Floating Toolbar Overlay */}
      <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
        <div className={`pointer-events-auto ${isMobile ? 'flex flex-col items-start gap-4' : 'flex items-center gap-4'}`}>
          <div className="flex items-center gap-3">
            <div className="shadow-2xl"><AssetSelector /></div>
            <button 
              onClick={() => setShowToolbar(!showToolbar)}
              className="w-11 h-11 flex items-center justify-center bg-gradient-to-br from-[#1e222d]/90 to-[#161a26]/90 
                         backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl 
                         hover:from-[#1e222d] hover:to-[#161a26] hover:border-white/20 
                         active:scale-95 transition-all duration-200 group"
            >
              {showToolbar ? (
                <X size={20} className="text-gray-200 group-hover:text-white transition-colors" />
              ) : (
                <Settings2 size={20} className="text-gray-400 group-hover:text-white/90 transition-colors" />
              )}
            </button>
          </div>

          <div 
            className={`
              transition-all duration-500 ease-out
              ${showToolbar 
                ? 'opacity-100 pointer-events-auto translate-y-0 scale-100' 
                : 'opacity-0 pointer-events-none translate-y-2 scale-95'
              }
              ${isMobile 
                ? 'w-[calc(100vw-2rem)] max-w-sm' 
                : 'origin-left'
              }
            `}
          >
            <div className="glass-toolbar rounded-2xl shadow-2xl px-5 py-4">
              <div 
                ref={controlsRef} 
                className={`flex items-center gap-3 ${isMobile ? 'flex-wrap justify-center' : ''}`}
              />
            </div>
          </div>
        </div>
      </div>

      <div ref={chartRef} className="w-full h-full z-0" />

      {/* Premium Glassmorphism Styles + Indicator Dropdown Fix */}
      <style jsx>{`
        .glass-toolbar {
          background: linear-gradient(145deg, rgba(30, 34, 45, 0.94), rgba(22, 26, 38, 0.96));
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 20px 40px -12px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }

        /* Pill Buttons for Controls */
        .am5stock-control-list {
          
          gap: 0.75rem !important;
          padding: 0 !important;
        }

        .am5stock-control-list .am5stock-control {
          all: unset !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          min-width: 44px !important;
          height: 38px !important;
          padding: 0 12px !important;
          background: linear-gradient(145deg, rgba(40, 46, 57, 0.85), rgba(32, 38, 50, 0.9)) !important;
          backdrop-filter: blur(16px) !important;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          border-radius: 9999px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
          cursor: pointer !important;
          transition: all 0.25s ease !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          color: rgba(255, 255, 255, 0.95) !important;
        }

        .am5stock-control-list .am5stock-control:hover {
          background: linear-gradient(145deg, rgba(60, 70, 85, 0.95), rgba(45, 55, 70, 1)) !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.3) !important;
          transform: translateY(-2px) !important;
        }

        .am5stock-control-list .am5stock-control:active {
          transform: translateY(0) scale(0.96) !important;
        }

        .am5stock-control-list .am5stock-control[aria-pressed="true"],
        .am5stock-control-list .am5stock-control.am5-selected {
          background: linear-gradient(145deg, rgba(99, 102, 241, 0.25), rgba(79, 70, 229, 0.3)) !important;
          border-color: rgba(99, 102, 241, 0.6) !important;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.4), 0 6px 20px rgba(99, 102, 241, 0.4) !important;
          color: #ffffff !important;
        }

        .am5stock-control-list .am5stock-control svg {
          width: 18px !important;
          height: 18px !important;
          stroke-width: 2 !important;
          stroke: rgba(255, 255, 255, 0.9) !important;
        }

        .am5stock-control-list .am5stock-control:hover svg {
          stroke: #ffffff !important;
        }

        /* Indicator Dropdown List - Vertical Column Layout */
        .am5stock-indicator-list,
        .am5-list-template {
          flex-direction: column !important;
          align-items: stretch !important;
          width: 280px !important;
          max-height: 60vh !important;
          overflow-y: auto !important;
        }

        .am5stock-indicator-list .am5-item,
        .am5-list-template .am5-item {
          width: 100% !important;
          justify-content: flex-start !important;
          padding: 10px 16px !important;
          border-radius: 8px !important;
          margin: 2px 8px !important;
        }

        /* Dropdowns General */
        .am5-dropdown-list,
        .am5-list-template,
        .am5stock-control-dropdown {
          background: rgba(30, 34, 45, 0.98) !important;
          backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          border-radius: 14px !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6) !important;
        }

        /* Mobile Optimizations */
        @media (max-width: 767px) {
          .am5stock-control-list .am5stock-control {
            min-width: 52px !important;
            height: 44px !important;
            padding: 0 14px !important;
          }
          .am5stock-control-list .am5stock-control svg {
            width: 20px !important;
            height: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ChartArea;