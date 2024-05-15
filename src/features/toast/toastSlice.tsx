import { createSlice } from '@reduxjs/toolkit'

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    show: false,
    message: {
      icon: '',
      text: ''
    }
  },
  reducers: {
    showToast: (state, action) => {
      state.show = true
      state.message = action.payload
    },
    hideToast: (state) => {
      state.message = {
        icon: '',
        text: ''
      }
      state.show = false
    }
  },
})

export const { showToast, hideToast } = toastSlice.actions
export default toastSlice.reducer