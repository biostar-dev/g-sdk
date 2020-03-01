package com.supremainc.sdk.example.connect;

import java.util.List;
import java.util.Iterator;

import com.supremainc.sdk.connect.ConnectGrpc;
import com.supremainc.sdk.connect.DeviceInfo;
import com.supremainc.sdk.connect.GetDeviceListRequest;
import com.supremainc.sdk.connect.GetDeviceListResponse;
import com.supremainc.sdk.connect.SearchDeviceInfo;
import com.supremainc.sdk.connect.SearchDeviceRequest;
import com.supremainc.sdk.connect.SearchDeviceResponse;
import com.supremainc.sdk.connect.ConnectInfo;
import com.supremainc.sdk.connect.ConnectRequest;
import com.supremainc.sdk.connect.ConnectResponse;
import com.supremainc.sdk.connect.DisconnectRequest;
import com.supremainc.sdk.connect.DisconnectAllRequest;
import com.supremainc.sdk.connect.StatusChange;
import com.supremainc.sdk.connect.SubscribeStatusRequest;
import com.supremainc.sdk.connect.AsyncConnectInfo;
import com.supremainc.sdk.connect.AddAsyncConnectionRequest;
import com.supremainc.sdk.connect.DeleteAsyncConnectionRequest;
import com.supremainc.sdk.connect.AcceptFilter;
import com.supremainc.sdk.connect.GetAcceptFilterRequest;
import com.supremainc.sdk.connect.GetAcceptFilterResponse;
import com.supremainc.sdk.connect.SetAcceptFilterRequest;
import com.supremainc.sdk.connect.PendingDeviceInfo;
import com.supremainc.sdk.connect.GetPendingListRequest;
import com.supremainc.sdk.connect.GetPendingListResponse;
import com.supremainc.sdk.connect.EnableSSLMultiRequest;
import com.supremainc.sdk.connect.DisableSSLMultiRequest;
import com.supremainc.sdk.connect.SetConnectionModeMultiRequest;
import com.supremainc.sdk.connect.SetConnectionModeRequest;
import com.supremainc.sdk.connect.ConnectionMode;

public class ConnectSvc {
  private final ConnectGrpc.ConnectBlockingStub connectStub;
  private final int SEARCH_TIMEOUT_MS = 5000;

  private final int MONITORING_QUEUE_SIZE = 16;

  public ConnectSvc(ConnectGrpc.ConnectBlockingStub stub) {
    connectStub = stub;
  }

  public List<DeviceInfo> getDeviceList() throws Exception {
    GetDeviceListRequest request = GetDeviceListRequest.newBuilder().build();
    GetDeviceListResponse response;
    
    response = connectStub.getDeviceList(request);
    return response.getDeviceInfosList();
  } 

  public List<SearchDeviceInfo> searchDevice() throws Exception {
    SearchDeviceRequest request = SearchDeviceRequest.newBuilder().setTimeout(SEARCH_TIMEOUT_MS).build();
    SearchDeviceResponse response;
    
    response = connectStub.searchDevice(request);
    return response.getDeviceInfosList();
  }   

  public int connect(ConnectInfo connInfo) throws Exception {
    ConnectRequest request = ConnectRequest.newBuilder().setConnectInfo(connInfo).build();

    ConnectResponse response = connectStub.connect(request);

    return response.getDeviceID();
  }

  public void disconnect(int deviceID) throws Exception {
    DisconnectRequest request = DisconnectRequest.newBuilder().addDeviceIDs(deviceID).build();
    connectStub.disconnect(request);
  }

  public void disconnectMulti(List<Integer> deviceIDs) throws Exception {
    DisconnectRequest request = DisconnectRequest.newBuilder().addAllDeviceIDs(deviceIDs).build();
    connectStub.disconnect(request);
  }  

  public void disconnectAll() throws Exception {
    DisconnectAllRequest request = DisconnectAllRequest.newBuilder().build();
    connectStub.disconnectAll(request);
  }

  public void addAsyncConnection(List<AsyncConnectInfo> connectInfos) throws Exception {
    AddAsyncConnectionRequest request = AddAsyncConnectionRequest.newBuilder().addAllConnectInfos(connectInfos).build();
    connectStub.addAsyncConnection(request);
  } 

  public void deleteAsyncConnection(List<Integer> deviceIDs) throws Exception {
    DeleteAsyncConnectionRequest request = DeleteAsyncConnectionRequest.newBuilder().addAllDeviceIDs(deviceIDs).build();
    connectStub.deleteAsyncConnection(request);
  } 

  public AcceptFilter getAcceptFilter() throws Exception {
    GetAcceptFilterRequest request = GetAcceptFilterRequest.newBuilder().build();
    GetAcceptFilterResponse response = connectStub.getAcceptFilter(request);

    return response.getFilter();
  }

  public void setAcceptFilter(AcceptFilter filter) throws Exception {
    SetAcceptFilterRequest request = SetAcceptFilterRequest.newBuilder().setFilter(filter).build();
    connectStub.setAcceptFilter(request);
  }

  public List<PendingDeviceInfo> getPendingList() throws Exception {
    GetPendingListRequest request = GetPendingListRequest.newBuilder().build();
    GetPendingListResponse response = connectStub.getPendingList(request);
    return response.getDeviceInfosList();
  } 

  public void enableSSL(List<Integer> deviceIDs) throws Exception {
    EnableSSLMultiRequest request = EnableSSLMultiRequest.newBuilder().addAllDeviceIDs(deviceIDs).build();
    connectStub.enableSSLMulti(request);
  }

  public void disableSSL(List<Integer> deviceIDs) throws Exception {
    DisableSSLMultiRequest request = DisableSSLMultiRequest.newBuilder().addAllDeviceIDs(deviceIDs).build();
    connectStub.disableSSLMulti(request);
  }

  public void setConnectionMode(List<Integer> deviceIDs, ConnectionMode mode) throws Exception {
    SetConnectionModeMultiRequest request = SetConnectionModeMultiRequest.newBuilder().addAllDeviceIDs(deviceIDs).setConnectionMode(mode).build();
    connectStub.setConnectionModeMulti(request);
  }


  public Iterator<StatusChange> subscribe() throws Exception {
    SubscribeStatusRequest request = SubscribeStatusRequest.newBuilder().setQueueSize(MONITORING_QUEUE_SIZE).build();
    Iterator<StatusChange> statusStream = connectStub.subscribeStatus(request);

    return statusStream;
  }
}
