1. 生成私钥
首先，生成一个私钥文件。这里假设生成一个 2048 位的 RSA 私钥：
openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048

2. 生成证书签名请求 (CSR)
使用刚才生成的私钥来生成一个证书签名请求：
openssl req -new -key private.key -out certificate.csr
在这个步骤中，OpenSSL 会提示输入一些信息，例如国家、州/省、市、组织名称、通用名称 (通常是域名) 和电子邮件地址。你也可以使用配置文件来自动填充这些信息。

3. 生成自签名证书
使用生成的 CSR 和私钥生成一个自签名证书。假设证书有效期为 365 天：
openssl x509 -req -in certificate.csr -signkey private.key -out certificate.crt -days 365

4. 组合步骤
你可以将上述步骤组合在一起，使用一个命令来生成私钥和自签名证书：
openssl req -x509 -newkey rsa:2048 -keyout private.key -out certificate.crt -days 365
在执行这个命令时，OpenSSL 会生成一个新的私钥，并立即使用它生成一个自签名证书，同时提示输入所需的信息。

5. 验证生成的证书
你可以使用以下命令来查看生成的自签名证书的内容：
openssl x509 -in certificate.crt -text -noout
示例：自动化生成证书信息
你可以创建一个配置文件 openssl.cnf，自动填充证书信息：

ini
Copy code
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_ca # The extensions to add to the self signed cert
prompt = no

[req_distinguished_name]
C = US
ST = California
L = San Francisco
O = My Company
OU = My Division
CN = <www.example.com>

[v3_ca]
subjectAltName = @alt_names

[alt_names]
DNS.1 = <www.example.com>
DNS.2 = example.com
使用配置文件生成自签名证书：

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout private.key -out certificate.crt -config openssl.cnf
这样，OpenSSL 会自动使用配置文件中的信息来生成自签名证书。
