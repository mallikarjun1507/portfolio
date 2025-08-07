import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    portfolioData: {
      intro: {
        first_name: "",
        last_name: "",
        welcome_text: "",
        description: "",
        caption: ""
      },
      about: {
        skills: [],
        description: ""
      },
      projects: [],
      experience: [],
      education: [],
      contact: {
        email: "",
        phone: "",
        address: ""
      }
    },
    reloadData: false,
  },
  reducers: {
    Showloading: (state) => {
      state.loading = true;
    },
    HideLoading: (state) => {
      state.loading = false;
    },
    SetportfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
    ReloadData: (state, action) => {
      state.reloadData = action.payload;
    }
  },
});

export default rootSlice.reducer;
export const {
  Showloading,
  HideLoading,
  SetportfolioData,
  ReloadData
} = rootSlice.actions;
