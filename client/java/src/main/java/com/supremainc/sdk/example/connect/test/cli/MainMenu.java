package com.supremainc.sdk.example.connect.test.cli;

import java.util.List;

import com.supremainc.sdk.connect.ConnectInfo;
import com.supremainc.sdk.connect.SearchDeviceInfo;

import com.supremainc.sdk.example.cli.Menu;
import com.supremainc.sdk.example.cli.MenuItem;
import com.supremainc.sdk.example.cli.MenuCallback;
import com.supremainc.sdk.example.connect.ConnectSvc;

public class MainMenu {
  private Menu menu;
  private ConnectSvc connectSvc;

  private DeviceMenu deviceMenu;
  private AsyncMenu asyncMenu;
  private AcceptMenu acceptMenu;

  public MainMenu(ConnectSvc svc) {
    connectSvc = svc;

    MenuItem[] items = new MenuItem[6];

    items[0] = new MenuItem("1", "Search device", new SearchDevice(), false);
    items[1] = new MenuItem("2", "Connect to a device synchronously", new Connect(), false);
    items[2] = new MenuItem("3", "Manage asynchronous connections", new ShowAsyncMenu(), false);
    items[3] = new MenuItem("4", "Accept devices", new ShowAcceptMenu(), false);
    items[4] = new MenuItem("5", "Device menu", new ShowDeviceMenu(), false);
    items[5] = new MenuItem("q", "Quit", null, true);

    menu = new Menu(items);

    deviceMenu = new DeviceMenu(connectSvc);
    asyncMenu = new AsyncMenu(connectSvc);
    acceptMenu = new AcceptMenu(connectSvc);
  }

  public void show() {
    menu.show("Main Menu");    
  }

  class SearchDevice implements MenuCallback {
    public void run() {
      System.out.println("Searching devices in the subnet...");

      try {
        List<SearchDeviceInfo> devInfo = connectSvc.searchDevice();
        System.out.printf("\n***** Found devices:\n%s\n", devInfo);
      } catch (Exception e) {
        System.out.printf("Cannot search device: %s\n", e.getMessage());
      }
    }
  }

  class ShowDeviceMenu implements MenuCallback {
    public void run() {
      deviceMenu.show();
    }
  }

  class ShowAsyncMenu implements MenuCallback {
    public void run() {
      asyncMenu.show();
    }
  }  

  class ShowAcceptMenu implements MenuCallback {
    public void run() {
      acceptMenu.show();
    }
  }  

  class Connect implements MenuCallback {
    public void run() {
      ConnectInfo connInfo = MenuUtil.getConnectInfo();

      if(connInfo == null) {
        return;
      }

      System.out.println("Connecting to a device synchronously...");

      try {
        int deviceID = connectSvc.connect(connInfo);
        System.out.printf("\n***** Connected to device %d\n", deviceID);
      } catch (Exception e) {
        System.out.printf("Cannot connect to the device: %s\n", e.getMessage());
      }
    }
  }
}


