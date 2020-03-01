using System;
using System.Threading;
using Event;
using Grpc.Core;
using Google.Protobuf.Collections;

namespace example
{
  class EventSvc
  {
    private const int MONITORING_QUEUE_SIZE = 8;

    private Event.Event.EventClient eventClient;
    private CancellationTokenSource cancellationTokenSource;

    public EventSvc(Channel channel) {
      eventClient = new Event.Event.EventClient(channel);
    }

    public RepeatedField<Event.EventLog> GetLog(uint deviceID, uint startEventID, uint maxNumOfLog) {
      var request = new GetLogRequest{ DeviceID = deviceID, StartEventID = startEventID, MaxNumOfLog = maxNumOfLog };
      var response = eventClient.GetLog(request);

      return response.Events;
    }

    public RepeatedField<Event.ImageLog> GetImageLog(uint deviceID, uint startEventID, uint maxNumOfLog) {
      var request = new GetImageLogRequest{ DeviceID = deviceID, StartEventID = startEventID, MaxNumOfLog = maxNumOfLog };
      var response = eventClient.GetImageLog(request);

      return response.ImageEvents;    
    }    

    public void StartMonitoring(uint deviceID) {
      try {
        var enableRequest = new EnableMonitoringRequest{ DeviceID = deviceID };
        eventClient.EnableMonitoring(enableRequest);

        var subscribeRequest = new SubscribeRealtimeLogRequest{ DeviceIDs = {deviceID}, QueueSize = MONITORING_QUEUE_SIZE };
        var call = eventClient.SubscribeRealtimeLog(subscribeRequest);

        cancellationTokenSource = new CancellationTokenSource();

        ReceiveEvents(call.ResponseStream, cancellationTokenSource.Token);
      } catch (RpcException e) {
        Console.WriteLine("Cannot start monitoring {0}: {1}", deviceID, e);
        throw;
      }
    }

    static async void ReceiveEvents(IAsyncStreamReader<EventLog> stream, CancellationToken token) {
      Console.WriteLine("Start receiving real-time events");

      try {
        while(await stream.MoveNext(token)) {
          var eventLog = stream.Current;
          Console.WriteLine("Event: {0}", eventLog);        
        }
      } catch (Exception e) {
        Console.WriteLine("Monitoring error: {0}", e);
      } finally {
        Console.WriteLine("Stop receiving real-time events");
      }
    }

    public void StopMonitoring(uint deviceID) {
      var disableRequest = new DisableMonitoringRequest{ DeviceID = deviceID };
      eventClient.DisableMonitoring(disableRequest);

      if(cancellationTokenSource != null) {
        cancellationTokenSource.Cancel();
      }
    }    
  }
}