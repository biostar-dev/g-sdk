using System;
using Connect;
using Grpc.Core;
using Google.Protobuf.Collections;

namespace example
{
  class ConnectSvc
  {
    private const int SEARCH_TIMEOUT_MS = 5000;

    private Connect.Connect.ConnectClient connectClient;

    public ConnectSvc(Channel channel) {
      connectClient = new Connect.Connect.ConnectClient(channel);
    }

    public RepeatedField<Connect.DeviceInfo> GetDeviceList() {
      var request = new GetDeviceListRequest{};
      var response = connectClient.GetDeviceList(request);

      return response.DeviceInfos;
    }
    
    public RepeatedField<Connect.SearchDeviceInfo> SearchDevice() {
      var request = new SearchDeviceRequest{ Timeout = SEARCH_TIMEOUT_MS };
      var response = connectClient.SearchDevice(request);

      return response.DeviceInfos;
    }

    public uint Connect(ConnectInfo connectInfo) {
      var request = new ConnectRequest{ ConnectInfo = connectInfo };
      var response = connectClient.Connect(request);

      return response.DeviceID;
    } 

    public void Disconnect(uint[] deviceIDs) {
      var request = new DisconnectRequest{};
      request.DeviceIDs.AddRange(deviceIDs);

      connectClient.Disconnect(request);
    }     

    public void DisconnectAll() {
      var request = new DisconnectAllRequest{};

      connectClient.DisconnectAll(request);
    }     

    public void AddAsyncConnection(AsyncConnectInfo[] asyncConns) {
      var request = new AddAsyncConnectionRequest{};
      request.ConnectInfos.AddRange(asyncConns);

      connectClient.AddAsyncConnection(request);
    }

    public void DeleteAsyncConnection(uint[] deviceIDs) {
      var request = new DeleteAsyncConnectionRequest{};
      request.DeviceIDs.AddRange(deviceIDs);

      connectClient.DeleteAsyncConnection(request);
    }    

    public RepeatedField<Connect.PendingDeviceInfo> GetPendingList() {
      var request = new GetPendingListRequest{};
      var response = connectClient.GetPendingList(request);

      return response.DeviceInfos;
    }

    public AcceptFilter GetAcceptFilter() {
      var request = new GetAcceptFilterRequest{};
      var response = connectClient.GetAcceptFilter(request);

      return response.Filter;
    }    

    public void SetAcceptFilter(AcceptFilter filter) {
      var request = new SetAcceptFilterRequest{ Filter = filter };
      connectClient.SetAcceptFilter(request);
    }    

    public void SetConnectionMode(uint[] deviceIDs, ConnectionMode mode) {
      var request = new SetConnectionModeMultiRequest{ ConnectionMode = mode };
      request.DeviceIDs.AddRange(deviceIDs);

      connectClient.SetConnectionModeMulti(request);
    }

    public void EnableSSL(uint[] deviceIDs) {
      var request = new EnableSSLMultiRequest{};
      request.DeviceIDs.AddRange(deviceIDs);

      connectClient.EnableSSLMulti(request);
    }

    public void DisableSSL(uint[] deviceIDs) {
      var request = new DisableSSLMultiRequest{};
      request.DeviceIDs.AddRange(deviceIDs);

      connectClient.DisableSSLMulti(request);
    }

    public IAsyncStreamReader<StatusChange> Subscribe(int queueSize) {
      var request = new SubscribeStatusRequest{ QueueSize = queueSize };
      var streamCall = connectClient.SubscribeStatus(request);

      return streamCall.ResponseStream;
    }
  }
}