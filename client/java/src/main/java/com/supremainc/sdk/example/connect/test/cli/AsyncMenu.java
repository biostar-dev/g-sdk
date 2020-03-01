package com.supremainc.sdk.example.connect.test.cli;

import java.util.List;
import java.util.ArrayList;

import com.supremainc.sdk.connect.DeviceInfo;
import com.supremainc.sdk.connect.AsyncConnectInfo;
import com.supremainc.sdk.connect.ConnectInfo;
import com.supremainc.sdk.example.cli.Menu;
import com.supremainc.sdk.example.cli.MenuItem;
import com.supremainc.sdk.example.cli.MenuCallback;
import com.supremainc.sdk.example.connect.ConnectSvc;

public class AsyncMenu {
  private Menu menu;
  private ConnectSvc connectSvc;

  public AsyncMenu(ConnectSvc svc) {
    connectSvc = svc;

    MenuItem[] items = new MenuItem[4];

    items[0] = new MenuItem("1", "Add async connections", new AddAsyncConnection(), false);
    items[1] = new MenuItem("2", "Delete async connections", new DeleteAsyncConnection(), false);
    items[2] = new MenuItem("3", "Refresh the connection list", new ShowAsyncConnection(), false);
    items[3] = new MenuItem("q", "Return to Main Menu", null, true);

    menu = new Menu(items);
  }

  public void show() {
    showAsyncConnection();

    menu.show("Async Menu");    
  }

  public void showAsyncConnection() {
    System.out.println("Getting the asynchronous connections...");

    try {
      List<DeviceInfo> asyncConnList = new ArrayList();

      List<DeviceInfo> devList = connectSvc.getDeviceList();

      for(int i = 0; i < devList.size(); i++) {
        if(devList.get(i).getAutoReconnect()) {
          asyncConnList.add(devList.get(i));
        }
      }

      System.out.printf("\n***** Async Connections: \n%s\n", asyncConnList);
    } catch (Exception e) {
      System.out.printf("Cannot get the device list: %s\n", e.getMessage());
      return;
    }      
  }


  class AddAsyncConnection implements MenuCallback {
    public void run() {
      List<AsyncConnectInfo> connInfos = new ArrayList();

      String[] texts = new String[1];
      texts[0] = "Enter the device ID (Press just ENTER if no more device)";
      
      String[] defaults = new String[1];
      defaults[0] = "";

      while(true) {
        String[] inputs = Menu.getUserInputs(texts, defaults);

        if(inputs[0].trim().equals("")) {
          break;
        }
    
        try {
          int devID = Integer.parseInt(inputs[0]);

          ConnectInfo connInfo = MenuUtil.getConnectInfo();
          
          if(connInfo == null) {
            return;
          }

          AsyncConnectInfo asyncConnInfo = AsyncConnectInfo.newBuilder()
                                            .setDeviceID(devID)
                                            .setIPAddr(connInfo.getIPAddr())
                                            .setPort(connInfo.getPort())
                                            .setUseSSL(connInfo.getUseSSL())
                                            .build();

          connInfos.add(asyncConnInfo);
        } catch (Exception e) {
          System.out.printf("Invalid device ID: %s\n", e.getMessage());
          return;
        }    
      }
    
      if(connInfos.size() == 0) {
        System.out.println("You have to enter at least one connection info");
        return;
      }

      try {
        connectSvc.addAsyncConnection(connInfos);
        showAsyncConnection();
      } catch (Exception e) {
        System.out.printf("Cannot add async connections: %s\n", e.getMessage());
      }

    }
  }

  class DeleteAsyncConnection implements MenuCallback {
    public void run() {
      System.out.printf("\nEnter the device IDs to delete\n");

      List<Integer> deviceIDs = Menu.getDeviceIDs();

      try {
        connectSvc.deleteAsyncConnection(deviceIDs);
        showAsyncConnection();
      } catch(Exception e) {
        System.out.printf("Cannot delete the devices: %s\n", e.getMessage());
      }
    }
  }

  class ShowAsyncConnection implements MenuCallback {
    public void run() {
      showAsyncConnection();
    }
  }
}