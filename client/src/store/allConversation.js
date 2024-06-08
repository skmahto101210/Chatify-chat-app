import { createSlice } from "@reduxjs/toolkit";

export const allConversationSlice = createSlice({
  name: "conversations",
  initialState: [],
  reducers: {
    setConversations: (state,conversations) => {
    //   console.log(state);
    //   console.log(conversations.payload);
      return (state = conversations.payload);
    },
  },
});

export const { setConversations } = allConversationSlice.actions;
export default allConversationSlice.reducer;
