import { createAsyncThunk } from "@reduxjs/toolkit";
import { mailBoxApiService } from "../services/mailBoxApi";

export const sendMailAction = createAsyncThunk(
  "sendMailAction",
  async (sendMailData) => {
    console.log("2, send mailData at reducer", sendMailData);
    const response = await mailBoxApiService.sendMail(sendMailData);
    return response;
  }
);

export const receiveMailAction = createAsyncThunk(
  "receiveMailAction",
  async (sendMailData) => {
    console.log("2, recieve mailData at reducer", sendMailData);
    const response = await mailBoxApiService.receiveMail(sendMailData);
    return response;
  }
);

export const getMailAction = createAsyncThunk(
  "getMailAction",
  async (senderEmail) => {
    const response = await mailBoxApiService.getMail(senderEmail);
    return response;
  }
);

export const deleteSentboxMailAction = createAsyncThunk(
  "deleteSentboxMailAction",
  async (deleteSentData) => {
    console.log("REDUCER Delete data", deleteSentData);
    const response = await mailBoxApiService.deleteSentboxMail(deleteSentData);
    return response;
  }
);

export const deleteInboxMailAction = createAsyncThunk(
  "deleteInboxMailAction",
  async (deleteInboxData) => {
    console.log("REDUCER Delete data", deleteInboxData);
    const response = await mailBoxApiService.deleteInboxMail(deleteInboxData);
    return response;
  }
);

export const updateInboxStatusAction = createAsyncThunk(
  "updateInboxStatusAction",
  async (inboxData) => {
    console.log("REDUCER Delete data", inboxData);
    const response = await mailBoxApiService.readUnreadInboxMessage(inboxData);
    return response;
  }
);