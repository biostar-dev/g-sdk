package com.supremainc.sdk.example.quick;

import java.util.List;

import com.supremainc.sdk.card.CardGrpc;
import com.supremainc.sdk.connect.ConnectGrpc;
import com.supremainc.sdk.connect.DeviceInfo;
import com.supremainc.sdk.connect.ConnectInfo;
import com.supremainc.sdk.device.CapabilityInfo;
import com.supremainc.sdk.device.DeviceGrpc;
import com.supremainc.sdk.device.FactoryInfo;
import com.supremainc.sdk.event.EventGrpc;
import com.supremainc.sdk.example.card.CardSvc;
import com.supremainc.sdk.example.client.GrpcClient;
import com.supremainc.sdk.example.connect.ConnectSvc;
import com.supremainc.sdk.example.device.DeviceSvc;
import com.supremainc.sdk.example.event.EventSvc;
import com.supremainc.sdk.example.finger.FingerSvc;
import com.supremainc.sdk.example.user.UserSvc;
import com.supremainc.sdk.finger.FingerGrpc;
import com.supremainc.sdk.user.UserGrpc;

public class QuickStart {
  private static final String CA_FILE = "ca.crt";

  private static final String SERVER_ADDR = "192.168.0.2";
  private static final int SERVER_PORT = 4000;

  private static final String DEVICE_ADDR = "192.168.0.110";
  private static final int DEVICE_PORT = 51211;
  private static final boolean DEVICE_USE_SSL = false;

  private GrpcClient grpcClient;
  private ConnectSvc connectSvc;
  private DeviceSvc deviceSvc;
  private UserSvc userSvc;
  private FingerSvc fingerSvc;
  private CardSvc cardSvc;
  private EventSvc eventSvc;

  public QuickStart(GrpcClient client) {
    grpcClient = client;

    connectSvc = new ConnectSvc(ConnectGrpc.newBlockingStub(client.getChannel())); 
    deviceSvc = new DeviceSvc(DeviceGrpc.newBlockingStub(client.getChannel()));   
    userSvc = new UserSvc(UserGrpc.newBlockingStub(client.getChannel()));  
    fingerSvc = new FingerSvc(FingerGrpc.newBlockingStub(client.getChannel()));  
    cardSvc = new CardSvc(CardGrpc.newBlockingStub(client.getChannel()));
    eventSvc = new EventSvc(EventGrpc.newBlockingStub(client.getChannel()));
  }

  private int testConnect() throws Exception {
    List<DeviceInfo> devInfo = connectSvc.getDeviceList();

    System.out.printf("Device list before connection: \n%s\n\n", devInfo);

    ConnectInfo connInfo = ConnectInfo.newBuilder().setIPAddr(DEVICE_ADDR).setPort(DEVICE_PORT).setUseSSL(DEVICE_USE_SSL).build();

    int deviceID = connectSvc.connect(connInfo);

    devInfo = connectSvc.getDeviceList();

    System.out.printf("Device list after connection: \n%s\n\n", devInfo);

    return deviceID;
  }

  private void testDevice(int deviceID) throws Exception {
    FactoryInfo factoryInfo = deviceSvc.getInfo(deviceID);

    System.out.printf("Device info: \n%s\n\n", factoryInfo);    

    CapabilityInfo capinfo = deviceSvc.getCapabilityInfo(deviceID);

    System.out.printf("Device capability info: \n%s\n\n", capinfo);    
  }


  public static void main(String[] args) throws Exception {
    GrpcClient client = new GrpcClient();

    try {
      client.connect(CA_FILE, SERVER_ADDR, SERVER_PORT);
    } catch (Exception e) {
      System.out.printf("Cannot connect to the server: %s", e); 
      System.exit(-1);
    }

    try {
      QuickStart quickStart = new QuickStart(client);

      int deviceID = quickStart.testConnect();

      quickStart.testDevice(deviceID);

      new FingerTest(quickStart.fingerSvc).test(deviceID);
      new CardTest(quickStart.cardSvc).test(deviceID); 
      new UserTest(quickStart.userSvc, quickStart.fingerSvc).test(deviceID);
      new EventTest(quickStart.eventSvc).test(deviceID);

      quickStart.connectSvc.disconnect(deviceID);      
      client.close();
    } catch (Exception e) {
      System.out.printf("Cannot complete the test: %s", e); 
    }
  }
}

