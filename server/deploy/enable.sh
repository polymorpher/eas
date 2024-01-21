#!/bin/sh
sudo setcap CAP_NET_BIND_SERVICE=+eip /usr/bin/node
sudo cp eas.service /etc/systemd/system/eas.service
sudo systemctl start eas
sudo systemctl enable eas
systemctl status eas
