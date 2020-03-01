package com.supremainc.sdk.example.device;

import com.supremainc.sdk.device.DeviceGrpc;
import com.supremainc.sdk.device.FactoryInfo;
import com.supremainc.sdk.device.GetInfoRequest;
import com.supremainc.sdk.device.GetInfoResponse;
import com.supremainc.sdk.device.CapabilityInfo;
import com.supremainc.sdk.device.GetCapabilityInfoRequest;
import com.supremainc.sdk.device.GetCapabilityInfoResponse;

public class DeviceSvc {
  private final DeviceGrpc.DeviceBlockingStub deviceStub;

  public DeviceSvc(DeviceGrpc.DeviceBlockingStub stub) {
    deviceStub = stub;
  }

  public FactoryInfo getInfo(int deviceID) throws Exception {
    GetInfoRequest request = GetInfoRequest.newBuilder().setDeviceID(deviceID).build();
    GetInfoResponse response;

    response = deviceStub.getInfo(request);
    return response.getInfo();
  } 

  public CapabilityInfo getCapabilityInfo(int deviceID) throws Exception {
    GetCapabilityInfoRequest request = GetCapabilityInfoRequest.newBuilder().setDeviceID(deviceID).build();
    GetCapabilityInfoResponse response;

    response = deviceStub.getCapabilityInfo(request);
    return response.getCapInfo();
  } 

}