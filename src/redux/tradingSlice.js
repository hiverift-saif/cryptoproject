// src/redux/tradingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 10000.00,
  currentAsset: "Bitcoin - OTC",
  payoutPercentage: 73,        // Ab yeh dynamically change hoga
  tradeAmount: 10,             // Better default 10 ya 50 se shuru karo
  tradeTime: "00:01:00",        // 1 minute trade
  chartType: "candle",
  timeframe: "M1",
  buttonStyle: "classic",
  
  // Future ke liye ready (optional abhi)
  openTrades: [],              // Active trades list
  tradeHistory: [],            // Completed trades
};

export const tradingSlice = createSlice({
  name: 'trading',
  initialState,
  reducers: {
    setTradeAmount: (state, action) => {
      state.tradeAmount = action.payload;
    },
    
    setAsset: (state, action) => {
      state.currentAsset = action.payload;
    },
    
    setPayoutPercentage: (state, action) => {
      state.payoutPercentage = action.payload;
    },
    
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
    
    setTimeframe: (state, action) => {
      state.timeframe = action.payload;
    },
    
    setButtonStyle: (state, action) => {
      state.buttonStyle = action.payload;
    },
    
    // Bonus: Balance update (win/lose trade ke baad)
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
    
    // Optional future actions
    addOpenTrade: (state, action) => {
      state.openTrades.push(action.payload);
    },
    
    moveToHistory: (state, action) => {
      const trade = state.openTrades.find(t => t.id === action.payload);
      if (trade) {
        state.tradeHistory.push(trade);
        state.openTrades = state.openTrades.filter(t => t.id !== action.payload);
      }
    },
  },
});

// Sab actions export kar do
export const {
  setTradeAmount,
  setAsset,
  setPayoutPercentage,
  setChartType,
  setTimeframe,
  setButtonStyle,
  updateBalance,
  addOpenTrade,
  moveToHistory,
} = tradingSlice.actions;

export default tradingSlice.reducer;