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
        id:sendMailData.id,
        receiverEmail: sendMailData.receiverEmail,
        subject: sendMailData.subject,
        mailContent: sendMailData.mailContent,
        senderEmail: sendMailData.senderEmail,
      }
    ); 
  };

  receiveMail = async (receiveMailData) => {
    console.log("3 receiver at api",receiveMailData);
    const newReceiverEmail = receiveMailData.receiverEmail
      .replaceAll(/[.]/g, "")
      .split("@")[0];

    await axios.post(
      `https://mail-box-1311-default-rtdb.firebaseio.com/${newReceiverEmail}/inbox.json`,
      {
        id:receiveMailData.id,
        receiverEmail: receiveMailData.receiverEmail,
        subject: receiveMailData.subject,
        mailContent: receiveMailData.mailContent,
        senderEmail: receiveMailData.senderEmail,
      }
    );
  };

  getMail = async (senderEmail) => {
     const newSenderEmail = senderEmail.replaceAll(/[.]/g, "")
     .split("@")[0];
   const response =  await axios.get(
     `https://mail-box-1311-default-rtdb.firebaseio.com/${newSenderEmail}.json`,
    );
    console.log("4 get data",response);
    return response.data;
  }
}

export const mailBoxApiService = MailBoxApiService.getInstance();
