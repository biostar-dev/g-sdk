using System;
using System.Collections.Generic;

namespace example
{
  public delegate void MenuCallback();

  class MenuItem {
    public string key;
    public string text;
    public MenuCallback callback;
    public bool exit;

    public MenuItem(string menuKey, string menuText, MenuCallback menuCallback, bool menuExit) {
      key = menuKey;
      text = menuText;
      callback = menuCallback;
      exit = menuExit;
    }

    public void Show() {
      Console.WriteLine("({0}) {1}", key, text);
    }
  }

  class InputItem {
    public string text;
    public string defaultVal;
  }

  class Menu
  {
    private MenuItem[] items;

    public Menu(MenuItem[] menuItems) {
      items = menuItems;
    }

    public void Show(string title) {
      while(true) {
        Console.WriteLine();
        Console.WriteLine("===== {0} =====", title);
        Console.WriteLine();

        for(int i = 0; i < items.Length; i++) {
          items[i].Show();
        }

        Console.WriteLine();
        Console.Write(">>>>> Select a menu: ");

        string input = Console.ReadLine().Trim();

        for(int i = 0; i < items.Length; i++) {
          if(input.Equals(items[i].key)) {
            if(items[i].callback != null) {
              items[i].callback();
            }

            if(items[i].exit) {
              return;
            } 
          }
        }
      }
    }

    public static string[] GetUserInput(InputItem[] items) {
      List<string> userInputs = new List<string>();

      for(int i = 0; i < items.Length; i++) {
        Console.Write(">> {0}: ", items[i].text);
        string input = Console.ReadLine().Trim();

        if(input.Equals("")) {
          input = items[i].defaultVal;
        }

        userInputs.Add(input);
      }

      return userInputs.ToArray();
    }

    public static uint[] GetDeviceIDs() {
      List<uint> deviceIDs = new List<uint>();

      while(true) {
        Console.Write(">> Enter the device ID (Press just ENTER if no more device): ");
        string input = Console.ReadLine().Trim();

        if(input.Equals("")) {
          break;
        }

        uint devID = 0;
        if(!UInt32.TryParse(input, out devID)) {
          Console.WriteLine("Invalid device ID: {0}", input);
          return null;
        }

        deviceIDs.Add(devID);
      }
      
      return deviceIDs.ToArray();
    }    
  }
}