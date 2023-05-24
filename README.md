# Web Content Integrity: Tamper-proof websites beyond HTTPS

We propose Web Content Integrity, a framework that allows a service provider to guarantee the integrity of their static website, even in the face of a compromised web server.
Such integrity assurances can then be used to implement a secure end-to-end encryption application built in the form of a website.
Our framework encompasses developers, the Domain Name System, and web browsers.
To accomplish the integrity guarantees, our framework makes use of an index of queryable URLs and allowed redirects for the website, and publishes the cryptographic hash value of the index in the DNS.
Web browsers can then use the information from the DNS to verify that the resources they retrieve from the web server have not been tampered with.
The required data structures can be generated automatically, and the framework introduces an initial delay of about 4 ms and a recurring delay for each request of about 2 ms for a sample website.

## Getting started

Just follow the instructions in the specific sub folders.

## Structure

- [WCI SSG Plugins](wci_ssg_plugins): This folder contains the Static Site Generator plugins developed in our paper.
- [WCI Firefox Extension](wci_firefox_extensions): This folder contains the Firefox extension developed in our paper.
- [Performance Measurement](performance_measurement): This folder contains several scripts to measure the performance of our framework.
