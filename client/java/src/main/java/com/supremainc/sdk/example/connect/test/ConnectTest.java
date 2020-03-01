package com.supremainc.sdk.example.connect.test;

import java.util.Iterator;

import io.grpc.Context;
import io.grpc.Context.CancellableContext;

import com.supremainc.sdk.connect.ConnectGrpc;
import com.supremainc.sdk.connect.Status;
import com.supremainc.sdk.connect.StatusChange;
import com.supremainc.sdk.example.client.GrpcClient;
import com.supremainc.sdk.example.connect.ConnectSvc;
import com.supremainc.sdk.example.connect.test.cli.MainMenu;

public class ConnectTest {
  private static final String CA_FILE = "ca.crt";

  private static final String SERVER_ADDR = "192.168.0.2";
  private static final int SERVER_PORT = 4000;

  private GrpcClient grpcClient;
  private ConnectSvc connectSvc;

  CancellableContext monitoringCtx;

  private MainMenu mainMenu;

  public ConnectTest(GrpcClient client) {
    grpcClient = client;

    connectSvc = new ConnectSvc(ConnectGrpc.newBlockingStub(client.getChannel())); 
    mainMenu = new MainMenu(connectSvc);

    monitoringCtx = null;
  }

  public void showMainMenu() {
    mainMenu.show();
  }

  public void startMonitoring() {
    new Thread(new StatusMonitoring()).start();
  }

  public void stopMonitoring() {
    if(monitoringCtx != null) {
      monitoringCtx.cancel(null);
    }
  }

  class StatusMonitoring implements Runnable {
    public void run() {
      monitoringCtx = Context.current().withCancellation();
      Context prevCtx = monitoringCtx.attach();
  
      try {
        Iterator<StatusChange> statusStream = connectSvc.subscribe();
  
        while(statusStream.hasNext()) {
          StatusChange change = statusStream.next();

          if(change.getStatus() != Status.TCP_NOT_ALLOWED && change.getStatus() != Status.TLS_NOT_ALLOWED) {
            System.out.printf("\n[STATUS] Device status change: \n%s\n", change);
          }
        }
      } catch(Exception e) {
        System.out.printf("Monitoring error: %s\n", e);
      } finally {
        monitoringCtx.detach(prevCtx);
      }
    }
  }  

  public static void main(String[] args) throws Exception {
    GrpcClient client = new GrpcClient();

    try {
      client.connect(CA_FILE, SERVER_ADDR, SERVER_PORT);
    } catch (Exception e) {
      System.out.printf("Cannot connect to the server: %s", e); 
      System.exit(-1);
    }

    try {
      ConnectTest connTest = new ConnectTest(client);

      connTest.startMonitoring();

      connTest.showMainMenu();

      connTest.stopMonitoring();

      client.close();
    } catch (Exception e) {
      System.out.printf("Cannot complete the test: %s", e); 
    }
  }
}

