using System;
using System.Collections.Generic;
using Connect;

namespace example
{
  class AsyncMenu {
    private Menu menu;
    private static ConnectSvc connectSvc;

    public AsyncMenu(ConnectSvc svc) {
      connectSvc = svc;

      MenuItem[] items = new MenuItem[4];
      items[0] = new MenuItem("1", "Add async connections", new MenuCallback(AddAsyncConnection), false);
      items[1] = new MenuItem("2", "Delete async connections", new MenuCallback(DeleteAsyncConnection), false);
      items[2] = new MenuItem("3", "Refresh the connection list", new MenuCallback(ShowAsyncConnection), false);
      items[3] = new MenuItem("q", "Return to Main Menu", null, true);      

      menu = new Menu(items);
    }

    public void Show() {
      ShowAsyncConnection();

      menu.Show("Async Menu");
    }

    public static void ShowAsyncConnection() {
      Console.WriteLine("Getting the async connections...");

      try {
        var devList = connectSvc.GetDeviceList();
        var asyncConns = new List<DeviceInfo>();

        for(int i = 0; i < devList.Count; i++) {
          if(devList[i].AutoReconnect) {
            asyncConns.Add(devList[i]);
          }
        }

        Console.WriteLine();
        Console.WriteLine("***** Async Connections: {0}", asyncConns.Count);
        for(int i = 0; i < asyncConns.Count; i++) {
          Console.WriteLine(asyncConns[i]);
        }

        Console.WriteLine();
      } catch(Exception e) {
        Console.WriteLine("Cannot get the async connections: {0}", e);
      }
    }

    public static void AddAsyncConnection() {
      List<AsyncConnectInfo> asyncConns = new List<AsyncConnectInfo>();

      while(true) {
        Console.Write(">> Enter the device ID (Press just ENTER if no more device): ");
        string input = Console.ReadLine();

        if(input.Trim().Equals("")) {
          break;
        }

        uint devID = 0;

        if(!UInt32.TryParse(input, out devID)) {
          Console.WriteLine("Invalid device ID: {0}", input);
          return;
        }

        var connInfo = MainMenu.GetConnectInfo();

        if(connInfo == null) {
          return;
        }

        AsyncConnectInfo asyncInfo = new AsyncConnectInfo{ DeviceID = devID, IPAddr = connInfo.IPAddr, Port = connInfo.Port, UseSSL = connInfo.UseSSL };
        asyncConns.Add(asyncInfo);
      }

      if(asyncConns.Count == 0) {
        Console.WriteLine("You have to enter at least one async connection");
        return;
      }

      try {
        Console.WriteLine("Adding async connections...");
        connectSvc.AddAsyncConnection(asyncConns.ToArray());
        ShowAsyncConnection();
      } catch(Exception e) {
        Console.WriteLine("Cannot add the async connections: {0}", e);
      }
    }

    public static void DeleteAsyncConnection() {
      uint[] deviceIDs = Menu.GetDeviceIDs();

      if(deviceIDs == null) {
        return;
      }

      try {
        Console.WriteLine("Deleting async connections...");
        connectSvc.DeleteAsyncConnection(deviceIDs);
        ShowAsyncConnection();
      } catch(Exception e) {
        Console.WriteLine("Cannot delete the async connections: {0}", e);
      }
    }
  }
}


