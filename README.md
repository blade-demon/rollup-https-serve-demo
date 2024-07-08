# 生成自签名证书

openssl genpkey -algorithm RSA -out server.key -pkeyopt rsa_keygen_bits:2048
openssl req -new -key server.key -out server.csr
openssl x509 -req -in server.csr -signkey server.key -out server.crt -days 365

# 简要说明

使用rollup serve启动一个https服务器，并且可以通过<https://localhost:10001/来访问>
