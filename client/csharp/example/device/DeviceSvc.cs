using System;
using Device;
using Grpc.Core;

namespace example
{
  class DeviceSvc
  {
    private Device.Device.DeviceClient deviceClient;

    public DeviceSvc(Channel channel) {
      deviceClient = new Device.Device.DeviceClient(channel);
    }

    public FactoryInfo GetInfo(uint deviceID) {
      var request = new GetInfoRequest{ DeviceID = deviceID };
      var response = deviceClient.GetInfo(request);

      return response.Info;
    }

    public CapabilityInfo GetCapabilityInfo(uint deviceID) {
      var request = new GetCapabilityInfoRequest{ DeviceID = deviceID };
      var response = deviceClient.GetCapabilityInfo(request);

      return response.CapInfo;
    }

  }
}