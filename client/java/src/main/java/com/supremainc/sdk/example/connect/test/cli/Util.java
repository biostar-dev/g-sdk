package com.supremainc.sdk.example.connect.test.cli;

import com.supremainc.sdk.connect.ConnectInfo;

import com.supremainc.sdk.example.cli.Menu;

class MenuUtil {
  public static ConnectInfo getConnectInfo() {
    String[] texts = new String[3];
    texts[0] = "Enter the IP address of the device";
    texts[1] = "Enter the port of the device (default: 51211)";
    texts[2] = "Use SSL y/n (default: n)";

    String[] defaults = new String[3];
    defaults[0] = "";
    defaults[1] = "51211";
    defaults[2] = "n";

    String[] inputs = Menu.getUserInputs(texts, defaults);

    try {
      ConnectInfo connInfo = ConnectInfo.newBuilder().setIPAddr(inputs[0]).setPort(Integer.parseInt(inputs[1])).setUseSSL(inputs[2].trim().toLowerCase().equals("y")).build();
      return connInfo;
    } catch (Exception e) {
      System.out.printf("Invalid port number: %s\n", e.getMessage());
      return null;
    }
  }
}