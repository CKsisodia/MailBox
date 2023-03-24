import axios from "axios";

class MailBoxApiService {
  static getInstance() {
    return new MailBoxApiService();
  }

  sendMail = async (sendMailData) => {
    const newSenderEmail = sendMailData.senderEmail
      .replaceAll(/[.]/g, "")
      .split("@")[0];

    await axios.post(
      `https://mail-box-1311-default-rtdb.firebaseio.com/${newSenderEmail}/sentbox.json`,
      {
        id: sendMailData.id,
        DateAndTime: sendMailData.DateAndTime,
        receiverEmail: sendMailData.receiverEmail,
        subject: sendMailData.subject,
        mailContent: sendMailData.mailContent,
        senderEmail: sendMailData.senderEmail,
      }
    );
  };

  receiveMail = async (receiveMailData) => {
    console.log("3 receiver at api", receiveMailData);
    const newReceiverEmail = receiveMailData.receiverEmail
      .replaceAll(/[.]/g, "")
      .split("@")[0];

    await axios.post(
      `https://mail-box-1311-default-rtdb.firebaseio.com/${newReceiverEmail}/inbox.json`,
      {
        id: receiveMailData.id,
        DateAndTime: receiveMailData.DateAndTime,
        receiverEmail: receiveMailData.receiverEmail,
        subject: receiveMailData.subject,
        mailContent: receiveMailData.mailContent,
        senderEmail: receiveMailData.senderEmail,
        isInboxMessageRead:false,
      }
    );
  };

  getMail = async (senderEmail) => {
    const newSenderEmail = senderEmail.replaceAll(/[.]/g, "").split("@")[0];
    const response = await axios.get(
      `https://mail-box-1311-default-rtdb.firebaseio.com/${newSenderEmail}.json`
    );
    console.log("4 get data", response);
    return response.data;
  };

  deleteSentboxMail = async (deleteSentData) => {
    console.log("API Delete data", deleteSentData);
    const newSenderEmail = deleteSentData.senderEmail
      .replaceAll(/[.]/g, "")
      .split("@")[0];
    await axios.delete(
      `https://mail-box-1311-default-rtdb.firebaseio.com/${newSenderEmail}/sentbox/${deleteSentData.key}.json`
    );
  };

  deleteInboxMail = async (deleteInboxData) => {
    console.log("API Delete data", deleteInboxData);
    const newSenderEmail = deleteInboxData.senderEmail
      .replaceAll(/[.]/g, "")
      .split("@")[0];
    await axios.delete(
      `https://mail-box-1311-default-rtdb.firebaseio.com/${newSenderEmail}/inbox/${deleteInboxData.key}.json`
    );
  };

  readUnreadInboxMessage = async (UpdateInboxStatus) => {

    const newSenderEmail = UpdateInboxStatus.senderEmail
      .replaceAll(/[.]/g, "")
      .split("@")[0];

    await axios.patch(
      `https://mail-box-1311-default-rtdb.firebaseio.com/${newSenderEmail}/inbox/${UpdateInboxStatus.key}.json`,
      {
        isInboxMessageRead:true
      }
    );
  };
}

export const mailBoxApiService = MailBoxApiService.getInstance();
