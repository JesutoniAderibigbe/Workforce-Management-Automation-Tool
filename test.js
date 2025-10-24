function testExcoSelectionLetter() {
  // Put your own test email here
  var testEmail = "aderibigbejesutoni860@gmail.com";  
  
  var name = "Test Student";  
  var subject = "Test: Congratulations - You Have Been Selected to Serve";
  
  var body = "Dear " + name + ",\n\n" +
    "Greetings in the Name of our Lord Jesus Christ.\n\n" +
    "We are pleased to inform you that you have been selected to serve in the Lord’s House as part of the New Breed Excos.\n\n" +
    "Kindly check the attached letter for more details, and please make sure to join the WhatsApp group using this link: https://chat.whatsapp.com/BltllwWNcVG1MTciPfXa86?mode=ems_copy_t.\n\n" +
    "We trust that the Lord who has called you will strengthen you for this task.\n\n" +
    "Yours in Christ,\n" +
    "Jesutoni Aderibigbe,\n" +
    "General Secretary, SCM UI";
  
  // Send to your test email
  MailApp.sendEmail({
    to: testEmail,
    subject: subject,
    body: body
  });
}
