using System;
using System.Collections.Generic;
using Connect;

namespace example
{
  class AcceptMenu {
    private Menu menu;
    private static ConnectSvc connectSvc;

    public AcceptMenu(ConnectSvc svc) {
      connectSvc = svc;

      MenuItem[] items = new MenuItem[6];
      items[0] = new MenuItem("1", "Add devices to the filter", new MenuCallback(AddDevices), false);
      items[1] = new MenuItem("2", "Delete devices from the filter", new MenuCallback(DeleteDevices), false);
      items[2] = new MenuItem("3", "Allow all devices", new MenuCallback(AllowAll), false);
      items[3] = new MenuItem("4", "Disallow all devices", new MenuCallback(DisallowAll), false);
      items[4] = new MenuItem("5", "Refresh the pending device list", new MenuCallback(ShowPendingList), false);
      items[5] = new MenuItem("q", "Return to Main Menu", null, true);      

      menu = new Menu(items);
    }

    public void Show() {
      ShowAcceptFilter();
      ShowPendingList();

      menu.Show("Accept Menu");
    }

    public static void AddDevices() {
      Console.WriteLine("Enter the device IDs to add");

      uint[] deviceIDs = Menu.GetDeviceIDs();

      if(deviceIDs == null) {
        return;
      }

      try {
        AcceptFilter filter = connectSvc.GetAcceptFilter();
        
        for(int i = 0; i < deviceIDs.Length; i++) {
          if(!filter.DeviceIDs.Contains(deviceIDs[i])) {
            filter.DeviceIDs.Add(deviceIDs[i]);
          }
        }

        filter.AllowAll = false;

        connectSvc.SetAcceptFilter(filter);
        ShowAcceptFilter();
      } catch(Exception e) {
        Console.WriteLine("Cannot add the devices to the filter: {0}", e);
      }     
    }

    public static void DeleteDevices() {
      Console.WriteLine("Enter the device IDs to delete");

      uint[] deviceIDs = Menu.GetDeviceIDs();

      if(deviceIDs == null) {
        return;
      }

      try {
        AcceptFilter filter = connectSvc.GetAcceptFilter();
        
        for(int i = 0; i < deviceIDs.Length; i++) {
          filter.DeviceIDs.Remove(deviceIDs[i]);
        }

        filter.AllowAll = false;

        connectSvc.SetAcceptFilter(filter);
        ShowAcceptFilter();
      } catch(Exception e) {
        Console.WriteLine("Cannot delete the devices from the filter: {0}", e);
      }          
    }

    public static void AllowAll() {
      AcceptFilter filter = new AcceptFilter{ AllowAll = true };

      try {
        connectSvc.SetAcceptFilter(filter);
        ShowAcceptFilter();
      } catch(Exception e) {
        Console.WriteLine("Cannot allow all devices: {0}", e);
      }
    }

    public static void DisallowAll() {
      AcceptFilter filter = new AcceptFilter{ AllowAll = false };

      try {
        connectSvc.SetAcceptFilter(filter);
        ShowAcceptFilter();
      } catch(Exception e) {
        Console.WriteLine("Cannot disallow all devices: {0}", e);
      }
    }    

    public static void ShowAcceptFilter() {
      Console.WriteLine("Getting the accept filter...");

      try {
        var filter = connectSvc.GetAcceptFilter();

        Console.WriteLine();
        Console.WriteLine("***** Accept Filter: {0}", filter);
        Console.WriteLine();
      } catch(Exception e) {
        Console.WriteLine("Cannot get the accept filter: {0}", e);
      }
    }

    public static void ShowPendingList() {
      Console.WriteLine("Getting the pending device list...");

      try {
        var devList = connectSvc.GetPendingList();
        
        Console.WriteLine();
        Console.WriteLine("***** Pending Devices: {0}", devList.Count);
        for(int i = 0; i < devList.Count; i++) {
          Console.WriteLine(devList[i]);
        }

        Console.WriteLine();
      } catch(Exception e) {
        Console.WriteLine("Cannot get the pending list: {0}", e);
      }
    }
  }
}


