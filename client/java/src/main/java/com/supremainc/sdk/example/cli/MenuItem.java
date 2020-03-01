package com.supremainc.sdk.example.cli;

public class MenuItem {
  String key;
  String text;
  MenuCallback callback;
  boolean exit;

  public MenuItem(String menuKey, String menuText, MenuCallback menuCallback, boolean menuExit) {
    key = menuKey;
    text = menuText;
    callback = menuCallback;
    exit = menuExit;
  }

  public void show() {
    System.out.printf("(%s) %s\n", key, text);
  }
}


