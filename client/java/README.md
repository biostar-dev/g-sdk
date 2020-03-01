# Java 

## Quick start example

### Prerequisites

1. Install Java and gradle. 
   
     * https://docs.gradle.org/current/userguide/building_java_projects.html
     * https://grpc.io/docs/quickstart/java/


2. Copy the root CA (ca.crt) from the device gateway
3. Change the server and the device information in src/main/java/com/supremainc/sdk/example/quick/QuickStart.java as needed
   
    ```java
    private static final String CA_FILE = "ca.crt";

    private static final String SERVER_ADDR = "192.168.0.2";
    private static final int SERVER_PORT = 4000;

    private static final String DEVICE_ADDR = "192.168.0.110";
    private static final int DEVICE_PORT = 51211;
    ```

### Build

* Change build.gradle as needed

```
./gradlew installDist
```

* To clean before buidling

```
./gradlew clean
```

### Run

* Run the device gateway first

```
./build/install/java/bin/quickStart
```

## Connect service example

### Prerequisites

1. Same as the Quick start example
2. Change the server information in src/main/java/com/supremainc/sdk/example/connect/test/ConnectTest.java as needed
   
    ```java
    private static final String CA_FILE = "ca.crt";

    private static final String SERVER_ADDR = "192.168.0.2";
    private static final int SERVER_PORT = 4000;
    ```

### Build

Same as the Quick start example

### Run

```
./build/install/java/bin/connectTest
```

## Folder

### Examples

* src/main/java/com/supremainc/sdk/example

### Device Gateway classes (generated automatically by gRPC)

* build/generated/source/proto/main/java/com/supremainc/sdk



