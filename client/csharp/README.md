# C# 

## Quick start example

### Prerequisites

1. Install C# and grpc-dotnet
   
     * https://grpc.io/docs/quickstart/csharp-dotnet/


2. Copy the root CA (ca.crt) from the device gateway
3. Change the server and the device information in example/quick/Program.cs as needed

    ```C#
    private const string CA_FILE = "../../../cert/ca.crt";

    private const string SERVER_ADDR = "192.168.0.2";
    private const int SERVER_PORT = 4000;

    private const string DEVICE_ADDR = "192.168.0.110";
    private const int DEVICE_PORT = 51211;
    ```



### Build & run

* Change example/quick/quick.csproj as needed

```
cd example/quick
dotnet run
```

## Connect service example

### Prerequisites

1. Same as the Quick start example
2. Change the server information in example/connect/test/Program.cs as needed

    ```C#
    private const string CA_FILE = "../../../../cert/ca.crt";

    private const string SERVER_ADDR = "192.168.0.2";
    private const int SERVER_PORT = 4000;
    ```

### Build & run

* Change example/connect/test/test.csproj as needed

```
cd example/connect/test
dotnet run
```
