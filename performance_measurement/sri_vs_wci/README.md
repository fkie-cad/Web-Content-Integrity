# SRI Testing

To perform the SRI testing do:

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

7. Build the firefox extension like described in the [firefox extension readme](../../wci_firefox_extensions/firefox-extension/README.md)

8. Start the nginx server

```sh
sudo systemctl start nginx
```

9. It is recommended to use a firefox development browser for the performance testing. It is available [here](https://www.mozilla.org/en-US/firefox/developer/).
Change the firefox binary location in the `measure-performance-sri_wci.py` and `measure-performance-sri_sri.py` file on line 20 and 18. e.g:

```py
option.binary_location = "../firefox-development/firefox"
```

10. Install the python dependencies

```sh
pip install -r requirements.txt
```

11. Change the directory to the `sri_vs_wci` folder

```sh
cd sri_vs_wci
```

12. Run the `measure-performance-sri_wci.py` file to collect new measurements (this will take several minutes if executed in the default configuration)

```sh
python measure-performance-sri_wci.py
```

13. Edit the nginx server config to point to the `sri_testing/public` folder

```sh
# in /etc/nginx/sites-enabled/default
root /PATH/TO/Web_Content_Integrity_Tamper-proof_websites_beyond_HTTPS_Resources/performance_measurement/sri_vs_wci/sri_testing/public;
```

14. Reload the nginx server

```sh
sudo systemctl reload nginx
```

15. Run the `measure-performance-sri_sri.py` file to collect new measurements (this will take several minutes if executed in the default configuration)

```sh
python measure-performance-sri_sri.py
```

16. Move the resulting files to the `result-files-sri-vs-wci` folder

```sh
mv *.bin result-files-sri-vs-wci
```

17. Run the `analyze-sri-vs-wci.py` file to create the plots

```sh
python analyze-sri-vs-wci.py
```

18. The plot will be saved as `sri-vs-wci.pdf`
