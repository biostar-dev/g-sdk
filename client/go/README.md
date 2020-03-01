# Go 

## Quick start example

### Prerequisites

1. Install go
2. Install go packages
   ```
   go get -u golang.org/x/image/bmp
   ```
3. Add source directory (_device-sdk-client/go_) to GOPATH
   ```
   export GOPATH=/home/sjlee/go:/home/sjlee/Work/device-sdk-server:/home/sjlee/Work/device-sdk-client/go  (linux bash)
   set GOPATH=C:\Users\sjlee\go;D:\Work\sdk\device;D:\Work\sdk\device\client\go (Windows)
   ```
4. Copy the root CA (ca.crt) from the device gateway
5. Change the server and the device information in src/example/quick/quickStart.go as needed
   
    ```go
    const (
      CA_FILE = "../../../../cert/ca.crt"
      SERVER_IP = "192.168.0.2"
      SERVER_PORT = 4000
      
      A2_IP = "192.168.0.110"
      A2_PORT = 51211
    )
    ```

### Build

```
cd src/example/quick
go build .
```

### Run

* Run the device gateway first

```
./quick
```

## Connect service example

### Prerequisites

1. Same as the Quick start example
2. Change the server information in src/example/connect/test/test.go as needed
   
    ```go
    const (
      CA_FILE = "../../../../../cert/ca.crt"
      SERVER_IP = "192.168.0.2"
      SERVER_PORT = 4000
    )
    ```

### Build

```
cd src/example/connect/test
go build .
```

### Run

* Run the device gateway first

```
./test
```


## Folder

### Examples

* src/example

### Device Gateway classes (generated automatically by gRPC)

* src/biostar/service



