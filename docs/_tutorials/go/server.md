---
title: "Server API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Go client library]({{'/go/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _src/example/server/test/test.go_ as needed.
   
    ```go
    // the path of the root certificate
    GATEWAY_CA_FILE = "../../../../cert/gateway/ca.crt"

    // the address of the device gateway
    GATEWAY_IP = "192.168.0.2"
    GATEWAY_PORT = 4000

    // the ip address of the target device
    DEV_IP = "192.168.0.110"
    DEV_PORT = 51211
    USE_SSL = false
    ```
5. Build.

    ```
    cd src/example/server/test
    go build .
    ```
6. Run.
   
    ```
    ./test
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```go
  gatewayClient := &client.GatewayClient{}
  gatewayClient.Connect(GATEWAY_CA_FILE, GATEWAY_IP, GATEWAY_PORT)

  connectSvc = connect.NewConnectSvc(gatewayClient.GetConn())
  deviceID, _ := connectSvc.Connect(DEV_IP, DEV_PORT, USE_SSL)
  ```   

## 2. Subscribe

To receive requests from devices, you have to configure the related options [as described]({{'/api/server/' | relative_url}}#RelatedOptions), first.

  ```go
  testConfig.UseServerMatching = true
  authSvc.SetConfig(deviceID, testConfig)
  ```

Then, you have to subscribe to the request channel.

  ```go
  reqStream, cancelFunc, _ := serverSvc.Subscribe(QUEUE_SIZE)
  ```

## 3. Handle verification requests

With server matching enabled, the device will send a verification request to the gateway when it reads a card. You can implement your own logic and return its result to the device using [HandleVerify]({{'/api/server/' | relative_url}}#handleverify).

  ```go
  req, _ := reqStream.Recv()

  if returnError { // emulate verification failure
    serverSvc.HandleVerify(req, server.ServerErrorCode_VERIFY_FAIL, nil)
  } else { // emulate verification success
    userInfo := &user.UserInfo{
      Hdr: &user.UserHdr{
        ID: TEST_USER_ID,
        NumOfCard: 1,
      },
      Cards: []*card.CSNCardData{
        &card.CSNCardData{
          Data: req.VerifyReq.CardData,
        },
      },
    }

    serverSvc.HandleVerify(req, server.ServerErrorCode_SUCCESS, userInfo)
  }
  ```

## 4. Handle identification requests

With server matching enabled, the device will send an identification request to the gateway when it reads a fingerprint. You can implement your own logic and return its result to the device using [HandleIdentify]({{'/api/server/' | relative_url}}#handleidentify).

  ```go
  req, _ := reqStream.Recv()

  if returnError { // emulate identification failure
    serverSvc.HandleVerify(req, server.ServerErrorCode_IDENTIFY_FAIL, nil)
  } else { // emulate identification success
    userInfo := &user.UserInfo{
      Hdr: &user.UserHdr{
        ID: TEST_USER_ID,
        NumOfFinger: 1,
      },
      Fingers: []*finger.FingerData{
        &finger.FingerData{
          Templates: [][]byte{
            req.IdentifyReq.TemplateData,
            req.IdentifyReq.TemplateData,
          },
        },
      },
    }

    serverSvc.HandleIdentify(req, server.ServerErrorCode_SUCCESS, userInfo)
  }
  ```

