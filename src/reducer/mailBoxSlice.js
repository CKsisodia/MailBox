import { createSlice } from "@reduxjs/toolkit";
import { getMailAction } from "./asyncMailBox";

const mailBoxSlice = createSlice({
  name: "mailBox",
  initialState: {
    inBox: [],
    sentBox: [],
    messageBox:false,
    mailContent:undefined,
  },
  reducers: {
    messageBoxOpen(state,action){
      state.messageBox = true;
      state.mailContent = action.payload;
    },
    messageBoxClose(state,action){
      state.messageBox = false;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(getMailAction.fulfilled, (state, action) => {
      const getMailData = action.payload;
      console.log("at slice", getMailData);

      const inboxArr = [];

      for (const key in getMailData.inbox) {
        inboxArr.push({
          id:getMailData.inbox[key].id,
          key:key,
          DateAndTime:getMailData.inbox[key].DateAndTime,
          mailContent: getMailData.inbox[key].mailContent,
          receiverEmail: getMailData.inbox[key].receiverEmail,
          senderEmail: getMailData.inbox[key].senderEmail,
          subject: getMailData.inbox[key].subject,
          isInboxMessageRead: getMailData.inbox[key].isInboxMessageRead,

        });
      }
      console.log("inbox array in slice", inboxArr);
      state.inBox = inboxArr;

      const sentBoxArr = [];
      for (const key in getMailData.sentbox) {
        sentBoxArr.push({
          id:getMailData.sentbox[key].id,
          key:key,
          DateAndTime:getMailData.sentbox[key].DateAndTime,
          mailContent: getMailData.sentbox[key].mailContent,
          receiverEmail: getMailData.sentbox[key].receiverEmail,
          senderEmail: getMailData.sentbox[key].senderEmail,
          subject: getMailData.sentbox[key].subject,
        });
      }
      console.log("sentbox array in slice", sentBoxArr);
      state.sentBox = sentBoxArr;
    });
  },
});

export default mailBoxSlice;
export const mailBoxAction = mailBoxSlice.actions;
