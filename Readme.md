# McAfee DXL Cisco Threat Grid Integration

This Node accepts and URL and submits it to Cisco Threat Grid

## Running A Dev Broker
```
sudo docker run -p 8883:8883 -p 8443:8443 --restart unless-stopped --name broker -d -it opendxl/opendxl-broker
```

## Running Node Red Native
```
node-red
```

## Testing Code
``` 
cd into node red path usually ~/.node-red
npm install /path to project directory/threatgrid-urlsubmit 
```


