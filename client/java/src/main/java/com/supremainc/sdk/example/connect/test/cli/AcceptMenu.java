package com.supremainc.sdk.example.connect.test.cli;

import java.util.List;
import java.util.ArrayList;

import com.supremainc.sdk.connect.AcceptFilter;
import com.supremainc.sdk.connect.PendingDeviceInfo;

import com.supremainc.sdk.example.cli.Menu;
import com.supremainc.sdk.example.cli.MenuItem;
import com.supremainc.sdk.example.cli.MenuCallback;
import com.supremainc.sdk.example.connect.ConnectSvc;

public class AcceptMenu {
  private Menu menu;
  private ConnectSvc connectSvc;

  public AcceptMenu(ConnectSvc svc) {
    connectSvc = svc;

    MenuItem[] items = new MenuItem[6];

    items[0] = new MenuItem("1", "Add devices to the filter", new AddDevices(), false);
    items[1] = new MenuItem("2", "Delete devices from the filter", new DeleteDevices(), false);
    items[2] = new MenuItem("3", "Allow all devices", new AllowAll(), false);
    items[3] = new MenuItem("4", "Disallow all devices", new DisallowAll(), false);
    items[4] = new MenuItem("5", "Refresh the pending device list", new ShowPendingList(), false);
    items[5] = new MenuItem("q", "Return to Main Menu", null, true);

    menu = new Menu(items);
  }

  public void show() {
    showAcceptFilter();
    showPendingList();

    menu.show("Accept Menu");    
  }

  class AddDevices implements MenuCallback {
    public void run() {
      System.out.printf("\nEnter the device IDs to add\n");

      List<Integer> deviceIDs = Menu.getDeviceIDs();      

      try {
        AcceptFilter oldFilter = connectSvc.getAcceptFilter();

        List<Integer> newDeviceIDs = new ArrayList<Integer>();
        for(int i = 0; i < oldFilter.getDeviceIDsCount(); i++) {
          newDeviceIDs.add(oldFilter.getDeviceIDs(i));
        }

        for(int i = 0; i < deviceIDs.size(); i++) {
          if(!newDeviceIDs.contains(deviceIDs.get(i))) {
            newDeviceIDs.add(deviceIDs.get(i));
          }
        }

        AcceptFilter newFilter = AcceptFilter.newBuilder().setAllowAll(false).addAllDeviceIDs(newDeviceIDs).build();

        connectSvc.setAcceptFilter(newFilter);
        showAcceptFilter();
      } catch (Exception e) {
        System.out.printf("Cannot add devices to the filter: %s\n", e.getMessage()); 
      }
    }
  }

  class DeleteDevices implements MenuCallback {
    public void run() {
      System.out.printf("\nEnter the device IDs to delete\n");

      List<Integer> deviceIDs = Menu.getDeviceIDs();      

      try {
        AcceptFilter oldFilter = connectSvc.getAcceptFilter();
        List<Integer> newDeviceIDs = new ArrayList<Integer>();
        for(int i = 0; i < oldFilter.getDeviceIDsCount(); i++) {
          
          newDeviceIDs.add(oldFilter.getDeviceIDs(i));
        }        

        for(int i = 0; i < deviceIDs.size(); i++) {
          newDeviceIDs.remove(deviceIDs.get(i));
        }

        AcceptFilter newFilter = AcceptFilter.newBuilder().setAllowAll(false).addAllDeviceIDs(newDeviceIDs).build();

        connectSvc.setAcceptFilter(newFilter);
        showAcceptFilter();
      } catch (Exception e) {
        System.out.printf("Cannot delete devices from the filter: %s\n", e.getMessage()); 
      }
    }
  }  

  class AllowAll implements MenuCallback {
    public void run() {
      AcceptFilter filter = AcceptFilter.newBuilder().setAllowAll(true).build();

      try {
        connectSvc.setAcceptFilter(filter);
        showAcceptFilter();
      } catch (Exception e) {
        System.out.printf("Cannot allow all devices: %s\n", e.getMessage());
      }
    }
  }

  class DisallowAll implements MenuCallback {
    public void run() {
      AcceptFilter filter = AcceptFilter.newBuilder().setAllowAll(false).build();

      try {
        connectSvc.setAcceptFilter(filter);
        showAcceptFilter();
      } catch (Exception e) {
        System.out.printf("Cannot allow all devices: %s\n", e.getMessage());
      }
    }
  }  

  public void showAcceptFilter() {
    System.out.println("Getting the accept filter...");

    try {
      AcceptFilter filter = connectSvc.getAcceptFilter();
      System.out.printf("\n***** Accept Filter: \n%s\n", filter);
    } catch (Exception e) {
      System.out.printf("Cannot get the accept filter: %s\n", e.getMessage());
    }    
  }

  class ShowAcceptFilter implements MenuCallback {
    public void run() {
      showAcceptFilter();
    }
  }

  public void showPendingList() {
    System.out.println("Getting the pending device list...");

    try {
      List<PendingDeviceInfo> devList = connectSvc.getPendingList();

      System.out.printf("\n***** Pending Devices: \n%s\n", devList);
    } catch (Exception e) {
      System.out.printf("Cannot get the pending device list: %s\n", e.getMessage());
    }      
  } 
  
  class ShowPendingList implements MenuCallback {
    public void run() {
      showPendingList();
    }
  }  
}
