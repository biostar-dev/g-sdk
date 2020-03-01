package com.supremainc.sdk.example.quick;

import java.io.FileOutputStream;
import java.util.Arrays;

import com.supremainc.sdk.example.finger.FingerSvc;
import com.supremainc.sdk.finger.FingerConfig;
import com.supremainc.sdk.finger.TemplateFormat;

class FingerTest {
  private static final String FINGERPRINT_IMAGE_FILE = "./finger.bmp";
  private static final int QUALITY_THRESHOLD = 50;

  private FingerSvc fingerSvc;

  public FingerTest(FingerSvc svc) {
    fingerSvc = svc;
  }

  public void test(int deviceID) throws Exception {
    System.out.println(">>> Scan a finger...");

    byte[] templateData = fingerSvc.scan(deviceID, TemplateFormat.TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD);

    System.out.printf("Template data: \n%s\n\n", Arrays.toString(templateData));    

    byte[] bmpImage = fingerSvc.getImage(deviceID);
    FileOutputStream bmpFile = new FileOutputStream(FINGERPRINT_IMAGE_FILE);
    bmpFile.write(bmpImage);
    bmpFile.close();

    FingerConfig fingerConfig = fingerSvc.getConfig(deviceID);

    System.out.printf("Fingerprint config: \n%s\n\n", fingerConfig);
  }
}

