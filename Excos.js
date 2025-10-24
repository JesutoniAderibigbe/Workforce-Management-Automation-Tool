function sendExcoSelectionLetters() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const formSheet = ss.getSheetByName('Form Responses 1');
  const data = formSheet.getDataRange().getValues();

  const templateId = '1Qc2ND_ZeD9VHheuakia-A9bjGVm7pBDGrn4XvX0BuHA'; // Replace with Excos Docs template ID
  const folderId = '1hYcmOOatnO5gnu4-GvvYjCYHP9dZupT9';           // Replace with destination folder ID
  const folder = DriveApp.getFolderById(folderId);

  const headers = data[0];
  const nameCol = headers.indexOf("Full Name");
  const emailCol = headers.indexOf("Email");
  const statusCol = headers.indexOf("NewBreed Excos Interview Consideration"); // e.g. "Selected" or "Not Selected"

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const name = row[nameCol];
    const email = row[emailCol];
    const status = row[statusCol];

    if (!status || status.trim() === "") {
      continue;
    }

    try {
      // Create personalized letter
      const copy = DriveApp.getFileById(templateId).makeCopy(`Exco Selection Letter - ${name}`, folder);
      const doc = DocumentApp.openById(copy.getId());
      const body = doc.getBody();

      body.replaceText('<<Name>>', name);

      doc.saveAndClose();

      const pdf = copy.getAs(MimeType.PDF);

      // Build the email body
      const subject = "📩 Congratulations: You Have Been Selected to Serve as New Breed Exco";
      const message = `Dear ${name},

Greetings in the Name of our Lord Jesus Christ. ✝️

We are pleased to inform you that you have been selected to serve in the House of David as part of the *New Breed Excos, SCM UI*.

📄 Please find your personalized letter of selection attached.

📌 Next Step: Kindly join the official WhatsApp group here: https://chat.whatsapp.com/BltllwWNcVG1MTciPfXa86?mode=ems_copy_t

We trust that the Lord who has called you will strengthen you for this task. Your presence and contribution make a real difference.

Further information would be communicated soon enough! It is important to join this group within the next 24 hours. Failure to do so, attracts a penalty!

Yours in Christ,  
Jesutoni Aderibigbe  
General Secretary, SCM UI`;

      // Send mail
      MailApp.sendEmail({
        to: email,
        subject: subject,
        body: message,
        attachments: [pdf]
      });

      formSheet.getRange(i + 1, statusCol + 1).setValue("ReSent ✅");
      Logger.log(`✅ Exco Letter sent to ${name} (${email})`);

    } catch (err) {
      formSheet.getRange(i + 1, statusCol + 1).setValue(`❌ Error: ${err.message}`);
      Logger.log(`❌ Error for ${name}: ${err.message}`);
    }
  }

  Logger.log("📤 All Exco letters processed.");
}
