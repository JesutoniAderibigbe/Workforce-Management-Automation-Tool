function sendWorkforceInvitations() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const formSheet = ss.getSheetByName('Form Responses 1');
  const unitSheet = ss.getSheetByName('Unit Directory');
  const data = formSheet.getDataRange().getValues();
  const units = unitSheet.getDataRange().getValues();

  const templateId = '1B_w6Gdpue4BJGbi04J_kW-T42ZUPbwRVs0dHVub88Nw'; // Replace with actual Docs template ID
  const folderId = '1_cvJvGwT2_5fFmbfOqB2yayVp76pKOT8';         // Replace with destination folder ID
  const folder = DriveApp.getFolderById(folderId);

  const headers = data[0];
  const nameCol = headers.indexOf("Full Name");
  const emailCol = headers.indexOf("Email");
  const primaryUnitCol = headers.indexOf("Primary Unit");
  const secondaryUnitCol = headers.indexOf("Secondary Unit");
  let statusCol = headers.indexOf("Status");

  // Add "Status" column if missing
  if (statusCol === -1) {
    statusCol = headers.length;
    formSheet.getRange(1, statusCol + 1).setValue("Status");
    Logger.log("Added 'Status' column at index: " + statusCol);
  }

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const name = row[nameCol];
    const email = row[emailCol];
    const primaryUnit = row[primaryUnitCol];
    const secondaryUnit = row[secondaryUnitCol];
    const status = row[statusCol];

    Logger.log(`Processing Row ${i + 1} - Name: ${name}, Email: ${email}, Primary Unit: ${primaryUnit}, Secondary Unit: ${secondaryUnit}, Status: ${status}`);

    if (!name || !email || !primaryUnit) {
      Logger.log(`Skipping row ${i + 1} - Missing name, email, or primary unit`);
      continue;
    }

    if (status === "Sent ✅") {
      Logger.log(`Skipping row ${i + 1} - Already sent`);
      continue;
    }

    // Find Unit Head Info
    const primaryInfo = units.find(r => r[0] === primaryUnit);
    const secondaryInfo = secondaryUnit ? units.find(r => r[0] === secondaryUnit) : null;

    if (!primaryInfo) {
      Logger.log(`Primary unit not found: ${primaryUnit}`);
      formSheet.getRange(i + 1, statusCol + 1).setValue("❌ Primary Unit not found");
      continue;
    }

    const primaryHead = primaryInfo[1] || '';
    const primaryPhone = primaryInfo[2] || '';
    const secondaryHead = secondaryInfo ? (secondaryInfo[1] || '') : '';
    const secondaryPhone = secondaryInfo ? (secondaryInfo[2] || '') : '';

    Logger.log(`Primary Head: ${primaryHead}, Primary Phone: ${primaryPhone}`);
    Logger.log(`Secondary Head: ${secondaryHead}, Secondary Phone: ${secondaryPhone}`);

    try {
      const copy = DriveApp.getFileById(templateId).makeCopy(`Workforce Letter - ${name}`, folder);
      const doc = DocumentApp.openById(copy.getId());
      const body = doc.getBody();

      // Replace placeholders
      body.replaceText('<<Name>>', name);
      body.replaceText('<<PrimaryUnit>>', primaryUnit);
      body.replaceText('<<PrimaryHead>>', primaryHead);
      body.replaceText('<<PrimaryPhone>>', primaryPhone);
      body.replaceText('<<SecondaryUnit>>', secondaryUnit || '');
      body.replaceText('<<SecondaryHead>>', secondaryHead);
      body.replaceText('<<SecondaryPhone>>', secondaryPhone);

      doc.saveAndClose();

      const pdf = copy.getAs(MimeType.PDF);

      // Send email
      MailApp.sendEmail({
        to: email,
        subject: `📩 Your SCM UI Unit Assignment Letter`,
        body: `Dear ${name},

        Congratulations! 🎊 🎉  🥳

You have officially been added to the SCM UI workforce.

Please find your personalized letter of assignment attached.

If you have any questions, don’t hesitate to reach out to your unit heads. We’re excited to serve with you!

With love,  
Jesutoni Aderibigbe  
General Secretary, SCM UI`,
        attachments: [pdf]
      });

      formSheet.getRange(i + 1, statusCol + 1).setValue("Sent ✅");
      Logger.log(`✅ Email sent to ${name} at ${email}`);
    } catch (err) {
      Logger.log(`❌ Error for ${name}: ${err.message}`);
      formSheet.getRange(i + 1, statusCol + 1).setValue(`❌ Error: ${err.message}`);
    }
  }

  Logger.log("📤 All invitations processed.");
}
