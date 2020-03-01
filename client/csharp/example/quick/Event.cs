using System;
using System.Threading;
using System.IO;

namespace example
{
    class EventTest
    {
        private const int MAX_NUM_OF_LOG = 16;
        private const int MAX_NUM_OF_IMAGE_LOG = 2;
        private const string LOG_IMAGE_FILE = "./image_log.jpg";

        private EventSvc eventSvc;

        public EventTest(EventSvc svc) {
            eventSvc = svc;
        }

        public void Test(uint deviceID) {
            var events = eventSvc.GetLog(deviceID, 0, MAX_NUM_OF_LOG);

            Console.WriteLine("Events: {0}" + Environment.NewLine, events);

            var imageEvents = eventSvc.GetImageLog(deviceID, 0, MAX_NUM_OF_IMAGE_LOG);

            Console.WriteLine("Num of image events: {0}" + Environment.NewLine, imageEvents.Count);

            if(imageEvents.Count > 0) {
              File.WriteAllBytes(LOG_IMAGE_FILE, imageEvents[0].JPGImage.ToByteArray());
            }

            eventSvc.StartMonitoring(deviceID);

            Console.WriteLine(">>> Generate real-time events for 10 seconds");
            Thread.Sleep(10000);

            eventSvc.StopMonitoring(deviceID);
        }        
    }
}

