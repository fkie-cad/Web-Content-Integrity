# Performance Testing

To run the performance testing do:

1. Install nginx

```sh
sudo apt install nginx
```

2. Edit the `nginx-server.conf` file to point to the correct location of the site you want to test. e.g:

```sh
root /PATH/TO/Web_Content_Integrity_Tamper-proof_websites_beyond_HTTPS_Resources/wci_ssgt_plugins/gatsby_plugin_example/public;
```

3. Copy the nginx server config to the default location

```sh
sudo cp nginx-server.conf /etc/nginx/sites-enabled/default
```

4. Build the site you would like to test. e.g:

```sh
# inside the gatsby_plugin_example folder
npm install
gatsby build
```

5. Copy the `dns_string` to the clipboard

```sh
# inside the gatsby_plugin_example folder
cat wci/dns_string | clipcopy
```

6. Paste the `dns_string` into the firefox extension. e.g:

```js
// inside the firefox extension folder
// replace the DNS_RECORD variable with the dns_string in background.js
const DNS_RECORD = "wci1 sha256:6z5vdSBzWp+lXPM6ygi1XGARK6EEb4l8hpDyLfPlYp4=";
```

7. Build the firefox extension as described in the [firefox extension readme](../wci_firefox_extensions/firefox-extension/README.md)

8. Start the nginx server

```sh
sudo systemctl start nginx
```

9. It is recommended to use a firefox development browser for the performance testing. It is available [here](https://www.mozilla.org/en-US/firefox/developer/).
Change the firefox binary location in the `measure-performance.py` file on line 21. e.g:

```py
option.binary_location = "../firefox-development/firefox"
```

10. Install the python dependencies

```sh
pip install -r requirements.txt
```

11. Run the `measure-performance.py` file to collect new measurements (this will take several hours if executed in the default configuration)

```sh
python measure-performance.py
```

12. Move the resulting files to the `result-files` folder

```sh
mv *.bin result-files
```

13. Run the `analyze-performance.py` file to create the plots

```sh
python analyze-performance.py
```

14. The plots will be saved in the `results` folder
