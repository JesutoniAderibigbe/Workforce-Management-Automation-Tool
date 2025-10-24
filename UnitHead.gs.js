function sendUnitMemberListsWithPhone() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const responsesSheet = ss.getSheetByName('Form Responses 1');
  const directorySheet = ss.getSheetByName('Unit Directory');

  const responsesData = responsesSheet.getDataRange().getValues();
  const directoryData = directorySheet.getDataRange().getValues();

  const headers = responsesData[0];
  const nameCol = headers.indexOf('Full Name');
  const emailCol = headers.indexOf('Email');
  const phoneCol = headers.indexOf('Active Phone Number'); // Make sure this matches your exact column header
  const unitCol = headers.indexOf('Primary Unit');

  // Step 1: Group members by unit
  const unitMap = {};

  for (let i = 3; i < responsesData.length; i++) {
    const name = responsesData[i][nameCol];
    const email = responsesData[i][emailCol];
    const phone = responsesData[i][phoneCol];
    const unit = responsesData[i][unitCol];

    if (!unitMap[unit]) {
      unitMap[unit] = [];
    }

    unitMap[unit].push(`${name} – ${email} – ${phone}`);
  }

  // Step 2: Send emails to unit heads
  for (let i = 1; i < directoryData.length; i++) {
   const row = directoryData[i];
  const unitName = row[0];
  const headName = row[1];
  const headEmail = row[3];

    const memberList = unitMap[unitName];
    if (!memberList || memberList.length === 0) continue;

    const body = `
Dear ${headName},

Greetings in Christ’s name!

Here is the current list of members assigned to your unit (**${unitName}**):

${memberList.map((line, index) => `${index + 1}. ${line}`).join('\n')}

Please reach out to them and help them settle in. We trust that your leadership will guide them in the path of service and growth.

With love,  
SCM UI Leadership
`;

    MailApp.sendEmail({
      to: headEmail,
      subject: `📋 Your Unit Member List – ${unitName}`,
      body: body
    });
  }

  Logger.log("Emails sent to all unit heads with phone numbers.");
}
