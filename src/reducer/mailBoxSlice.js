import { createSlice } from "@reduxjs/toolkit";
import { getMailAction } from "./asyncMailBox";

const mailBoxSlice = createSlice({
  name: "mailBox",
  initialState: {
    inBox: [],
    sentBox: [],
    sendData: undefined,
    receiveData: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMailAction.fulfilled, (state, action) => {
      const mailData = action.payload;
      console.log("at slice", mailData);

      const inboxArr = [];

      for (const key in mailData.inbox) {
        inboxArr.push({
          id:mailData.inbox[key].id,
          mailContent: mailData.inbox[key].mailContent,
          receiverEmail: mailData.inbox[key].receiverEmail,
          senderEmail: mailData.inbox[key].senderEmail,
          subject: mailData.inbox[key].subject,
        });
      }
      console.log("inbox array in slice", inboxArr);
      state.inBox = inboxArr;

      const sentBoxArr = [];
      for (const key in mailData.sentbox) {
        sentBoxArr.push({
          id:mailData.sentbox[key].id,
          mailContent: mailData.sentbox[key].mailContent,
          receiverEmail: mailData.sentbox[key].receiverEmail,
          senderEmail: mailData.sentbox[key].senderEmail,
          subject: mailData.sentbox[key].subject,
        });
      }
      console.log("sentbox array in slice", sentBoxArr);
      state.sentBox = sentBoxArr;
    });
  },
});

export default mailBoxSlice;
export const mailBoxAction = mailBoxSlice.actions;
