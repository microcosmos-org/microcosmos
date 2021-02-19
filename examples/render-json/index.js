import { readFileSync } from 'fs';
import { MicroServer } from 'microcosmos.js';
/* Localhost certs */
const cert = readFileSync('localhost-cert.pem');
const key = readFileSync('localhost-privkey.pem');

new MicroServer({ cert, key, port: 3000 }).listen();
