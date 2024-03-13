document.getElementById("urlForm").addEventListener("submit", function (event) {
  event.preventDefault();
  var url = document.getElementById("url").value;
  generateQRCode(url);
});

function generateQRCode(url) {
  fetch("/generate_qrcode?url=" + encodeURIComponent(url))
    .then((response) => response.blob())
    .then((blob) => {
      var qrcodeUrl = URL.createObjectURL(blob);
      document.getElementById("qrcodeImg").src = qrcodeUrl;
      document.getElementById("qrcodeContainer").classList.remove("hidden");
      showShareButtons(qrcodeUrl);
    });
}

function showShareButtons(qrcodeUrl) {
  document.getElementById("whatsappBtn").addEventListener("click", function () {
    var whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(qrcodeUrl);
    window.open(whatsappUrl, "_blank");
  });

  document.getElementById("emailBtn").addEventListener("click", function () {
    var subject = "QR Code Image";
    var body = "Download the QR code image: " + qrcodeUrl;
    var mailtoUrl =
      "mailto:?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
    window.location.href = mailtoUrl;
  });

  document.getElementById("facebookBtn").addEventListener("click", function () {
    var facebookUrl =
      "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(qrcodeUrl);
    window.open(facebookUrl, "_blank");
  });
}
