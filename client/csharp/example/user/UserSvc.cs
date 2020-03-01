using System;
using User;
using Grpc.Core;
using Google.Protobuf.Collections;

namespace example
{
  class UserSvc
  {
    private User.User.UserClient userClient;

    public UserSvc(Channel channel) {
      userClient = new User.User.UserClient(channel);
    }

    public RepeatedField<User.UserHdr> GetList(uint deviceID) {
      var request = new GetListRequest{ DeviceID = deviceID };

      try {
        var response = userClient.GetList(request);

        return response.Hdrs;
      } catch(RpcException e) {
        Console.WriteLine("Cannot get the user list {0}: {1}", deviceID, e);
        throw;
      }
    }

    public RepeatedField<User.UserInfo> GetUser(uint deviceID, string[] userIDs) {
      var request = new GetRequest{ DeviceID = deviceID };
      request.UserIDs.AddRange(userIDs);

      try {
        var response = userClient.Get(request);

        return response.Users;
      } catch(RpcException e) {
        Console.WriteLine("Cannot get the user information {0}: {1}", deviceID, e);
        throw;
      }
    } 

    public void Enroll(uint deviceID, User.UserInfo[] users) {
      var request = new EnrollRequest{ DeviceID = deviceID };
      request.Users.AddRange(users);

      try {
        userClient.Enroll(request);
      } catch(RpcException e) {
        Console.WriteLine("Cannot enroll users {0}: {1}", deviceID, e);
        throw;
      }
    }

    public void Delete(uint deviceID, string[] userIDs) {
      var request = new DeleteRequest{ DeviceID = deviceID };
      request.UserIDs.AddRange(userIDs);

      try {
        userClient.Delete(request);
      } catch(RpcException e) {
        Console.WriteLine("Cannot delete users {0}: {1}", deviceID, e);
        throw;
      }
    }

    public void SetFinger(uint deviceID, User.UserFinger[] userFingers) {
      var request = new SetFingerRequest{ DeviceID = deviceID };
      request.UserFingers.AddRange(userFingers);

      try {
        userClient.SetFinger(request);
      } catch(RpcException e) {
        Console.WriteLine("Cannot set fingers {0}: {1}", deviceID, e);        
        throw;
      }
    }   
  }
}