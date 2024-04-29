import { createSlice } from '@reduxjs/toolkit'

// Define the initial state using that type
const initialState = {
  startDate: '',
  endDate: '',
  targetCurrency: ''
}

export const reportSlice = createSlice({
  name: 'report',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setStartDate: (state, actions) => {
      state.startDate = actions.payload;
    },
    setEndDate: (state, actions) => {
      state.endDate = actions.payload
    },
    setTargetCurrency: (state, actions) => {
      state.targetCurrency = actions.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setStartDate, setEndDate, setTargetCurrency } = reportSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const reportStartDate = (state) => state.report.startDate
export const reportEndDate = (state) => state.report.endDate
export const reportTargetCurrency = (state) => state.report.targetCurrency

export default reportSlice.reducer