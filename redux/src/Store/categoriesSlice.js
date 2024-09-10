import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/categories?populate=image`, {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data = await response.json();
  return data.data;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default categoriesSlice.reducer;
