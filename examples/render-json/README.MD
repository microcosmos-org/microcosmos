Install
```shell
npm install --save
```
Generate local certificate for HTTP/2
```shell
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout localhost-privkey.pem -out localhost-cert.pem
```
Run App
```shell
node index
```
