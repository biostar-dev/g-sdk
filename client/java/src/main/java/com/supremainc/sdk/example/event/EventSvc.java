package com.supremainc.sdk.example.event;

import java.util.Iterator;
import java.util.List;

import com.supremainc.sdk.event.DisableMonitoringRequest;
import com.supremainc.sdk.event.EnableMonitoringRequest;
import com.supremainc.sdk.event.EventGrpc;
import com.supremainc.sdk.event.EventLog;
import com.supremainc.sdk.event.GetImageLogRequest;
import com.supremainc.sdk.event.GetImageLogResponse;
import com.supremainc.sdk.event.GetLogRequest;
import com.supremainc.sdk.event.GetLogResponse;
import com.supremainc.sdk.event.ImageLog;
import com.supremainc.sdk.event.SubscribeRealtimeLogRequest;

import io.grpc.Context;
import io.grpc.Context.CancellableContext;

public class EventSvc {
  private final EventGrpc.EventBlockingStub eventStub;
  private CancellableContext monitoringCtx;

  public EventSvc(EventGrpc.EventBlockingStub stub) {
    eventStub = stub;
    monitoringCtx = null;
  }

  public void setCancellableContext(CancellableContext ctx) {
    monitoringCtx = ctx;
  }

  public EventGrpc.EventBlockingStub getStub() {
    return eventStub;
  }

  public List<EventLog> getLog(int deviceID, int startEventID, int maxNumOfLog) throws Exception {
    GetLogRequest request = GetLogRequest.newBuilder().setDeviceID(deviceID).setStartEventID(startEventID).setMaxNumOfLog(maxNumOfLog).build();
    GetLogResponse response;

    response = eventStub.getLog(request);
    return response.getEventsList();
  } 

  public List<ImageLog> getImageLog(int deviceID, int startEventID, int maxNumOfLog) throws Exception {
    GetImageLogRequest request = GetImageLogRequest.newBuilder().setDeviceID(deviceID).setStartEventID(startEventID).setMaxNumOfLog(maxNumOfLog).build();
    GetImageLogResponse response;

    response = eventStub.getImageLog(request);
    return response.getImageEventsList();
  } 

  public void startMonitoring(int deviceID) throws Exception {
    EnableMonitoringRequest enableRequest = EnableMonitoringRequest.newBuilder().setDeviceID(deviceID).build();
    eventStub.enableMonitoring(enableRequest);

    new Thread(new EventMonitoring(this, deviceID)).start();
  }

  public void stopMonitoring(int deviceID) throws Exception {
    DisableMonitoringRequest disableRequest = DisableMonitoringRequest.newBuilder().setDeviceID(deviceID).build();
    eventStub.disableMonitoring(disableRequest);

    if(monitoringCtx != null) {
      monitoringCtx.cancel(null);
    }
  }
}


class EventMonitoring implements Runnable {
  private static final int MONITORING_QUEUE_SIZE = 8;

  private final EventSvc eventSvc;
  private final int deviceID;

  public EventMonitoring(EventSvc svc, int devID) {
    eventSvc = svc;
    deviceID = devID;
  }

  public void run() {
    CancellableContext monitoringCtx = Context.current().withCancellation();
    Context prevCtx = monitoringCtx.attach();

    eventSvc.setCancellableContext(monitoringCtx);

    try {
      SubscribeRealtimeLogRequest subscribeRequest = SubscribeRealtimeLogRequest.newBuilder().setQueueSize(MONITORING_QUEUE_SIZE).addDeviceIDs(deviceID).build();
      Iterator<EventLog> eventStream = eventSvc.getStub().subscribeRealtimeLog(subscribeRequest);

      System.out.println("Start receiving real-time events");

      while(eventStream.hasNext()) {
        EventLog eventLog = eventStream.next();
        System.out.printf("Event: %s\n", eventLog);
      }
    } catch(Exception e) {
      System.out.printf("Monitoring error: %s\n", e);
    } finally {
      monitoringCtx.detach(prevCtx);
    }
  }
}