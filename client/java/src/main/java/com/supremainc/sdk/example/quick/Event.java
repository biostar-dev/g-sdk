package com.supremainc.sdk.example.quick;

import java.io.FileOutputStream;
import java.util.List;

import com.supremainc.sdk.event.EventLog;
import com.supremainc.sdk.event.ImageLog;
import com.supremainc.sdk.example.event.EventSvc;

class EventTest {
  private static final int MAX_NUM_OF_LOG = 16;
  private static final int MAX_NUM_OF_IMAGE_LOG = 2;

  private static final String LOG_IMAGE_FILE = "./image_log.jpg";

  private EventSvc eventSvc;

  public EventTest(EventSvc svc) {
    eventSvc = svc;
  }

  public void test(int deviceID) throws Exception {
    List<EventLog> events = eventSvc.getLog(deviceID, 0, MAX_NUM_OF_LOG);
    
    System.out.printf("Events: \n%s\n\n", events);    

    List<ImageLog> imageEvents = eventSvc.getImageLog(deviceID, 0, MAX_NUM_OF_IMAGE_LOG);

    System.out.printf("Num of image events: %d\n\n", imageEvents.size());

    if(imageEvents.size() > 0) {
      FileOutputStream jpgFile = new FileOutputStream(LOG_IMAGE_FILE);
      jpgFile.write(imageEvents.get(0).getJPGImage().toByteArray());
      jpgFile.close();      
    }

    eventSvc.startMonitoring(deviceID);

    System.out.println(">>> Generate real-time events for 10 seconds");

    Thread.sleep(10000);

    eventSvc.stopMonitoring(deviceID);
  }
}

