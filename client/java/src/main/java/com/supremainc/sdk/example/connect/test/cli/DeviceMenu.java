package com.supremainc.sdk.example.connect.test.cli;

import java.util.List;

import com.supremainc.sdk.connect.DeviceInfo;
import com.supremainc.sdk.connect.ConnectionMode;

import com.supremainc.sdk.example.cli.Menu;
import com.supremainc.sdk.example.cli.MenuItem;
import com.supremainc.sdk.example.cli.MenuCallback;
import com.supremainc.sdk.example.connect.ConnectSvc;

public class DeviceMenu {
  private Menu menu;
  private ConnectSvc connectSvc;

  public DeviceMenu(ConnectSvc svc) {
    connectSvc = svc;

    MenuItem[] items = new MenuItem[7];

    items[0] = new MenuItem("1", "Set connection mode", new SetConnectionMode(), false);
    items[1] = new MenuItem("2", "Enable SSL", new EnableSSL(), false);
    items[2] = new MenuItem("3", "Disable SSL", new DisableSSL(), false);
    items[3] = new MenuItem("4", "Disconnect", new Disconnect(), false);
    items[4] = new MenuItem("5", "Disconnect all", new DisconnectAll(), false);
    items[5] = new MenuItem("6", "Refresh the device list", new GetDeviceList(), false);
    items[6] = new MenuItem("q", "Return to Main Menu", null, true);

    menu = new Menu(items);
  }

  public void show() {
    List<DeviceInfo> devList = getDeviceList();

    if(devList == null || devList.size() == 0) {
      return;
    }

    menu.show("Device Menu");    
  }

  public List<DeviceInfo> getDeviceList() {
    System.out.println("Getting the devices managed by the gateway...");

    try {
      List<DeviceInfo> devList = connectSvc.getDeviceList();

      if(devList.size() == 0) {
        System.out.printf("No managed device. Please connect to some devices first.\n");
      } else {
        System.out.printf("\n***** Managed Devices: \n%s\n", devList);
      }

      return devList;
    } catch (Exception e) {
      System.out.printf("Cannot get the device list: %s\n", e.getMessage());
      return null;
    }
  }


  class SetConnectionMode implements MenuCallback {
    public void run() {
      System.out.printf("\nEnter the device IDs to change the connection mode\n");

      List<Integer> deviceIDs = Menu.getDeviceIDs();

      String[] texts = new String[1];
      texts[0] = "Select the connection mode (0: Gateway to Device(default), 1: Device to Gateway)";
      
      String[] defaults = new String[1];
      defaults[0] = "0";

      String[] inputs = Menu.getUserInputs(texts, defaults);

      String modeStr = inputs[0].trim();

      ConnectionMode connMode;

      if(modeStr.equals("0")) {
        connMode = ConnectionMode.SERVER_TO_DEVICE;
      } 
      else if(modeStr.equals("1")) {
        connMode = ConnectionMode.DEVICE_TO_SERVER;
      }
      else {
        System.out.printf("Invalid connection mode: %s\n", modeStr);
        return;
      }

      try {
        connectSvc.setConnectionMode(deviceIDs, connMode);
      } catch(Exception e) {
        System.out.printf("Cannot set the connection mode: %s\n", e.getMessage());
      }
    }
  }  


  class EnableSSL implements MenuCallback {
    public void run() {
      System.out.printf("\nEnter the device IDs to enable SSL\n");

      List<Integer> deviceIDs = Menu.getDeviceIDs();

      try {
        connectSvc.enableSSL(deviceIDs);
      } catch(Exception e) {
        System.out.printf("Cannot enable SSL: %s\n", e.getMessage());
      }
    }
  }  

  class DisableSSL implements MenuCallback {
    public void run() {
      System.out.printf("\nEnter the device IDs to disable SSL\n");

      List<Integer> deviceIDs = Menu.getDeviceIDs();

      try {
        connectSvc.disableSSL(deviceIDs);
      } catch(Exception e) {
        System.out.printf("Cannot disable SSL: %s\n", e.getMessage());
      }
    }
  }  


  class Disconnect implements MenuCallback {
    public void run() {
      System.out.printf("\nEnter the device IDs to disconnect\n");

      List<Integer> deviceIDs = Menu.getDeviceIDs();

      try {
        connectSvc.disconnectMulti(deviceIDs);
      } catch(Exception e) {
        System.out.printf("Cannot disconnect the devices: %s\n", e.getMessage());
      }
    }
  }

  class DisconnectAll implements MenuCallback {
    public void run() {
      System.out.println("Disconnecting all devices...");

      try {
        connectSvc.disconnectAll();
      } catch (Exception e) {
        System.out.printf("Cannot disconnect all devices: %s\n", e.getMessage());
      }      
    }
  }

  class GetDeviceList implements MenuCallback {
    public void run() {
      getDeviceList();
    }
  }  
}