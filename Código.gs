function reenviarCorreos() {
  var query = 'from:noresponderlv@sanpablo.com.co is:unread';
  var threads = GmailApp.search(query);

  var contenidoAcumulado = ''; // Acumula el contenido de los mensajes

  threads.forEach(function(thread) {
    var messages = thread.getMessages();
    messages.forEach(function(message) {
      var bodyHTML = message.getBody(); // Obtiene el cuerpo del mensaje en formato HTML
      var bodyPlain = convertirHtmlATexto(bodyHTML); // Convierte el HTML a texto plano
      contenidoAcumulado += bodyPlain + '\n\n';
      message.markRead(); // Marca el mensaje como leído
    });
  });

  if (contenidoAcumulado !== '') {
    console.log('Reenviando correos...');
    enviarContenido(contenidoAcumulado); // Reenvía el contenido acumulado
  }
}

function enviarContenido(contenido) {
  var destinatario = 'pedidos@sanpablo.com.co';
  var asunto = 'pedidos';

  var contenidoJustificado = '<div style="text-align: left;">' + contenido + '</div>';

  var opciones = {
    htmlBody: contenidoJustificado
  };

  GmailApp.sendEmail(destinatario, asunto, '', opciones);

  console.log('El correo ha sido reenviado a ' + destinatario);
}

function convertirHtmlATexto(html) {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

