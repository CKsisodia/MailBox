import { createAsyncThunk } from "@reduxjs/toolkit";
import { mailBoxApiService } from "../services/mailBoxApi";



export const sendMailAction = createAsyncThunk(
    "sendMailAction",
    async (sendMailData) => {
        console.log("2, send mailData at reducer",sendMailData);
        const response = await mailBoxApiService.sendMail(sendMailData);
        return response;
    }
);

export const receiveMailAction = createAsyncThunk(
    "receiveMailAction",
    async (sendMailData) => {
        console.log("2, recieve mailData at reducer",sendMailData);
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