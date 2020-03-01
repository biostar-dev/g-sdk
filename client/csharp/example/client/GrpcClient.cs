using System;
using System.IO;
using Grpc.Core;

namespace example
{
  class GrpcClient
  {
    private Channel channel;

    public void Connect(String caFile, String serverAddr, int serverPort) {
      var channelCredentials = new SslCredentials(File.ReadAllText(caFile));

      channel = new Channel(serverAddr, serverPort, channelCredentials);
    } 

    public Channel GetChannel() {
      return channel;
    }

    public void Close() {
      channel.ShutdownAsync().Wait();
    }
  }
}