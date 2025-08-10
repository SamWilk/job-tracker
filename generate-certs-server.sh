#!/bin/bash

DOMAIN="server"
CERT_DIR="./certs"
KEY_FILE="${CERT_DIR}/${DOMAIN}.key"
CRT_FILE="${CERT_DIR}/${DOMAIN}.cert"
CSR_FILE="${CERT_DIR}/${DOMAIN}.csr"
EXT_FILE="${CERT_DIR}/${DOMAIN}.ext"
DAYS_VALID=365

# Create cert directory if it doesn't exist
if [ ! -d "$CERT_DIR" ]; then
  echo "Creating directory $CERT_DIR"
  mkdir -p "$CERT_DIR"
fi

# Check if cert and key already exist
if [ -f "$KEY_FILE" ] && [ -f "$CRT_FILE" ]; then
  echo "Certificate and key already exist in $CERT_DIR:"
  echo " - $KEY_FILE"
  echo " - $CRT_FILE"
  echo "Skipping generation."
  exit 0
fi

echo "Generating private key..."
openssl genrsa -out "$KEY_FILE" 2048

echo "Creating certificate signing request (CSR)..."
openssl req -new -key "$KEY_FILE" -out "$CSR_FILE" -subj "/CN=${DOMAIN}"

echo "Creating OpenSSL config file for SAN..."
cat > "$EXT_FILE" <<EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = ${DOMAIN}
IP.1 = 127.0.0.1
IP.2 = ::1
EOF

echo "Generating self-signed certificate..."
openssl x509 -req -in "$CSR_FILE" -signkey "$KEY_FILE" -out "$CRT_FILE" -days $DAYS_VALID -extfile "$EXT_FILE"

echo "Done!"
echo "Certificate and key saved to $CERT_DIR"
