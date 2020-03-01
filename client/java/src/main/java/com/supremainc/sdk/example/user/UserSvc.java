package com.supremainc.sdk.example.user;

import java.util.List;

import com.supremainc.sdk.user.GetListRequest;
import com.supremainc.sdk.user.GetListResponse;
import com.supremainc.sdk.user.GetRequest;
import com.supremainc.sdk.user.GetResponse;
import com.supremainc.sdk.user.EnrollRequest;
import com.supremainc.sdk.user.EnrollResponse;
import com.supremainc.sdk.user.DeleteRequest;
import com.supremainc.sdk.user.DeleteResponse;
import com.supremainc.sdk.user.UserGrpc;
import com.supremainc.sdk.user.UserHdr;
import com.supremainc.sdk.user.UserInfo;
import com.supremainc.sdk.user.UserFinger;
import com.supremainc.sdk.user.SetFingerRequest;
import com.supremainc.sdk.user.SetFingerResponse;

public class UserSvc {
  private final UserGrpc.UserBlockingStub userStub;

  public UserSvc(UserGrpc.UserBlockingStub stub) {
    userStub = stub;
  }

  public List<UserHdr> getList(int deviceID) throws Exception {
    GetListRequest request = GetListRequest.newBuilder().setDeviceID(deviceID).build();
    GetListResponse response = userStub.getList(request);

    return response.getHdrsList();
  } 

  public List<UserInfo> getUser(int deviceID, List<String> userIDs) throws Exception {
    GetRequest request = GetRequest.newBuilder().setDeviceID(deviceID).addAllUserIDs(userIDs).build();
    GetResponse response = userStub.get(request);

    return response.getUsersList();
  }

  public void enroll(int deviceID, List<UserInfo> users) throws Exception {
    EnrollRequest request = EnrollRequest.newBuilder().setDeviceID(deviceID).addAllUsers(users).build();
    EnrollResponse response = userStub.enroll(request);
  }

  public void delete(int deviceID, List<String> userIDs) throws Exception {
    DeleteRequest request = DeleteRequest.newBuilder().setDeviceID(deviceID).addAllUserIDs(userIDs).build();
    DeleteResponse response = userStub.delete(request);
  }

  public void setFinger(int deviceID, List<UserFinger> userFingers) throws Exception {
    SetFingerRequest request = SetFingerRequest.newBuilder().setDeviceID(deviceID).addAllUserFingers(userFingers).build();
    SetFingerResponse response = userStub.setFinger(request);
  }
}