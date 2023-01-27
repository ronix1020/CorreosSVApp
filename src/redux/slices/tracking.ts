import { createSlice } from '@reduxjs/toolkit'



export interface ItemTracking {
  name: string;
  description: string;
  date: string;
  code: string;
}

export interface Tracking {
  items : ItemTracking[];
}

export const trackingSlice = createSlice({
  name: 'tracking',
  initialState: {
    items: []
  },
  reducers: {
    addItemTracking: (state, action) => {
      state.items.push(action.payload);
    }
  },
})

export const { addItemTracking } = trackingSlice.actions;

export const selectItems = (state: { slice: { items: Tracking; }; }) => state.slice.items;

export default trackingSlice.reducer;