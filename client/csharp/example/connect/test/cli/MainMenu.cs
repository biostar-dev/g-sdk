using System;
using Connect;

namespace example
{
  class MainMenu {
    private Menu menu;
    private static ConnectSvc connectSvc;
    private static DeviceMenu deviceMenu;
    private static AsyncMenu asyncMenu;
    private static AcceptMenu acceptMenu;

    public MainMenu(ConnectSvc svc) {
      connectSvc = svc;

      MenuItem[] items = new MenuItem[6];
      items[0] = new MenuItem("1", "Search devices", new MenuCallback(SearchDevice), false);
      items[1] = new MenuItem("2", "Connect to a device synchronously", new MenuCallback(ConnectToDevice), false);
      items[2] = new MenuItem("3", "Manage asynchronous connections", new MenuCallback(ShowAsyncMenu), false);
      items[3] = new MenuItem("4", "Accept devices", ShowAcceptMenu, false);
      items[4] = new MenuItem("5", "Device menu", new MenuCallback(ShowDeviceMenu), false);
      items[5] = new MenuItem("q", "Quit", null, true);      

      menu = new Menu(items);

      deviceMenu = new DeviceMenu(svc);
      asyncMenu = new AsyncMenu(svc);
      acceptMenu = new AcceptMenu(svc);
    }

    public void Show() {
      menu.Show("Main Menu");
    }

    public static void SearchDevice() {
      Console.WriteLine("Searching devices in the subnet...");

      try {
        var devList = connectSvc.SearchDevice();
        
        Console.WriteLine();
        Console.WriteLine("***** Found Devices: {0}", devList.Count);
        for(int i = 0; i < devList.Count; i++) {
          Console.WriteLine(devList[i]);
        }

        Console.WriteLine();
      } catch(Exception e) {
        Console.WriteLine("Cannot search devices: {0}", e);
      }
    }

    public static void ConnectToDevice() {
      var connInfo = GetConnectInfo();

      if(connInfo != null) {
        try {
          Console.WriteLine("Connecting to the device...");

          uint devID = connectSvc.Connect(connInfo);
          Console.WriteLine("Connected to {0}", devID);
        } catch(Exception e) {
          Console.WriteLine("Cannot connect to the device: {0}", e);
        }
      }
    }

    public static void ShowDeviceMenu() {
      deviceMenu.Show();
    }

    public static void ShowAsyncMenu() {
      asyncMenu.Show();
    }    

    public static void ShowAcceptMenu() {
      acceptMenu.Show();
    }    

    public static ConnectInfo GetConnectInfo() {
      InputItem[] items = new InputItem[3];
      items[0] = new InputItem{ text = "Enter the IP address of the device", defaultVal = "" };
      items[1] = new InputItem{ text = "Enter the port of the device (default: 51211)", defaultVal = "51211" };
      items[2] = new InputItem{ text = "Use SSL y/n (default: n)", defaultVal = "n" };

      var userInputs = Menu.GetUserInput(items);
      
      int port = 0;
      if(!Int32.TryParse(userInputs[1], out port)) {
        Console.WriteLine("Invalid port number: {0}", userInputs[1]);
        return null;
      }

      bool useSSL = userInputs[2].Trim().ToLower().Equals("y");

      return new ConnectInfo{ IPAddr = userInputs[0], Port = port, UseSSL = useSSL };
    }    
  }
}


