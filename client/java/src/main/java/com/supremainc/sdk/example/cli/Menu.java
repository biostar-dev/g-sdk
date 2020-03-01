package com.supremainc.sdk.example.cli;

import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

class FirstCallback implements MenuCallback{
  public void run() {
    System.out.printf("Run 1st callback\n");
  }
}

class SecondCallback implements MenuCallback{
  public void run() {
    System.out.printf("Run 2nd callback\n");
  }
}


public class Menu {
  private MenuItem[] items;

  public Menu(MenuItem[] menuItems) {
    items = menuItems;
  }

  public void show(String title) {
    Scanner input = new Scanner(System.in);

    while(true) {
      System.out.printf("\n===== %s =====\n\n", title);

      for(int i = 0; i < items.length; i++) {
        items[i].show();
      }

      System.out.printf("\n>>>>> Select a menu: ");

      String menuKey = input.nextLine().trim();

      for(int i = 0; i < items.length; i++) {
        if(menuKey.equals(items[i].key)) {
          if(items[i].callback != null) {
            items[i].callback.run();
          } 

          if(items[i].exit) {
            return;
          }
        }
      }
    }
  }

  public static String[] getUserInputs(String[] texts, String[] defaults) {
    String[] userInputs = new String[texts.length];

    Scanner input = new Scanner(System.in);

    for(int i = 0; i < texts.length; i++) {
      System.out.printf(">> %s: ", texts[i]);

      userInputs[i] = input.nextLine().trim();

      if(userInputs[i].equals("")) {
        userInputs[i] = defaults[i];
      }
    }

    return userInputs;
  }

  public static List<Integer> getDeviceIDs() {
    List<Integer> deviceIDs = new ArrayList<>();

    while(true) {
      String[] texts = new String[1];
      texts[0] = "Enter the device ID (Press just ENTER if no more device)";

      String[] defaults = new String[1];
      defaults[0] = "";

      String[] devIDStr = getUserInputs(texts, defaults);  

      devIDStr[0] = devIDStr[0].trim();

      if(devIDStr[0].equals("")) {
        break;
      }

      try {
        int devID = Integer.parseInt(devIDStr[0].trim());

        deviceIDs.add(devID);
      } catch(NumberFormatException nfe) {
        System.out.printf("Invalid device ID: %s\n", nfe.getMessage());
      }
    }

    return deviceIDs;    
  }

  public static void main(String[] args) throws Exception {  
    MenuItem[] testItems = new MenuItem[3];

    MenuCallback firstCallback = new FirstCallback();
    MenuCallback secondCallback = new SecondCallback();

    testItems[0] = new MenuItem("1", "Menu 1", firstCallback, false);
    testItems[1] = new MenuItem("2", "Menu 2", secondCallback, false);
    testItems[2] = new MenuItem("q", "Quit", null, true);

    Menu menu = new Menu(testItems);

    menu.show("Test Menu");

    String[] texts = new String[2];
    texts[0] = "Enter IP addr (no default)";
    texts[1] = "Enter IP addr (default: 192.168.0.1)";

    String[] defaults = new String[2];
    defaults[0] = "";
    defaults[1] = "192.168.0.1";

    String[] inputs = getUserInputs(texts, defaults);

    for(int i = 0; i < texts.length; i++) {
      System.out.printf("Your input %d: %s\n", i, inputs[i]);
    }

    List<Integer> deviceIDs = getDeviceIDs();
    System.out.printf("Device IDs: %s\n", deviceIDs);
  }
}