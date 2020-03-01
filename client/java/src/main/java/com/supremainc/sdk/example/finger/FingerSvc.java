package com.supremainc.sdk.example.finger;

import com.supremainc.sdk.finger.FingerConfig;
import com.supremainc.sdk.finger.FingerGrpc;
import com.supremainc.sdk.finger.GetImageRequest;
import com.supremainc.sdk.finger.GetImageResponse;
import com.supremainc.sdk.finger.GetConfigRequest;
import com.supremainc.sdk.finger.GetConfigResponse;
import com.supremainc.sdk.finger.ScanRequest;
import com.supremainc.sdk.finger.ScanResponse;
import com.supremainc.sdk.finger.TemplateFormat;

public class FingerSvc {
  private final FingerGrpc.FingerBlockingStub fingerStub;

  public FingerSvc(FingerGrpc.FingerBlockingStub stub) {
    fingerStub = stub;
  }

  public byte[] scan(int deviceID, TemplateFormat templateFormat, int qualityThreshold) throws Exception {
    ScanRequest request = ScanRequest.newBuilder().setDeviceID(deviceID).setTemplateFormat(templateFormat).setQualityThreshold(qualityThreshold).build();
    ScanResponse response = fingerStub.scan(request);

    System.out.printf("Template Score: %d\n", response.getQualityScore());

    return response.getTemplateData().toByteArray();
  } 

  public byte[] getImage(int deviceID) throws Exception {
    GetImageRequest request = GetImageRequest.newBuilder().setDeviceID(deviceID).build();
    GetImageResponse response = fingerStub.getImage(request);

    return response.getBMPImage().toByteArray();
  } 

  public FingerConfig getConfig(int deviceID) throws Exception {
    GetConfigRequest request = GetConfigRequest.newBuilder().setDeviceID(deviceID).build();
    GetConfigResponse response = fingerStub.getConfig(request);

    return response.getConfig();
  }

}