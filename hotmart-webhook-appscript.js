/**
 * ============================================================================
 * WEBHOOK HOTMART -> GOOGLE APPS SCRIPT -> FIREBASE FIRESTORE
 * ============================================================================
 * Função: Receber notificações de compra aprovada da Hotmart e liberar
 * 30 dias de acesso no Firestore para o e-mail do comprador.
 *
 * CONFIGURAÇÃO NO GOOGLE APPS SCRIPT:
 * 1. Acesse: https://script.google.com e crie um "Novo projeto".
 * 2. Cole este código no editor (substituindo o arquivo Código.gs).
 * 3. Clique em "Implantar" (Deploy) -> "Nova implantação" (New deployment).
 * 4. Tipo: "Aplicativo da Web" (Web app).
 * 5. Executar como: "Eu" (Seu e-mail).
 * 6. Quem pode acessar: "Qualquer pessoa" (Anyone) - IMPORTANTE para a Hotmart conseguir enviar.
 * 7. Copie a "URL do app da Web" gerada.
 *
 * CONFIGURAÇÃO NA HOTMART:
 * 1. Na plataforma da Hotmart, vá em Ferramentas -> Webhook (Notificações).
 * 2. Crie uma nova configuração com a URL do seu Web App.
 * 3. Marque o evento: "Compra Aprovada" (PURCHASE_APPROVED) ou "Assinatura Ativada".
 * 4. Salve e faça um envio de teste.
 * ============================================================================
 */

// Chave secreta de autenticação entre o Apps Script e o Firestore Rules
const FIREBASE_PROJECT_ID = "mapa-alimentar";
const FIREBASE_SECRET_KEY = "MAPA_ALIMENTAR_SECURE_2026";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ 
        status: "error", 
        message: "No payload received" 
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const payload = JSON.parse(e.postData.contents);
    Logger.log("Payload Hotmart recebido: " + JSON.stringify(payload));

    // A Hotmart pode enviar na raiz ou dentro de data
    const event = payload.event || (payload.data && payload.data.event);
    const buyerEmail = extractEmail(payload);

    if (!buyerEmail) {
      Logger.log("Nenhum e-mail de comprador encontrado no payload.");
      return ContentService.createTextOutput(JSON.stringify({ 
        status: "ignored", 
        message: "Email not found" 
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Calcula a data de expiração: Hoje + 30 dias
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
    const validUntilIso = expiresAt.toISOString();

    Logger.log("Liberando 30 dias para: " + buyerEmail + " até " + validUntilIso);

    // Grava diretamente no Firestore na coleção 'subscriptions'
    const firestoreResult = grantSubscriptionInFirestore(buyerEmail, validUntilIso);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      email: buyerEmail,
      validUntil: validUntilIso,
      firestoreResponse: firestoreResult
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Erro ao processar Webhook: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Suporte para teste manual pelo navegador
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Mapa Alimentar Hotmart Webhook Receiver",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Extrai o e-mail do comprador compatível com todas as versões de Webhook da Hotmart (1.0 e 2.0)
 */
function extractEmail(payload) {
  if (payload.data && payload.data.buyer && payload.data.buyer.email) {
    return payload.data.buyer.email.toLowerCase().trim();
  }
  if (payload.buyer && payload.buyer.email) {
    return payload.buyer.email.toLowerCase().trim();
  }
  if (payload.email) {
    return payload.email.toLowerCase().trim();
  }
  return null;
}

/**
 * Grava a assinatura no Firestore via REST API com a chave de segurança configurada nas regras
 */
function grantSubscriptionInFirestore(email, validUntilIso) {
  const documentPath = encodeURIComponent(email);
  const url = "https://firestore.googleapis.com/v1/projects/" + FIREBASE_PROJECT_ID + "/databases/(default)/documents/subscriptions/" + documentPath;

  const firestoreBody = {
    fields: {
      email: { stringValue: email },
      status: { stringValue: "active" },
      validUntil: { stringValue: validUntilIso },
      updatedAt: { stringValue: new Date().toISOString() },
      secretKey: { stringValue: FIREBASE_SECRET_KEY }
    }
  };

  const options = {
    method: "patch",
    contentType: "application/json",
    payload: JSON.stringify(firestoreBody),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseCode = response.getResponseCode();
  const responseText = response.getContentText();

  Logger.log("Resposta Firestore [" + responseCode + "]: " + responseText);
  return { code: responseCode, response: responseText };
}
