import { configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from "./themeSlice";
import refreshSideBarReducer from "./refreshSideBar";
import allConversationReducer from "./allConversation";

export const store = configureStore({
  reducer: {
    themeKey: themeSliceReducer,
    refreshKey: refreshSideBarReducer,
    allConversationKey: allConversationReducer,
  },
});
